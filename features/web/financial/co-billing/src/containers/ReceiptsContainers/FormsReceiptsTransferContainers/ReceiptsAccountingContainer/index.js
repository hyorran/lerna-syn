import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import flow from 'lodash/fp/flow'
import findFP from 'lodash/fp/find'
import getFP from 'lodash/fp/get'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import { withStores } from '@syntesis/c-stores-provider'
import Chip from '@syntesis/c-commons/src/components/Chip'
import moment from 'moment/moment'
import formReceiptsTransferStore from '../../../../stores/ReceiptsStore/formReceiptsTransferStore'

import styles from './styles'
import {
  momentBackDateFormat,
  momentFriendlyDateFormat
} from '@syntesis/c-pickers/src/utils'
import formatMoney from '@syntesis/c-functions/src/formatMoney'

@inject('formReceiptsTransferStore')
@observer
class ReceiptsAccountingContainer extends Component {
  render() {
    const {
      classes,
      item,
      formReceiptsTransferStore: store,
      listBankAccounts,
      listHistory
    } = this.props

    const {
      getFormControls
    } = store

    const {
      accountingDebitCc,
      accountingCreditCc,
      transferDate,
      destinyBankAccountId,
      amount,
      financialHistoryId,
      complement
    } = getFormControls

    const {
      bankAccountCompanyPlace,
      bankAccount
    } = item

    const creditBank = flow(
      findFP(bank => bank.value === destinyBankAccountId.value),
      getFP('label')
    )(listBankAccounts)

    const history = flow(
      findFP(h => h.value === financialHistoryId.value),
      getFP('label')
    )(listHistory)

    return (
      <div className={ classes.container }>
        <Chip
          label="Data lançamento"
          value={
            moment(
              transferDate.value,
              momentBackDateFormat
            ).format(momentFriendlyDateFormat)
          }
          tooltip="Data do lançamento."
        />
        <Chip
          label="Local de origem"
          value={ bankAccountCompanyPlace }
          tooltip="Local do lançamento."
        />
        <Chip
          label="Conta Débito"
          textAsError={ !accountingDebitCc.isValid && accountingDebitCc.showError }
          value={
            accountingDebitCc.isValid
              ? `${ accountingDebitCc.value } - ${ bankAccount }`
              : accountingDebitCc.errorText
          }
        />
        <Chip
          label="Conta Crédito"
          textAsError={ !accountingCreditCc.isValid && accountingCreditCc.showError }
          value={
            accountingCreditCc.isValid
              ? `${ accountingCreditCc.value } - ${ !isEmpty(creditBank) ? creditBank : '' }`
              : accountingCreditCc.errorText
          }
        />
        <Chip
          label="Valor"
          value={ formatMoney(amount.value) }
        />
        <Chip
          label="Histórico"
          value={ history }
        />
        <Chip
          label="Complemento"
          value={ complement.value }
        />
      </div>
    )
  }
}

ReceiptsAccountingContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object,
  listHistory: PropTypes.array,
  loadingHistory: PropTypes.bool,
  listBankAccounts: PropTypes.array,
  loadingBankAccounts: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formReceiptsTransferStore: MobxPropTypes.objectOrObservableObject
}

ReceiptsAccountingContainer.defaultProps = {
  item: {},
  listHistory: [],
  loadingHistory: true,
  listBankAccounts: [],
  loadingBankAccounts: true
}

export default flow(
  withStyles(styles),
  withStores({ formReceiptsTransferStore })
)(ReceiptsAccountingContainer)
