import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import isNull from 'lodash/isNull'
import indexOf from 'lodash/indexOf'
import remove from 'lodash/remove'
import uniq from 'lodash/uniq'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import Switch from '@syntesis/c-inputs/src/components/Switch'
import { withStores } from '@syntesis/c-stores-provider'
import formStore from '../../stores/formStore'

import styles from './styles'
import HelpIconButton from '@syntesis/c-buttons/src/components/IconButton/HelpIconButton'

@inject('formStore')
@observer
class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.onFormChange = this.onFormChange.bind(this)
    this.adjustCentralBankInput = this.adjustCentralBankInput.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id // informa qual o id do item que está sendo editado
      }
    }
  }

  componentDidMount() {
    this.adjustCentralBankInput()
  }

  onFormChange(controlName, control) {
    this.props.formStore.changeFormControl(controlName, control)
    if (controlName === 'reserveTransferSystemParticipant') {
      this.adjustCentralBankInput()
    }
  }

  adjustCentralBankInput() {
    const {
      formStore: {
        changeAllFormControls,
        changeFormControl,
        getFormControls: {
          reserveTransferSystemParticipant,
          centralBankCode,
          identifierBrazilianPaymentSystem
        }
      }
    } = this.props

    if (!reserveTransferSystemParticipant.value) {
      const { rules: centralBankCodeRules } = centralBankCode
      remove(centralBankCodeRules, rule => rule === 'required')

      changeAllFormControls({
        centralBankCode: {
          ...centralBankCode,
          value: '',
          rules: centralBankCodeRules
        },
        identifierBrazilianPaymentSystem: {
          ...identifierBrazilianPaymentSystem,
          value: ''
        }
      })
    } else if (indexOf(centralBankCode.rules, 'required') < 0) {
      changeFormControl('centralBankCode', {
        ...centralBankCode,
        rules: uniq([
          ...centralBankCode.rules,
          'required'
        ])
      })
    }
  }

  render() {
    const {
      item,
      onSuccess,
      formStore: store,
    } = this.props

    const {
      synsuiteCode
    } = item

    const {
      getFormControls,
      getFormStatus
    } = store

    const {
      code,
      name,
      reserveTransferSystemParticipant,
      centralBankCode,
      registeredName,
      identifierBrazilianPaymentSystem,
      active
    } = getFormControls

    const { mode } = this.state

    const disabled = getFormStatus.loading

    return (
      <div>
        <Form
          mode={ mode }
          store={ store }
          onSuccess={ onSuccess }
          controls={ { ...getFormControls } }
          item={ item }
        >
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
            disabled={ disabled || isNull(synsuiteCode) }
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
            disabled={ disabled || isNull(synsuiteCode) }
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
            disabled={ disabled || isNull(synsuiteCode) }
          />
          <Switch
            name="reserveTransferSystemParticipant"
            label={ reserveTransferSystemParticipant.label }
            value={ reserveTransferSystemParticipant.value }
            isValid
            checked={ reserveTransferSystemParticipant.value }
            errorText={ reserveTransferSystemParticipant.errorText }
            onChange={ this.onFormChange }
            rules={ reserveTransferSystemParticipant.rules }
            disabled={ disabled || isNull(synsuiteCode) }
            helperText="Participante do Sistema de Transferência de Reservas"
          />
          {
            reserveTransferSystemParticipant.value
              ? (
                <Fragment>
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
                    disabled={ disabled || isNull(synsuiteCode) }
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
                    disabled={ disabled || isNull(synsuiteCode) }
                    inputProps={ {
                      inputProps: {
                        maxLength: 8
                      }
                    } }
                  />
                </Fragment>
              )
              : null
          }
          <Switch
            name="active"
            label={ active.label }
            value={ active.value }
            isValid
            checked={ active.value }
            errorText={ active.errorText }
            onChange={ this.onFormChange }
            rules={ active.rules }
            disabled={ mode.create || disabled }
            helperText="Informe o status do cadastro"
          />
        </Form>
      </div>
    )
  }
}

FormContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formStore: MobxPropTypes.objectOrObservableObject
}

FormContainer.defaultProps = {
  onSuccess: () => {},
  createMode: false,
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ formStore })
)(FormContainer)
