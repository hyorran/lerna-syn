import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import DateRangePickerInput from '@syntesis/c-inputs/src/components/pickers/DateRangePickerInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'
import SaveIconButton from '@syntesis/c-buttons/src/components/IconButton/SaveIconButton'
import { withStores } from '@syntesis/c-stores-provider'
import expedientNotesGetPublicationsStore from '../../stores/formExpedientNotesGetPublicationsStore'
import { hasPublicationIntegrationLawsuitExpedientNotes } from '@syntesis/s-lawsuit-expedient-notes'

import styles from './styles'

@inject('expedientNotesGetPublicationsStore')
@observer
class FormGetPublicationsContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.verifyHasPublicationIntegration = this.verifyHasPublicationIntegration.bind(this)

    this.state = {
      mode: {
        create: true,
        update: false,
        integrationType: 1
      }
    }
  }

  componentDidMount() {
    this.verifyHasPublicationIntegration()
  }

  onFormChange(controlName, control) {
    this.props.expedientNotesGetPublicationsStore.changeFormControl(controlName, control)
  }

  async verifyHasPublicationIntegration() {
    try {
      const body = await hasPublicationIntegrationLawsuitExpedientNotes()

      const exists = get(body, 'response.exists', false)

      if (exists) {
        const integrationType = get(body, 'response.type')
        this.setState(prevState => ({
          ...prevState,
          integrationType
        }), () => {
          const {
            expedientNotesGetPublicationsStore: {
              changeControlRules
            }
          } = this.props

          changeControlRules('dateRange.value.from', ['required'], integrationType === 2)
          changeControlRules('dateRange.value.to', ['required'], integrationType === 2)
          changeControlRules('date', ['required'], integrationType === 1)
        })
      }
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      expedientNotesGetPublicationsStore: store,
      footerContainerClass,
      withButtons
    } = this.props

    const {
      getFormControls,
      getFormStatus,
      changed
    } = store

    const {
      period,
      date
    } = getFormControls

    const { mode } = this.state
    const disabled = getFormStatus.loading

    return (
      <div>
        <Form
          mode={ mode }
          store={ store }
          onSuccess={ () => onSuccess(dialogId) }
          controls={ { ...getFormControls } }
          item={ item }
        >
          {
            this.state.integrationType === 1
            ? (
              <DatePickerInput
                name="date"
                label="Data"
                helperText="Informe uma data para buscar as notas de expediente"
                value={ date.value }
                isValid={ date.isValid }
                showError={ date.showError }
                rules={ date.rules }
                errorText={ date.errorText }
                onChange={ this.onFormChange }
                inputProps={ {
                  inputProps: {
                    maxDate: 'today'
                  }
                } }
                disabled={ disabled }
              />
            ) : (
              <DateRangePickerInput
                name="period"
                label="Período"
                helperText="Informe um período para buscar as notas de expediente"
                value={ period.value }
                isValid={ period.isValid }
                showError={ period.showError }
                rules={ period.rules }
                errorText={ period.errorText }
                onChange={ this.onFormChange }
                inputProps={ {
                  inputProps: {
                    maxDate: 'today'
                  }
                } }
                disabled={ disabled }
              />
            )
        }
          {
            withButtons
              ? (
                <div className={ [classes.footerContainer, footerContainerClass].join(' ') }>
                  <SaveIconButton
                    type="submit"
                    asCreate
                    disabled={ disabled || !changed }
                  >
                    Salvar
                  </SaveIconButton>
                </div>
              )
              : null
          }
        </Form>
      </div>
    )
  }
}

FormGetPublicationsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  expedientNotesGetPublicationsStore: MobxPropTypes.objectOrObservableObject
}

FormGetPublicationsContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ expedientNotesGetPublicationsStore })
)(FormGetPublicationsContainer)
