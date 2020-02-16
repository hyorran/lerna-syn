import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import { withStores } from '@syntesis/c-stores-provider'
import formFilterStore from '../../stores/formFilterStore'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'

import styles from './styles'

@inject('formFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.formFilterStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      formFilterStore: {
        getFormControls,
        getFormStatus
      }
    } = this.props
    const {
      code,
      name,
      reserveTransferSystemParticipant,
      centralBankCode,
      registeredName,
      identifierBrazilianPaymentSystem,
      active
    } = getFormControls

    const disabled = getFormStatus.loading

    return (
      <div>
        <TextInput
          autoFocus
          name="code"
          label={ code.label }
          helperText="Informe um código para a instituição financeira"
          value={ code.value.toString() }
          isValid={ code.isValid }
          showError={ code.showError }
          rules={ code.rules }
          errorText={ code.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          inputProps={ {
            inputProps: {
              maxLength: 32
            }
          } }
        />
        <TextInput
          name="name"
          label={ name.label }
          helperText="Informe um nome para a instituição financeira"
          value={ name.value }
          isValid={ name.isValid }
          showError={ name.showError }
          rules={ name.rules }
          errorText={ name.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <TextInput
          name="registeredName"
          label={ registeredName.label }
          helperText="Denominação registrada no cadastro junto ao Banco Central do Brasil"
          value={ registeredName.value.toString() }
          isValid={ registeredName.isValid }
          showError={ registeredName.showError }
          rules={ registeredName.rules }
          errorText={ registeredName.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <Checkbox
          inline
          name="reserveTransferSystemParticipant"
          indeterminateRule
          value={ reserveTransferSystemParticipant.value }
          checked={ reserveTransferSystemParticipant.checked }
          isValid
          label={ reserveTransferSystemParticipant.label }
          errorText={ reserveTransferSystemParticipant.errorText }
          onChange={ this.onFormChange }
          rules={ reserveTransferSystemParticipant.rules }
          disabled={ disabled }
          helperText="Participante do Sistema de Transferência de Reservas"
        />
        <TextInput
          name="centralBankCode"
          label={ centralBankCode.label }
          helperText="Código identificador atribuído pelo Banco Central do Brasil às instituições participantes do STR"
          value={ centralBankCode.value.toString() }
          isValid={ centralBankCode.isValid }
          showError={ centralBankCode.showError }
          rules={ centralBankCode.rules }
          errorText={ centralBankCode.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          inputProps={ {
            inputProps: {
              maxLength: 3
            }
          } }
        />
        <TextInput
          name="identifierBrazilianPaymentSystem"
          label={ identifierBrazilianPaymentSystem.label }
          helperText="Identificador da instituição junto ao Banco Central para o Sistema de Pagamentos Brasileiro"
          value={ identifierBrazilianPaymentSystem.value.toString() }
          isValid={ identifierBrazilianPaymentSystem.isValid }
          showError={ identifierBrazilianPaymentSystem.showError }
          rules={ identifierBrazilianPaymentSystem.rules }
          errorText={ identifierBrazilianPaymentSystem.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          inputProps={ {
            inputProps: {
              maxLength: 8
            }
          } }
        />
        <Checkbox
          inline
          name="active"
          indeterminateRule
          value={ active.value }
          checked={ active.checked }
          isValid
          label={ active.label }
          errorText={ active.errorText }
          onChange={ this.onFormChange }
          rules={ active.rules }
          disabled={ disabled }
          helperText="Informe o status do cadastro"
        />
      </div>
    )
  }
}

FormFilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  formFilterStore: MobxPropTypes.objectOrObservableObject
}

export default flow(
  withStyles(styles),
  withStores({ formFilterStore })
)(FormFilterContainer)
