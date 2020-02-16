import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import formListReceiptsFilterStore from '../../../stores/ReceiptsStore/formListReceiptsFilterStore'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'

import styles from './styles'

@inject('formListReceiptsFilterStore')
@observer
class FormListReceiptsFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.formListReceiptsFilterStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      formListReceiptsFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      financialReceivableTitle_title: title,
      financialReceivableTitle_billTitle_title: invoice,
      receiptDate
    } = getFormControls

    const disabled = getFormStatus.loading

    return (
      <div>
        <TextInput
          autoFocus
          name="financialReceivableTitle_title"
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
          name="financialReceivableTitle_billTitle_title"
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
          name="receiptDate"
          label={ receiptDate.label }
          helperText="Informe uma data de recebimento para a pesquisa"
          value={ receiptDate.value }
          isValid={ receiptDate.isValid }
          showError={ receiptDate.showError }
          rules={ receiptDate.rules }
          errorText={ receiptDate.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
      </div>
    )
  }
}

FormListReceiptsFilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  formListReceiptsFilterStore: MobxPropTypes.objectOrObservableObject
}

FormListReceiptsFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ formListReceiptsFilterStore })
)(FormListReceiptsFilterContainer)
