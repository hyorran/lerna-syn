import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import omitBy from 'lodash/omitBy'
import filter from 'lodash/filter'
import uniq from 'lodash/uniq'
import indexOf from 'lodash/indexOf'
import get from 'lodash/get'
import size from 'lodash/size'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalVerticalSteppers from '@syntesis/c-modals/src/containers/VerticalSteppers'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import {
  saveR2010Parameters,
  saveR2020Parameters,
  saveR2060Parameters,
  saveR2099Parameters
} from '@syntesis/s-reinf'
import formReinfDetailsStore from '../stores/formReinfDetailsStore'
import formReinfR2060Store from '../stores/formReinfR2060Store'
import formReinfR2099Store from '../stores/formReinfR2099Store'
import FormDetailsContainer from '../containers/FormDetailsContainer'
import FormR2060Container from '../containers/FormR2060Container'
import DatagridR2010Container from '../containers/DatagridR2010Container'
import DatagridR2020Container from '../containers/DatagridR2020Container'
import FormR2099Container from '../containers/FormR2099Container'
import GenerateFilesContainer from '../containers/GenerateFilesContainer'
import DownloadOrTransmitFilesContainer from '../containers/DownloadOrTransmitFilesContainer'

import styles from './styles'

@inject('formReinfDetailsStore')
@inject('formReinfR2060Store')
@inject('formReinfR2099Store')
@observer
class GenerateFileModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onChangeActiveStepper = this.onChangeActiveStepper.bind(this)
    this.saveStepper = this.saveStepper.bind(this)
    this.fetchFormStepper = this.fetchFormStepper.bind(this)
    this.onStepperLoaded = this.onStepperLoaded.bind(this)
    this.onStepperRemoved = this.onStepperRemoved.bind(this)
    this.setCompleted = this.setCompleted.bind(this)
    this.resetCompetenceCompleteds = this.resetCompetenceCompleteds.bind(this)
    this.startModalLoading = this.startModalLoading.bind(this)
    this.stopModalLoading = this.stopModalLoading.bind(this)

    this.state = {
      activeStepperIndex: 0,
      steppersLoaded: [],
      completeds: [],
      response: {},
      modalLoading: false,
      competenceValue: null
    }
  }

  componentDidMount() {
    this.resetCompetenceCompleteds({ completeds: false })
  }

  componentDidUpdate() {
    const {
      formReinfDetailsStore: {
        getFormControls: {
          competence
        }
      }
    } = this.props
    const { competenceValue } = this.state

    if (competence.isValid && competenceValue !== competence.value) {
      this.resetCompetenceCompleteds()
    }
  }

  onCloseModal() {
    const {
      dialogId,
      formReinfDetailsStore: {
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

  setCompleted(index) {
    this.setState(prevState => ({
      ...prevState,
      completeds: uniq([
        ...prevState.completeds,
        index
      ])
    }))
  }

  resetCompetenceCompleteds(options) {
    const {
      formReinfDetailsStore: {
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

  async saveStepper(configs, cb) {
    await this.startModalLoading()
    if (cb) {
      cb(configs)
    } else {
      this.fetchFormStepper(configs)
    }
  }

  async fetchFormStepper({
    service, data, stepper, cb = () => {}
  }) {
    try {
      await service(data)
      await this.stopModalLoading()
      if (stepper) {
        this.setCompleted(stepper)
      }
      cb()
    } catch (e) {
      this.stopModalLoading()
    }
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
      dialogId,
      onSuccess,
      item,
      createMode,
      formReinfDetailsStore: detailsStore,
      formReinfR2060Store: r2060Store,
      formReinfR2099Store: r2099Store,
    } = this.props

    const {
      activeStepperIndex,
      steppersLoaded,
      modalLoading,
      completeds
    } = this.state

    let loading = modalLoading
    let enterOnStepper = true
    if (steppersLoaded.length < 3) {
      loading = true
      enterOnStepper = false
    }

    const {
      getFormControls: {
        competence
      },
    } = detailsStore

    const steppers = [
      {
        title: 'Detalhes',
        condition: true,
        completed: competence.isValid,
        error: !competence.isValid,
        errorText: competence.errorText,
        contentComponent: FormDetailsContainer,
        contentComponentProps: {
          item,
          onSuccess: () => onSuccess(dialogId),
          createMode,
          isActiveStepper: activeStepperIndex === 0
        },
        onSuccess: () => {
          this.onChangeActiveStepper(null, 1)
        },
        customProps: {
          buttonConfirm: {
            children: 'continuar',
            disabled: !competence.isValid
          }
        }
      },
      {
        title: 'Arquivo R-2010',
        condition: (
          competence.isValid
          && enterOnStepper
        ),
        completed: indexOf(completeds, 1) > -1,
        error: false,
        errorText: '',
        contentComponent: DatagridR2010Container,
        contentComponentProps: {
          item,
          competence,
          onStepperLoaded: this.onStepperLoaded,
          onStepperRemoved: this.onStepperRemoved
        },
        onSuccess: () => {
          this.saveStepper({
            service: saveR2010Parameters,
            data: {
              competence: competence.value,
              companyPlaceId: item.id
            },
            stepper: 1,
            cb: () => {
              this.onChangeActiveStepper(null, 2)
            }
          })
        },
      },
      {
        title: 'Arquivo R-2020',
        condition: (
          competence.isValid
          && enterOnStepper
        ),
        completed: indexOf(completeds, 2) > -1,
        error: false,
        errorText: '',
        contentComponent: DatagridR2020Container,
        contentComponentProps: {
          item,
          competence,
          onStepperLoaded: this.onStepperLoaded,
          onStepperRemoved: this.onStepperRemoved
        },
        onSuccess: () => {
          this.saveStepper({
            service: saveR2020Parameters,
            data: {
              competence: competence.value,
              companyPlaceId: item.id
            },
            stepper: 2,
            cb: () => {
              this.onChangeActiveStepper(null, 3)
            }
          })
        },
      },
      {
        title: 'Arquivo R-2060',
        condition: (
          competence.isValid
          // && !modalLoading
          && enterOnStepper
        ),
        completed: indexOf(completeds, 3) > -1,
        error: r2060Store.getFormStatus.error,
        errorText: r2060Store.getFormStatus.errorText,
        contentComponent: FormR2060Container,
        contentComponentProps: {
          autoFocus: false,
          item,
          competence,
          onStepperLoaded: this.onStepperLoaded,
          onStepperRemoved: this.onStepperRemoved
        },
        onSuccess: () => {
          const {
            submit,
            formValues,
            getFormStatus: {
              error
            }
          } = r2060Store

          if (!error) {
            submit().then(() => {
              this.saveStepper({
                service: saveR2060Parameters,
                data: {
                  ...formValues,
                  competence: competence.value,
                  companyPlaceId: item.id
                },
                stepper: 3,
                cb: () => {
                  this.onChangeActiveStepper(null, 4)
                }
              })
            })
          }
        },
      },
      {
        title: 'Arquivo R-2099',
        condition: (
          competence.isValid
          && enterOnStepper
        ),
        completed: indexOf(completeds, 4) > -1,
        error: false,
        errorText: '',
        contentComponent: FormR2099Container,
        contentComponentProps: {
          item,
          competence,
          onStepperLoaded: this.onStepperLoaded,
          onStepperRemoved: this.onStepperRemoved
        },
        onSuccess: () => {
          const {
            submit,
            formValues,
            getFormStatus: {
              error
            }
          } = r2099Store

          if (!error) {
            submit().then(() => {
              this.saveStepper({
                service: saveR2099Parameters,
                data: {
                  ...formValues,
                  competence: competence.value,
                  companyPlaceId: item.id
                },
                stepper: 4,
                cb: () => {
                  this.onChangeActiveStepper(null, 5)
                }
              })
            })
          }
        },
      },
      {
        title: 'Geração dos arquivos',
        condition: (
          competence.isValid
          && size(completeds) > 0
        ),
        completed: indexOf(completeds, 5) > -1,
        error: false,
        errorText: '',
        contentComponent: GenerateFilesContainer,
        contentComponentProps: {
          item,
          modalLoading,
          startModalLoading: this.startModalLoading,
          stopModalLoading: this.stopModalLoading,
          setCompleted: () => this.setCompleted(4),
          onSuccess: () => this.onChangeActiveStepper(null, 6)
        },
        customProps: {
          buttonConfirm: {
            children: 'continuar'
          },
          withButtonConfirm: false,
          withButtonCancel: false
        }
      },
      {
        title: 'Download/Transmissão',
        condition: (
          competence.isValid
          && indexOf(completeds, 5) > -1
        ),
        completed: false,
        error: false,
        errorText: '',
        contentComponent: DownloadOrTransmitFilesContainer,
        contentComponentProps: {
          item,
          modalLoading,
          startModalLoading: this.startModalLoading,
          stopModalLoading: this.stopModalLoading,
          onSuccess: () => {
            window.closeDialog(dialogId)
            this.props.onSuccess(item)
          }
        },
        onSuccess: () => {
          window.closeDialog(dialogId)
          this.props.onSuccess(item)
        },
        customProps: {
          buttonConfirm: {
            children: 'fechar'
          },
          withButtonCancel: false
        }
      }
    ]

    return (
      <ModalVerticalSteppers
        { ...omitBy(this.props, (_, key) => key === 'classes') }
        escape={ !loading }
        dialogProps={ {
          maxWidth: 'lg',
          classes: {
            paper: classes.minHeight
          }
        } }
        steppers={ steppers }
        stepperProps={ {
          onNavigation: this.onChangeActiveStepper,
          containerClass: classes.steppersContainer
        } }
        modalLoading={ loading }
        title="Geração de arquivos Reinf"
        autoClose={ false }
        activeStepperIndex={ activeStepperIndex }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

GenerateFileModal.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formReinfDetailsStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formReinfR2060Store: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formReinfR2099Store: MobxPropTypes.objectOrObservableObject
}

GenerateFileModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {},
  createMode: false
}

export default flow(
  withStores({
    formReinfDetailsStore,
    formReinfR2060Store,
    formReinfR2099Store
  }),
  withStyles(styles)
)(GenerateFileModal)
