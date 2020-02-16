import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import uniq from 'lodash/uniq'
import remove from 'lodash/remove'
import indexOf from 'lodash/indexOf'
import map from 'lodash/map'
import get from 'lodash/get'
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import CurrencyInput from '@syntesis/c-inputs/src/components/CurrencyInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'
import Switch from '@syntesis/c-inputs/src/components/Switch'
import { withStores } from '@syntesis/c-stores-provider'
import { getCompaniesPlacesForSelect } from '@syntesis/s-companies-places'
import { getBanksForSelect } from '@syntesis/s-banks'
import { getAccountAccountingForSelect, getBankAccountsForSelect } from '@syntesis/s-bank-accounts'
import formDetailsStore from '../../stores/formDetailsStore'

import styles from './styles'

@inject('formDetailsStore')
@observer
class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.onFormChange = this.onFormChange.bind(this)
    this.getCompaniesPlacesOptions = this.getCompaniesPlacesOptions.bind(this)
    this.getFinancialInstitutionsOptions = this.getFinancialInstitutionsOptions.bind(this)
    this.getBankAccountsOptions = this.getBankAccountsOptions.bind(this)
    this.adjustFieldsByType = this.adjustFieldsByType.bind(this)

    this.state = {
      companiesPlacesList: [],
      companiesPlacesLoading: true,
      banksList: [],
      banksLoading: true,
      bankAccountsList: [],
      bankAccountsLoading: true,
      accountAccountingList: [],
      accountAccountingLoading: true
    }
  }

  componentDidMount() {
    Promise.all([
      this.getCompaniesPlacesOptions(),
      this.getFinancialInstitutionsOptions(),
      // this.getBankAccountsOptions(),
      this.getAccountAccountingOptions()
    ])
  }

  onFormChange(controlName, control) {
    const {
      formDetailsStore: {
        changeFormControl
      }
    } = this.props

    changeFormControl(controlName, control)

    if (controlName === 'type') {
      this.adjustFieldsByType(
        control.value === '2',
        ['bankId', 'required'],
        ['agency', 'required'],
        ['agencyCheckDigit'],
        ['account', 'required'],
        ['accountCheckDigit'],
        ['operation'],
        ['post']
      )
    }
  }

  async getCompaniesPlacesOptions() {
    const { response } = await getCompaniesPlacesForSelect(null)
    this.setState(prevState => ({
      ...prevState,
      companiesPlacesList: response,
      companiesPlacesLoading: false
    }))
  }

  async getFinancialInstitutionsOptions() {
    const { response } = await getBanksForSelect(null)
    this.setState(prevState => ({
      ...prevState,
      banksList: response,
      banksLoading: false
    }))
  }

  async getBankAccountsOptions() {
    const { response } = await getBankAccountsForSelect(null)
    this.setState(prevState => ({
      ...prevState,
      bankAccountsList: response,
      bankAccountsLoading: false
    }))
  }

  async getAccountAccountingOptions() {
    const { response } = await getAccountAccountingForSelect()
    this.setState(prevState => ({
      ...prevState,
      accountAccountingList: response,
      accountAccountingLoading: false
    }))
  }

  adjustFieldsByType(hasBankIntegration, ...controlsRules) {
    const {
      formDetailsStore: {
        getFormControls,
        changeAllFormControls
      }
    } = this.props

    let newControls
    if (hasBankIntegration) {
      newControls = map(controlsRules, ([controlName, ...controlRules]) => {
        const newControl = get(getFormControls, controlName)
        return {
          [controlName]: {
            ...newControl,
            rules: uniq([
              ...(newControl.rules || []),
              ...controlRules
            ])
          }
        }
      })
    } else {
      newControls = map(controlsRules, ([controlName, ...controlRules]) => {
        const newControl = get(getFormControls, controlName)
        const rules = get(newControl, 'rules', [])
        remove(rules, item => indexOf(controlRules, item) > -1)

        return {
          [controlName]: {
            ...newControl,
            value: '',
            rules
          }
        }
      })
    }
    newControls = reduce(newControls, (acc, control) => ({ ...acc, ...control }), {})
    changeAllFormControls(newControls)
  }

  render() {
    const {
      // classes,
      mode,
      isActiveStepper,
      modalLoading,
      formDetailsStore: store
    } = this.props

    const {
      getFormControls,
      hasBankIntegration,
      isTeller
    } = store

    const {
      companiesPlacesList,
      companiesPlacesLoading,
      banksList,
      banksLoading,
      // bankAccountsList,
      // bankAccountsLoading,
      accountAccountingList,
      accountAccountingLoading
    } = this.state

    const {
      code,
      description,
      type,
      companyPlaceId,
      bankId,
      agency,
      agencyCheckDigit,
      account,
      accountCheckDigit,
      operation,
      post,
      openingBalance,
      signal,
      date,
      accountAccounting,
      accountAttendance,
      active
    } = getFormControls

    const disabled = modalLoading

    const typeOptions = [
      {
        value: '1',
        label: 'Caixa'
      },
      {
        value: '2',
        label: 'Instituição Financeira'
      }
    ]

    const signalOptions = [
      {
        value: '1',
        label: 'Débito'
      },
      {
        value: '2',
        label: 'Crédito'
      }
    ]

    const selectedBank = find(banksList, bank => bank.value === bankId.value)
    const bankSynsuiteCode = get(selectedBank, 'synsuiteCode')


    return (
      <div>
        <TextInput
          autoFocus={ isActiveStepper }
          name="code"
          label={ code.label }
          helperText="Informe um código para a conta"
          value={ code.value.toString() }
          isValid={ code.isValid }
          showError={ code.showError }
          rules={ code.rules }
          errorText={ code.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          inputProps={ {
            inputProps: {
              maxLength: 255
            }
          } }
        />
        <TextInput
          name="description"
          label={ description.label }
          helperText="Informe um título para a conta"
          value={ description.value }
          isValid={ description.isValid }
          showError={ description.showError }
          rules={ description.rules }
          errorText={ description.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          inputProps={ {
            inputProps: {
              maxLength: 255
            }
          } }
        />
        <AutocompleteInput
          name="companyPlaceId"
          label={ companyPlaceId.label }
          helperText="Informe um local para a conta"
          options={ companiesPlacesList }
          loading={ companiesPlacesLoading }
          value={ companyPlaceId.value }
          isValid={ companyPlaceId.isValid }
          rules={ companyPlaceId.rules }
          showError={ companyPlaceId.showError }
          errorText={ companyPlaceId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="type"
          label={ type.label }
          helperText="Informe um tipo para a conta"
          options={ typeOptions }
          value={ type.value }
          isValid={ type.isValid }
          rules={ type.rules }
          showError={ type.showError }
          errorText={ type.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        {
          hasBankIntegration
            ? (
              <Fragment>
                <AutocompleteInput
                  name="bankId"
                  label={ bankId.label }
                  helperText="Informe uma instituição financeira para a conta"
                  options={ banksList }
                  loading={ banksLoading }
                  value={ bankId.value }
                  isValid={ bankId.isValid }
                  rules={ bankId.rules }
                  showError={ bankId.showError }
                  errorText={ bankId.errorText }
                  onChange={ this.onFormChange }
                  disabled={ disabled }
                />
                <Grid container spacing={ 16 }>
                  <Grid
                    item
                    lg={ 9 }
                    md={ 9 }
                    sm={ 9 }
                    xs={ 9 }
                  >
                    <TextInput
                      name="agency"
                      label={ agency.label }
                      helperText="Informe a agência de sua conta"
                      value={ agency.value }
                      isValid={ agency.isValid }
                      showError={ agency.showError }
                      rules={ agency.rules }
                      errorText={ agency.errorText }
                      onChange={ this.onFormChange }
                      disabled={ disabled }
                    />
                  </Grid>
                  <Grid
                    item
                    lg={ 3 }
                    md={ 3 }
                    sm={ 3 }
                    xs={ 3 }
                  >
                    <TextInput
                      name="agencyCheckDigit"
                      label={ agencyCheckDigit.label }
                      value={ agencyCheckDigit.value }
                      isValid={ agencyCheckDigit.isValid }
                      showError={ agencyCheckDigit.showError }
                      rules={ agencyCheckDigit.rules }
                      errorText={ agencyCheckDigit.errorText }
                      onChange={ this.onFormChange }
                      disabled={ disabled }
                      inputProps={ {
                        inputProps: {
                          maxLength: 1
                        }
                      } }
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={ 16 }>
                  <Grid
                    item
                    lg={ 9 }
                    md={ 9 }
                    sm={ 9 }
                    xs={ 9 }
                  >
                    <TextInput
                      name="account"
                      label={ account.label }
                      helperText="Informe o número de sua conta"
                      value={ account.value }
                      isValid={ account.isValid }
                      showError={ account.showError }
                      rules={ account.rules }
                      errorText={ account.errorText }
                      onChange={ this.onFormChange }
                      disabled={ disabled }
                    />
                  </Grid>
                  <Grid
                    item
                    lg={ 3 }
                    md={ 3 }
                    sm={ 3 }
                    xs={ 3 }
                  >
                    <TextInput
                      name="accountCheckDigit"
                      label={ accountCheckDigit.label }
                      value={ accountCheckDigit.value }
                      isValid={ accountCheckDigit.isValid }
                      showError={ accountCheckDigit.showError }
                      rules={ accountCheckDigit.rules }
                      errorText={ accountCheckDigit.errorText }
                      onChange={ this.onFormChange }
                      disabled={ disabled }
                      inputProps={ {
                        inputProps: {
                          maxLength: 1
                        }
                      } }
                    />
                  </Grid>
                </Grid>
                {
                  bankSynsuiteCode === 104 // CEF
                    ? (
                      <TextInput
                        name="operation"
                        label={ operation.label }
                        value={ operation.value }
                        isValid={ operation.isValid }
                        showError={ operation.showError }
                        rules={ operation.rules }
                        errorText={ operation.errorText }
                        onChange={ this.onFormChange }
                        disabled={ disabled }
                      />
                    )
                    : null
                }
                {
                  bankSynsuiteCode === 748 // Sicredi
                    ? (
                      <TextInput
                        name="post"
                        label={ post.label }
                        value={ post.value }
                        isValid={ post.isValid }
                        showError={ post.showError }
                        rules={ post.rules }
                        errorText={ post.errorText }
                        onChange={ this.onFormChange }
                        disabled={ disabled }
                      />
                    )
                    : null
                }
              </Fragment>
            )
            : null
        }
        <Grid container spacing={ 16 }>
          <Grid
            item
            lg={ 7 }
            md={ 7 }
            sm={ 7 }
            xs={ 7 }
          >
            <CurrencyInput
              name="openingBalance"
              label={ openingBalance.label }
              helperText={ 'Saldo inicial da conta bancária na data definida no campo "Data saldo inicial"' }
              value={ openingBalance.value }
              isValid={ openingBalance.isValid }
              showError={ openingBalance.showError }
              rules={ openingBalance.rules }
              errorText={ openingBalance.errorText }
              onChange={ this.onFormChange }
              disabled={ disabled }
            />
          </Grid>
          <Grid
            item
            lg={ 5 }
            md={ 5 }
            sm={ 5 }
            xs={ 5 }
          >
            <AutocompleteInput
              name="signal"
              label={ signal.label }
              helperText="Este campo define o sinal do saldo inicial cadastrado"
              options={ signalOptions }
              value={ signal.value }
              isValid={ signal.isValid }
              rules={ signal.rules }
              showError={ signal.showError }
              errorText={ signal.errorText }
              onChange={ this.onFormChange }
              disabled={ disabled }
              isClearable={ false }
            />
          </Grid>
        </Grid>
        <DatePickerInput
          name="date"
          label={ date.label }
          helperText="Informe uma data para o saldo inicial dessa conta"
          value={ date.value }
          isValid={ date.isValid }
          showError={ date.showError }
          rules={ date.rules }
          errorText={ date.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="accountAccounting"
          label={ accountAccounting.label }
          helperText="Informe a conta contábil vinculada à conta"
          options={ accountAccountingList }
          loading={ accountAccountingLoading }
          value={ accountAccounting.value }
          isValid={ accountAccounting.isValid }
          rules={ accountAccounting.rules }
          showError={ accountAccounting.showError }
          errorText={ accountAccounting.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        {
          isTeller
            ? (
              <Switch
                name="accountAttendance"
                label={ accountAttendance.label }
                value={ accountAttendance.value }
                isValid
                checked={ accountAttendance.value }
                errorText={ accountAttendance.errorText }
                onChange={ this.onFormChange }
                rules={ accountAttendance.rules }
                disabled={ disabled }
                helperText={ 'Caso estiver marcado, irá habilitar o passo "Caixa Atendimento" para preenchimento' }
              />
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
        />
      </div>
    )
  }
}

FormContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  isActiveStepper: PropTypes.bool.isRequired,
  mode: PropTypes.object.isRequired,
  modalLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  formDetailsStore: MobxPropTypes.objectOrObservableObject
}

export default flow(
  withStyles(styles),
  withStores({
    formDetailsStore
  })
)(FormContainer)
