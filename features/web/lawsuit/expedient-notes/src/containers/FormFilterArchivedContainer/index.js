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
import expedientNotesFilterArchivedStore from '../../stores/formExpedientNotesFilterArchivedStore'

import styles from './styles'

@inject('expedientNotesFilterArchivedStore')
@observer
class FormFilterArchivedContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.expedientNotesFilterArchivedStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      expedientNotesFilterArchivedStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      rawEvent,
      rawProcessNumber,
      filedDate,
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
          name="filedDate"
          label={ filedDate.label }
          helperText="Informe uma data de expedição para a pesquisa"
          value={ filedDate.value }
          isValid={ filedDate.isValid }
          showError={ filedDate.showError }
          rules={ filedDate.rules }
          errorText={ filedDate.errorText }
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

FormFilterArchivedContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  expedientNotesFilterArchivedStore: MobxPropTypes.objectOrObservableObject
}

FormFilterArchivedContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ expedientNotesFilterArchivedStore })
)(FormFilterArchivedContainer)
