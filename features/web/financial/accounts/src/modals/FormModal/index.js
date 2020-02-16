import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import omitBy from 'lodash/omitBy'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import remove from 'lodash/remove'
import uniq from 'lodash/uniq'
import indexOf from 'lodash/indexOf'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
import map from 'lodash/map'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalVerticalSteppers from '@syntesis/c-modals/src/containers/VerticalSteppers'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import { getBankAccount, postBankAccount, putBankAccount } from '@syntesis/s-bank-accounts'
import formDetailsStore from '../../stores/formDetailsStore'
import formTellerStore from '../../stores/formTellerStore'
import FormDetailsContainer from '../../containers/FormDetailsContainer'
import FormTellerContainer from '../../containers/FormTellerContainer'

import styles from './styles'

@inject('formDetailsStore')
@inject('formTellerStore')
@observer
class FormModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onChangeActiveStepper = this.onChangeActiveStepper.bind(this)
    this.onStepperLoaded = this.onStepperLoaded.bind(this)
    this.onStepperRemoved = this.onStepperRemoved.bind(this)
    this.setCompleted = this.setCompleted.bind(this)
    this.removeCompleted = this.removeCompleted.bind(this)
    this.resetCompleteds = this.resetCompleteds.bind(this)
    this.startModalLoading = this.startModalLoading.bind(this)
    this.stopModalLoading = this.stopModalLoading.bind(this)
    this.submitModal = this.submitModal.bind(this)
    this.getItem = this.getItem.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id
      },
      activeStepperIndex: 0,
      steppersLoaded: [],
      completeds: [],
      modalLoading: false,
      competenceValue: null,
      item: {}
    }
  }

  componentDidMount() {
    if (this.props.item.id) {
      this.getItem()
    }
  }

  componentWillUnmount() {
    const {
      formDetailsStore: detailsStore,
      formTellerStore: tellerStore
    } = this.props

    detailsStore.resetForm()
    tellerStore.resetForm()
  }

  onCloseModal(enableTellerStep) {
    const {
      dialogId,
      formDetailsStore: detailsStore,
      formTellerStore: tellerStore
    } = this.props

    if (detailsStore.changed || (enableTellerStep && tellerStore.changed)) {
      window.openDialog({
        component: ({ dialogId: unsafeDialogId, open }) => (
          <UnsafeForm
            position="top"
            open={ open }
            dialogId={ unsafeDialogId }
            parentDialog={ dialogId }
          />
        )
      })
    } else {
      window.closeDialog(dialogId)
    }
  }

  async onChangeActiveStepper(_, index) {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        ...prevState,
        activeStepperIndex: index
      }), resolve)
    })
  }

  onStepperLoaded(stepperIndex) {
    const { steppersLoaded } = this.state

    this.setState(prevState => ({
      ...prevState,
      steppersLoaded: [
        ...steppersLoaded,
        stepperIndex
      ]
    }))
  }

  onStepperRemoved(stepperIndex) {
    const { steppersLoaded } = this.state

    const newSteppersLoaded = filter(steppersLoaded, stepper => stepper !== stepperIndex)

    this.setState(prevState => ({
      ...prevState,
      steppersLoaded: newSteppersLoaded
    }))
  }

  async getItem() {
    const {
      item,
      formDetailsStore: detailsStore,
      formTellerStore: tellerStore
    } = this.props

    const { mode } = this.state

    await this.startModalLoading()
    const { response } = await getBankAccount(item)
    detailsStore.injectExistingControls(response, mode)

    const { eletronicPaymentConfig } = response

    try {
      let electronicPaymentConfigObject = null
      if (!isEmpty(eletronicPaymentConfig)) {
        electronicPaymentConfigObject = JSON.parse(eletronicPaymentConfig)
      }
      if (isObject(electronicPaymentConfigObject)) {
        tellerStore.injectExistingControls(
          {
            ...response,
            eletronicPaymentConfig: electronicPaymentConfigObject
          },
          mode
        )
      }
    } catch (e) {
      console.error(e)
    }
    this.stopModalLoading()
  }

  setCompleted(index) {
    this.setState(prevState => ({
      ...prevState,
      completeds: uniq([
        ...prevState.completeds,
        index
      ])
    }))
  }

  async submitModal(enableTellerStep) {
    const {
      item,
      dialogId,
      onSuccess,
      formDetailsStore: detailsStore,
      formTellerStore: tellerStore
    } = this.props

    const { mode } = this.state

    if (
      !formDetailsStore.getFormStatus.error
      && (enableTellerStep ? !formTellerStore.getFormStatus.error : true)
    ) {
      await this.startModalLoading()

      const id = get(item, 'id')
      const idObj = id ? { id } : {}

      const response = {
        ...idObj,
        ...detailsStore.formValues,
        eletronicPaymentConfig: map(
          get(tellerStore.formValues, 'eletronicPaymentConfig'),
          (value, key) => ({
            key,
            value: enableTellerStep ? value : ''
          })
        )
      }

      try {
        if (mode.create) {
          await postBankAccount(response)
        } else if (mode.update) {
          await putBankAccount({
            id: mode.update,
            ...response
          })
        }

        onSuccess(dialogId)
        this.stopModalLoading()
      } catch (e) {
        this.stopModalLoading()
      }
    }
  }

  removeCompleted(index) {
    this.setState((prevState) => {
      const { completeds } = prevState
      remove(completeds, item => item === index)
      return ({
        ...prevState,
        completeds
      })
    })
  }

  resetCompleteds(options) {
    const {
      formDetailsStore: {
        getFormControls: {
          competence
        }
      }
    } = this.props

    const resetCompleteds = get(options, 'completeds') || true

    this.setState(prevState => ({
      ...prevState,
      completeds: resetCompleteds ? [] : prevState.completeds,
      competenceValue: competence.value
    }))
  }

  async startModalLoading() {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        ...prevState,
        modalLoading: true
      }), resolve)
    })
  }

  async stopModalLoading() {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        ...prevState,
        modalLoading: false
      }), resolve)
    })
  }

  render() {
    const {
      classes,
      // dialogId,
      // onSuccess,
      item,
      formDetailsStore: detailsStore,
      formTellerStore: tellerStore
    } = this.props

    const {
      mode,
      activeStepperIndex,
      // steppersLoaded,
      modalLoading,
      completeds,
      // response,
    } = this.state

    const {
      isTeller,
      getFormControls: detailsControls,
      getFormStatus: {
        error: detailsError,
        errorText: detailsErrorText
      }
    } = detailsStore

    const {
      getFormControls: tellerControls,
      getFormStatus: {
        error: tellerError,
        errorText: tellerErrorText
      }
    } = tellerStore

    const enableTellerStep = detailsStore.getFormControls.accountAttendance.value

    const steppers = [
      {
        title: 'Detalhes',
        condition: true,
        completed: indexOf(completeds, 0) > -1,
        error: (
          indexOf(completeds, 0) > -1
          && detailsError
          && !isEmpty(filter(
            detailsControls,
            control => get(control, 'showError', false)
          ))
        ),
        errorText: detailsErrorText,
        contentComponent: FormDetailsContainer,
        contentComponentProps: {
          item,
          mode,
          modalLoading
        },
        onSuccess: () => {
          const { submit } = detailsStore
          submit()
            .then(() => {
              this.setCompleted(0)
              if (!enableTellerStep) {
                this.submitModal(enableTellerStep)
              } else {
                this.onChangeActiveStepper(null, 1)
              }
            })
            .catch(() => {
              this.setCompleted(0)
            })
        },
        customProps: {
          buttonConfirm: {
            children: (enableTellerStep && isTeller) ? 'continuar' : 'salvar'
          }
        }
      },
      {
        title: 'Caixa Atendimento',
        condition: enableTellerStep && isTeller && !detailsError,
        completed: indexOf(completeds, 1) > -1,
        error: (
          indexOf(completeds, 1) > -1
          && tellerError
          && !isEmpty(filter(
            tellerControls,
            control => get(control, 'showError', false)
          ))
        ),
        errorText: tellerErrorText,
        contentComponent: FormTellerContainer,
        contentComponentProps: {
          item,
          mode,
          modalLoading
        },
        onSuccess: () => {
          const { submit } = tellerStore
          submit()
            .then(() => {
              this.setCompleted(1)
              this.submitModal(enableTellerStep)
            })
            .catch(() => {
              this.setCompleted(1)
            })
        },
        customProps: {
          buttonConfirm: {
            children: 'salvar'
          }
        }
      }
    ]

    const modalTitle = mode.create
      ? 'Cadastrar nova conta'
      : ({ code, description }) => `Editando "${ code } - ${ description }"`

    return (
      <ModalVerticalSteppers
        { ...omitBy(this.props, (_, key) => key === 'classes') }
        escape={ !modalLoading }
        dialogProps={ {
          maxWidth: 'md',
          classes: {
            paper: classes.minHeight
          }
        } }
        steppers={ steppers }
        stepperProps={ {
          onNavigation: this.onChangeActiveStepper,
          containerClass: classes.steppersContainer
        } }
        modalLoading={ modalLoading }
        title={ modalTitle }
        autoClose={ false }
        activeStepperIndex={ activeStepperIndex }
        onCancel={ () => this.onCloseModal(enableTellerStep) }
      />
    )
  }
}

FormModal.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formDetailsStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formTellerStore: MobxPropTypes.objectOrObservableObject
}

FormModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {},
  createMode: false
}

export default flow(
  withStores({
    formDetailsStore,
    formTellerStore
  }),
  withStyles(styles)
)(FormModal)
