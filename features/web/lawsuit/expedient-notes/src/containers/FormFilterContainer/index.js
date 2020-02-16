import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'
import TextArea from '@syntesis/c-inputs/src/components/TextArea'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'
import { withStores } from '@syntesis/c-stores-provider'
import expedientNotesFilterStore from '../../stores/formExpedientNotesFilterStore'

import styles from './styles'

@inject('expedientNotesFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.expedientNotesFilterStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      expedientNotesFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      rawEvent,
      rawProcessNumber,
      rawAvailableDate,
      rawPublicationDate,
      privateObservation,
      observation,
      lawsuitId
    } = getFormControls

    const disabled = getFormStatus.loading

    return (
      <div>
        <Checkbox
          inline
          isValid
          indeterminateRule
          name="lawsuitId"
          label="Possui vínculo"
          value={ lawsuitId.value }
          checked={ lawsuitId.checked }
          errorText={ lawsuitId.errorText }
          onChange={ this.onFormChange }
          rules={ lawsuitId.rules }
          disabled={ disabled }
        />
        <TextInput
          autoFocus
          name="rawEvent"
          label={ rawEvent.label }
          helperText="Informe um evento para a pesquisa"
          value={ rawEvent.value }
          isValid={ rawEvent.isValid }
          showError={ rawEvent.showError }
          rules={ rawEvent.rules }
          errorText={ rawEvent.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <TextInput
          name="rawProcessNumber"
          label={ rawProcessNumber.label }
          helperText="Informe um processo para a pesquisa"
          value={ rawProcessNumber.value.toString() }
          isValid={ rawProcessNumber.isValid }
          showError={ rawProcessNumber.showError }
          rules={ rawProcessNumber.rules }
          errorText={ rawProcessNumber.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <DatePickerInput
          name="rawAvailableDate"
          label={ rawAvailableDate.label }
          helperText="Informe uma data de disponibilização para a pesquisa"
          value={ rawAvailableDate.value }
          isValid={ rawAvailableDate.isValid }
          showError={ rawAvailableDate.showError }
          rules={ rawAvailableDate.rules }
          errorText={ rawAvailableDate.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <DatePickerInput
          name="rawPublicationDate"
          label={ rawPublicationDate.label }
          helperText="Informe uma data de publicação para a pesquisa"
          value={ rawPublicationDate.value }
          isValid={ rawPublicationDate.isValid }
          showError={ rawPublicationDate.showError }
          rules={ rawPublicationDate.rules }
          errorText={ rawPublicationDate.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <TextArea
          name="observation"
          label={ observation.label }
          helperText="Informe um conteúdo para a pesquisa"
          value={ observation.value }
          isValid={ observation.isValid }
          showError={ observation.showError }
          errorText={ observation.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <TextArea
          name="privateObservation"
          label={ privateObservation.label }
          helperText="Informe observações internas para a pesquisa"
          value={ privateObservation.value }
          isValid={ privateObservation.isValid }
          showError={ privateObservation.showError }
          errorText={ privateObservation.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
      </div>
    )
  }
}

FormFilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  expedientNotesFilterStore: MobxPropTypes.objectOrObservableObject
}

FormFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ expedientNotesFilterStore })
)(FormFilterContainer)
