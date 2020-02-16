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
import expedientNotesFilterDeletedStore from '../../stores/formExpedientNotesFilterDeletedStore'

import styles from './styles'

@inject('expedientNotesFilterDeletedStore')
@observer
class FormFilterDeletedContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.expedientNotesFilterDeletedStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      expedientNotesFilterDeletedStore: store
    } = this.props

    const {
      getFormControls,
      getFormStatus
    } = store

    const {
      rawEvent,
      rawProcessNumber,
      modified,
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
          name="modified"
          label={ modified.label }
          helperText="Informe uma data de exclusão para a pesquisa"
          value={ modified.value }
          isValid={ modified.isValid }
          showError={ modified.showError }
          rules={ modified.rules }
          errorText={ modified.errorText }
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

FormFilterDeletedContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  expedientNotesFilterDeletedStore: MobxPropTypes.objectOrObservableObject
}

FormFilterDeletedContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ expedientNotesFilterDeletedStore })
)(FormFilterDeletedContainer)
