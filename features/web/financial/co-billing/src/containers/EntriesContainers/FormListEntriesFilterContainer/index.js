import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import formListEntriesFilterStore from '../../../stores/EntriesStores/formListEntriesFilterStore'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'

import styles from './styles'

@inject('formListEntriesFilterStore')
@observer
class FormListEntriesFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.formListEntriesFilterStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      formListEntriesFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      title,
      billtitle_title: invoice,
      issueDate
    } = getFormControls

    const disabled = getFormStatus.loading

    return (
      <div>
        <TextInput
          autoFocus
          name="title"
          label={ title.label }
          helperText="Informe um título para a pesquisa"
          value={ title.value }
          isValid={ title.isValid }
          showError={ title.showError }
          rules={ title.rules }
          errorText={ title.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <TextInput
          name="billtitle_title"
          label={ invoice.label }
          helperText="Informe uma fatura para a pesquisa"
          value={ invoice.value }
          isValid={ invoice.isValid }
          showError={ invoice.showError }
          rules={ invoice.rules }
          errorText={ invoice.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <DatePickerInput
          name="issueDate"
          label={ issueDate.label }
          helperText="Informe uma data de emissão para a pesquisa"
          value={ issueDate.value }
          isValid={ issueDate.isValid }
          showError={ issueDate.showError }
          rules={ issueDate.rules }
          errorText={ issueDate.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
      </div>
    )
  }
}

FormListEntriesFilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  formListEntriesFilterStore: MobxPropTypes.objectOrObservableObject
}

FormListEntriesFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ formListEntriesFilterStore })
)(FormListEntriesFilterContainer)
