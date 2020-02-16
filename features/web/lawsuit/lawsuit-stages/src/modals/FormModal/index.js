import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalVerticalSteppers from '@syntesis/c-modals/src/containers/VerticalSteppers'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formLawsuitStagesStore from '../../stores/formLawsuitStagesStore'
import FormDetailsContainer from '../../containers/FormDetailsContainer'
import FormConfigurationContainer from '../../containers/FormConfigurationContainer'

import styles from './styles'

@inject('formLawsuitStagesStore')
@observer
class FormModal extends Component {
  constructor(props) {
    super(props)
    this.onChangeActiveStepper = this.onChangeActiveStepper.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.saveForm = this.saveForm.bind(this)

    this.state = {
      activeStepperIndex: 0,
    }
  }

  async onChangeActiveStepper(stepper, index) {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        ...prevState,
        activeStepperIndex: index
      }), resolve)
    })
  }

  onCloseModal() {
    const {
      dialogId,
      formLawsuitStagesStore: {
        changed
      }
    } = this.props

    if (changed) {
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

  async saveForm() {
    const {
      dialogId,
      onSuccess,
      formLawsuitStagesStore: {
        submit
      }
    } = this.props
    try {
      await submit()
      onSuccess(dialogId)
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      classes,
      ...otherProps
    } = this.props

    const {
      item,
      createMode,
      formLawsuitStagesStore: {
        getFormMode,
        getFormControls: {
          code,
          title,
          active
        },
        getFormStatus: {
          loading
        },
        changed
      }
    } = otherProps

    const { synsuiteCode } = item

    const modalTitle = getFormMode.create
      ? 'Cadastrar nova fase processual'
      : ({ code: itemCode, title: itemTitle }) => `Editando "${ itemCode } - ${ itemTitle }"`

    const btnConfirmTitle = getFormMode.create
      ? 'salvar novo'
      : 'salvar edição'

    const steppers = [
      {
        title: 'Detalhes',
        condition: true,
        completed: false,
        error: () => {
          const error = {
            code,
            title,
            active
          }
          const response = find(error, { isValid: false })
          return !isEmpty(response) && get(response, 'showError')
        },
        errorText: () => {
          const error = {
            code,
            title,
            active
          }
          const response = find(error, { isValid: false })
          return get(response, 'errorText')
        },
        contentComponent: FormDetailsContainer,
        contentComponentProps: {
          item,
          createMode
        },
        onSuccess: this.saveForm,
        customProps: {
          buttonConfirm: {
            children: btnConfirmTitle,
            disabled: !changed || loading
          }
        }
      },
      {
        title: 'Configurações',
        condition: !isNumber(synsuiteCode),
        completed: false,
        error: false,
        errorText: 'algo de errado não está certo',
        contentComponent: FormConfigurationContainer,
        contentComponentProps: {
          autoFocus: false
        },
        onSuccess: this.saveForm,
        customProps: {
          buttonConfirm: {
            children: btnConfirmTitle,
            disabled: !changed || loading
          }
        }
      }
    ]

    const { activeStepperIndex } = this.state

    return (
      <ModalVerticalSteppers
        { ...otherProps }
        dialogProps={ {
          classes: {
            paper: classes.minHeight
          }
        } }
        steppers={ steppers }
        activeStepperIndex={ activeStepperIndex }
        modalLoading={ loading }
        mode={ getFormMode }
        title={ modalTitle }
        autoClose={ false }
        onCancel={ this.onCloseModal }
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
  formLawsuitStagesStore: MobxPropTypes.objectOrObservableObject,
}

FormModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {},
  createMode: false
}

export default flow(
  withStores({ formLawsuitStagesStore }),
  withStyles(styles)
)(FormModal)
