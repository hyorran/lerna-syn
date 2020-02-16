import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import parseInt from 'lodash/parseInt'
import map from 'lodash/map'
import filter from 'lodash/filter'
import uniq from 'lodash/uniq'
import toString from 'lodash/toString'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Form from '@syntesis/c-inputs/src/components/Form'
import HiddenInput from '@syntesis/c-inputs/src/components/HiddenInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import TextArea from '@syntesis/c-inputs/src/components/TextArea'
import Switch from '@syntesis/c-inputs/src/components/Switch'
import { withStores } from '@syntesis/c-stores-provider'
import { hasAccountingIntegration } from '@syntesis/s-financers-natures'
import { getFinancersNaturesForSelect } from '@syntesis/s-cobilling'
import Chip from '@syntesis/c-commons/src/components/Chip'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import {
  momentBackDateFormat,
  momentFriendlyDateFormat,
  momentBackMonthYearFormat,
  momentFriendlyMonthYearFormat
} from '@syntesis/c-pickers/src/utils'
import moment from 'moment/moment'
import formReceiptsTransferStore from '../../../../stores/ReceiptsStore/formReceiptsTransferStore'

import styles from './styles'

@inject('formReceiptsTransferStore')
@observer
class FormReceiptsTransferContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.setAccountingValue = this.setAccountingValue.bind(this)
    this.getFinancersNatures = this.getFinancersNatures.bind(this)
    this.verifyHasAccounting = this.verifyHasAccounting.bind(this)
    this.verifyBankDestiny = this.verifyBankDestiny.bind(this)

    this.state = {
      mode: {
        create: true
      },
      listFinancersNatures: [],
      loadingFinancersNatures: true
    }
  }

  componentDidMount() {
    this.getFinancersNatures()
  }

  onFormChange(controlName, control, setAsOriginal) {
    this.props.formReceiptsTransferStore.changeFormControl(controlName, control, setAsOriginal)

    if (controlName === 'financerNatureId') {
      this.verifyHasAccounting()
    } else if (controlName === 'integrateaAccounting') {
      this.verifyBankDestiny(true)
    } else if (controlName === 'destinyBankAccountId') {
      this.verifyBankDestiny()
    }
  }

  async setAccountingValue(accountId, isCredit) {
    const {
      getAccountingInfo,
      formReceiptsTransferStore: {
        getFormControls: {
          integrateaAccounting
        }
      }
    } = this.props

    const checked = get(integrateaAccounting, 'value', false)
    const value = checked ? accountId : ''
    await getAccountingInfo(value, isCredit)
  }

  async getFinancersNatures() {
    try {
      const body = await getFinancersNaturesForSelect()

      this.setState(prevState => ({
        ...prevState,
        listFinancersNatures: map(body.response, ({ value, label }) => ({
          value: toString(value),
          label
        })),
        loadingFinancersNatures: false
      }), this.props.stopModalLoading)
    } catch (e) {
      throw e
    }
  }

  verifyBankDestiny(getDebitAccounting = false) {
    const {
      formReceiptsTransferStore: {
        getFormControls: {
          originBankAccountId,
          destinyBankAccountId,
        }
      }
    } = this.props

    if (!isEmpty(destinyBankAccountId.value)) {
      this.setAccountingValue(destinyBankAccountId.value, true)
    }
    if (getDebitAccounting) {
      this.setAccountingValue(originBankAccountId.value, false)
    }
  }

  async verifyHasAccounting(runGet = true) {
    try {
      const {
        formReceiptsTransferStore: {
          changeFormControl,
          getFormControls: {
            financerNatureId,
            integrateaAccounting
          }
        }
      } = this.props

      let response = {}
      let value = get(financerNatureId, 'value', null)
      if (!isEmpty(value) && runGet) {
        value = parseInt(value)
        const { response: requestResponse } = await hasAccountingIntegration({ id: value })
        response = requestResponse
      }

      const showAccounting = get(response, 'integrateaAccounting', false)

      changeFormControl('integrateaAccounting', {
        ...integrateaAccounting,
        value: showAccounting,
        rules: showAccounting
          ? filter(integrateaAccounting.rules || [], item => item !== 'disabled')
          : uniq([
            ...integrateaAccounting.rules || [],
            'disabled'
          ])
      })

      this.verifyBankDestiny(true)
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
      loading,
      formReceiptsTransferStore: store,
      listHistory,
      loadingHistory,
      listBankAccounts,
      loadingBankAccounts
    } = this.props

    const { getFormControls } = store

    const {
      cobillingPlaceId,
      cobillingCustomerPlaceId,
      financerNatureId,
      amount,
      accountingDebitCc,
      destinyBankAccountId,
      integrateaAccounting,
      transferDate,
      competence,
      financialHistoryId,
      complement,
      sumFinCobIds
    } = getFormControls

    const {
      mode,
      listFinancersNatures,
      loadingFinancersNatures
    } = this.state

    const disabled = loading

    const {
      bankAccountCompanyPlace,
      bankAccount
    } = item

    return (
      <div>
        <div className={ classes.chipContainer }>
          <Chip
            label="Valor"
            value={ formatMoney(amount.value) }
            tooltip="Valor para a transferência."
          />
          <Chip
            label="Competência"
            value={
              moment(
                competence.value,
                momentBackMonthYearFormat
              ).format(momentFriendlyMonthYearFormat)
            }
            tooltip="Competência da transferência."
          />
          <Chip
            label="Data transferência"
            value={
              moment(
                transferDate.value,
                momentBackDateFormat
              ).format(momentFriendlyDateFormat)
            }
            tooltip="Data da transferência."
          />
          <Chip
            label="Conta de origem"
            textAsError={ !accountingDebitCc.isValid && accountingDebitCc.showError }
            value={ bankAccount }
            tooltip="Conta para a transferência."
          />
          <Chip
            label="Local de origem"
            value={ bankAccountCompanyPlace }
            tooltip="Local para a transferência."
          />
        </div>
        <Form
          mode={ mode }
          store={ store }
          onSuccess={ () => onSuccess(dialogId) }
          controls={ { ...getFormControls } }
          item={ item }
          containerClass={ classes.formContainer }
        >
          <HiddenInput
            name="cobillingPlaceId"
            value={ cobillingPlaceId.value }
          />
          <HiddenInput
            name="cobillingCustomerPlaceId"
            value={ cobillingCustomerPlaceId.value }
          />
          <HiddenInput
            name="sumFinCobIds"
            value={ sumFinCobIds.value }
          />
          <Switch
            name="integrateaAccounting"
            label="Integra Contabilidade"
            value={ integrateaAccounting.value }
            isValid
            checked={ integrateaAccounting.value }
            errorText={ integrateaAccounting.errorText }
            onChange={ this.onFormChange }
            rules={ integrateaAccounting.rules }
            disabled={ disabled }
          />
          <AutocompleteInput
            name="financerNatureId"
            label="Natureza financeira"
            helperText="Selecione a natureza financeira para a transferência"
            options={ listFinancersNatures }
            value={ financerNatureId.value }
            isValid={ financerNatureId.isValid }
            showError={ financerNatureId.showError }
            errorText={ financerNatureId.errorText }
            onChange={ this.onFormChange }
            rules={ financerNatureId.rules }
            loading={ loadingFinancersNatures }
            disabled={ disabled }
          />
          <AutocompleteInput
            name="destinyBankAccountId"
            label="Conta destino"
            helperText="Selecione a conta destino para a transferência"
            options={ listBankAccounts }
            value={ destinyBankAccountId.value }
            isValid={ destinyBankAccountId.isValid }
            showError={ destinyBankAccountId.showError }
            errorText={ destinyBankAccountId.errorText }
            onChange={ this.onFormChange }
            rules={ destinyBankAccountId.rules }
            loading={ loadingBankAccounts }
            disabled={ disabled }
          />
          <AutocompleteInput
            name="financialHistoryId"
            label="Histórico"
            helperText="Selecione o histórico para a transferência"
            options={ listHistory }
            value={ financialHistoryId.value }
            isValid={ financialHistoryId.isValid }
            showError={ financialHistoryId.showError }
            errorText={ financialHistoryId.errorText }
            onChange={ this.onFormChange }
            rules={ financialHistoryId.rules }
            loading={ loadingHistory }
            disabled={ disabled }
          />
          <TextArea
            name="complement"
            label="Complemento"
            helperText="Informe o complemento para a transferência"
            value={ complement.value }
            isValid={ complement.isValid }
            showError={ complement.showError }
            rules={ complement.rules }
            errorText={ complement.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
          />
        </Form>
      </div>
    )
  }
}

FormReceiptsTransferContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  startModalLoading: PropTypes.func.isRequired,
  stopModalLoading: PropTypes.func.isRequired,
  getAccountingInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  autoFocus: PropTypes.bool,
  adjustHeight: PropTypes.func,
  listHistory: PropTypes.array,
  loadingHistory: PropTypes.bool,
  listBankAccounts: PropTypes.array,
  loadingBankAccounts: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formReceiptsTransferStore: MobxPropTypes.objectOrObservableObject
}

FormReceiptsTransferContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {},
  autoFocus: true,
  adjustHeight: () => {},
  listHistory: [],
  loadingHistory: true,
  listBankAccounts: [],
  loadingBankAccounts: true,
}

export default flow(
  withStyles(styles),
  withStores({ formReceiptsTransferStore })
)(FormReceiptsTransferContainer)
