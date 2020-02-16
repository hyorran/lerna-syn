import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import map from 'lodash/map'
import toString from 'lodash/toString'
import reduce from 'lodash/reduce'
import parseInt from 'lodash/parseInt'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalVerticalSteppers from '@syntesis/c-modals/src/containers/VerticalSteppers'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import { getFinancialHistoriesForSelect } from '@syntesis/s-financial-histories'
import { getAccountingInfos, getBankAccountsForSelect } from '@syntesis/s-bank-accounts'
import formReceiptsTransferStore from '../../../stores/ReceiptsStore/formReceiptsTransferStore'
import FormReceiptsTransferContainer from '../../../containers/ReceiptsContainers/FormsReceiptsTransferContainers/FormReceiptsTransferContainer'
import ReceiptsAccountingContainer from '../../../containers/ReceiptsContainers/FormsReceiptsTransferContainers/ReceiptsAccountingContainer'

import styles from './styles'

@inject('formReceiptsTransferStore')
@observer
class FormReceiptsTransferModal extends Component {
  constructor(props) {
    super(props)
    this.initForm = this.initForm.bind(this)
    this.onChangeActiveStepper = this.onChangeActiveStepper.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.saveForm = this.saveForm.bind(this)
    this.startModalLoading = this.startModalLoading.bind(this)
    this.stopModalLoading = this.stopModalLoading.bind(this)
    this.getFinancialHistories = this.getFinancialHistories.bind(this)
    this.getBankAccounts = this.getBankAccounts.bind(this)
    this.getAccountingInfo = this.getAccountingInfo.bind(this)

    this.state = {
      activeStepperIndex: 0,
      modalLoading: true,
      listHistory: [],
      loadingHistory: true,
      listBankAccounts: [],
      loadingBankAccounts: true
    }
  }

  componentDidMount() {
    this.initForm()
  }

  async onChangeActiveStepper(stepper, index) {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        ...prevState,
        activeStepperIndex: index
      }), resolve)
    })
  }

  onCloseModal() {
    const {
      dialogId,
      formReceiptsTransferStore: {
        changed
      }
    } = this.props

    if (changed) {
      window.openDialog({
        component: ({ dialogId: unsafeDialogId, open }) => (
          <UnsafeForm
            open={ open }
            dialogId={ unsafeDialogId }
            parentDialog={ dialogId }
          />
        )
      })
    } else {
      window.closeDialog(dialogId)
    }
  }

  async getFinancialHistories() {
    try {
      const body = await getFinancialHistoriesForSelect()

      return {
        listHistory: map(body.response, ({ value, label }) => ({
          value: toString(value),
          label
        })),
        loadingHistory: false
      }
    } catch (e) {
      throw e
    }
  }

  async getBankAccounts(companyPlaceId) {
    try {
      const body = await getBankAccountsForSelect({ id: null, companyPlaceId })
      if (isEmpty(get(body, 'response'))) {
        window.snackbar.warn(
          'Nenhuma conta vinculada ao cliente de co-billing.',
          {
            autoHideDuration: 15000
          }
        )
        return {
          listBankAccounts: [],
          loadingBankAccounts: false
        }
      }
      return {
        listBankAccounts: map(body.response, ({ value, label }) => ({
          value: toString(value),
          label
        })),
        loadingBankAccounts: false
      }
    } catch (e) {
      throw e
    }
  }

  async getAccountingInfo(id, isCredit) {
    const {
      formReceiptsTransferStore: {
        changeAllFormControls,
        getFormControls: {
          integrateaAccounting,
          originBankAccountId,
          destinyBankAccountId,
          accountingDebitCc,
          accountingCreditCc
        }
      }
    } = this.props

    let value = ''
    if (!isEmpty(id) && integrateaAccounting.value) {
      id = parseInt(id)
      try {
        const body = await getAccountingInfos({ id })
        const response = get(body, 'response')
        value = get(response, 'accountAccounting', '')
      } catch (e) {
        //
      }
    }

    let hasError = {
      isValid: true,
      errorText: '',
      showError: true
    }

    if (isCredit) {
      if (isEmpty(value) && integrateaAccounting.value) {
        hasError = {
          ...hasError,
          isValid: false,
          errorText: 'Conta contábil crédito não vinculada'
        }
      }
      changeAllFormControls({
        accountingCreditCc: {
          ...accountingCreditCc,
          ...hasError,
          value
        },
        destinyBankAccountId: {
          ...destinyBankAccountId,
          ...hasError
        }
      })
    } else {
      if (isEmpty(value) && integrateaAccounting.value) {
        hasError = {
          ...hasError,
          isValid: false,
          errorText: 'Conta contábil débito não vinculada'
        }
      }
      changeAllFormControls({
        accountingDebitCc: {
          ...accountingDebitCc,
          ...hasError,
          value
        },
        originBankAccountId: {
          ...originBankAccountId,
          ...hasError
        }
      })
    }
  }

  async initForm() {
    const {
      item,
      parentItem,
      formReceiptsTransferStore: {
        changeAllFormControls,
        getFormControls: {
          companyPlaceId,
          cobillingPlaceId,
          cobillingCustomerPlaceId,
          originBankAccountId,
          amount,
          sumFinCobIds
        }
      }
    } = this.props

    const cobillingCustomerId = get(item, 'cobillingClientCompanyPlaceId', null)
    const cobillingId = get(item, 'cobillingCompanyPlaceId', null)
    const bankPlaceId = get(item, 'bankAccountCompanyPlaceId', null)
    const bankId = get(item, 'bankAccountId', null)
    const amountValue = get(item, 'totalAmount')
    const ids = get(parentItem, 'sumFinCobIds', [])

    const response = await Promise.all([
      this.getBankAccounts(cobillingCustomerId),
      this.getFinancialHistories()
    ])

    const newState = reduce(response, (acc, obj) => ({ ...acc, ...obj }), {})

    this.setState(prevState => ({
      ...prevState,
      ...newState
    }), () => {
      changeAllFormControls({
        companyPlaceId: {
          ...companyPlaceId,
          value: bankPlaceId
        },
        cobillingPlaceId: {
          ...cobillingPlaceId,
          value: cobillingId
        },
        cobillingCustomerPlaceId: {
          ...cobillingCustomerPlaceId,
          value: cobillingCustomerId
        },
        originBankAccountId: {
          ...originBankAccountId,
          value: bankId
        },
        amount: {
          ...amount,
          value: amountValue
        },
        sumFinCobIds: {
          ...sumFinCobIds,
          value: ids
        }
      }, true)
    })
  }

  startModalLoading() {
    this.setState(prevState => ({
      ...prevState,
      modalLoading: true
    }))
  }

  stopModalLoading() {
    this.setState(prevState => ({
      ...prevState,
      modalLoading: false
    }))
  }

  async saveForm() {
    const {
      dialogId,
      onSuccess,
      formReceiptsTransferStore: {
        submit
      }
    } = this.props
    try {
      await submit()
      onSuccess(dialogId)
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      classes,
      ...otherProps
    } = this.props

    const {
      activeStepperIndex,
      modalLoading,
      listHistory,
      loadingHistory,
      listBankAccounts,
      loadingBankAccounts
    } = this.state

    const {
      item,
      createMode,
      formReceiptsTransferStore: {
        getFormMode,
        getFormControls: {
          companyPlaceId,
          originBankAccountId,
          financerNatureId,
          amount,
          destinyBankAccountId,
          integrateaAccounting,
          transferDate,
          competence,
          financialHistoryId,
          complement,
          accountingDebitCc,
          accountingCreditCc
        },
        getFormStatus: {
          loading: formLoading
        },
        changed
      }
    } = otherProps

    const loading = modalLoading || formLoading

    const steppers = [
      {
        title: 'Transferência',
        condition: true,
        completed: false,
        error: () => {
          const verify = {
            companyPlaceId,
            originBankAccountId,
            financerNatureId,
            amount,
            destinyBankAccountId,
            integrateaAccounting,
            transferDate,
            competence,
            financialHistoryId,
            complement
          }
          const response = find(verify, { isValid: false })
          return !isEmpty(response) && get(response, 'showError')
        },
        errorText: () => {
          const verify = {
            companyPlaceId,
            originBankAccountId,
            financerNatureId,
            amount,
            destinyBankAccountId,
            integrateaAccounting,
            transferDate,
            competence,
            financialHistoryId,
            complement
          }
          const response = find(verify, { isValid: false })
          return get(response, 'errorText')
        },
        contentComponent: FormReceiptsTransferContainer,
        contentComponentProps: {
          item,
          getAccountingInfo: this.getAccountingInfo,
          createMode,
          loading,
          startModalLoading: this.startModalLoading,
          stopModalLoading: this.stopModalLoading,
          listHistory,
          loadingHistory,
          listBankAccounts,
          loadingBankAccounts
        },
        onSuccess: this.saveForm,
        customProps: {
          buttonConfirm: {
            children: 'Transferir',
            disabled: (
              !changed
              || loading
              || !accountingCreditCc.isValid
              || !accountingDebitCc.isValid
            )
          }
        }
      },
      {
        title: 'Contábil',
        condition: get(integrateaAccounting, 'value', false),
        completed: false,
        error: () => {
          const verify = {
            accountingDebitCc,
            accountingCreditCc
          }
          const response = find(verify, { isValid: false })
          return !isEmpty(response) && get(response, 'showError')
        },
        errorText: () => {
          const verify = {
            accountingDebitCc,
            accountingCreditCc
          }
          const response = find(verify, { isValid: false })
          return get(response, 'errorText')
        },
        contentComponent: ReceiptsAccountingContainer,
        contentComponentProps: {
          autoFocus: false,
          item,
          listHistory,
          loadingHistory,
          listBankAccounts,
          loadingBankAccounts
        },
        onSuccess: this.saveForm,
        customProps: {
          buttonConfirm: {
            children: 'Contábil',
            disabled: (
              !changed
              || loading
              || !accountingCreditCc.isValid
              || !accountingDebitCc.isValid
            )
          }
        }
      }
    ]

    return (
      <ModalVerticalSteppers
        { ...otherProps }
        dialogProps={ {
          classes: {
            paper: classes.minHeight
          },
          fullWidth: true,
          maxWidth: 'md',
        } }
        escape={ !loading }
        steppers={ steppers }
        activeStepperIndex={ activeStepperIndex }
        modalLoading={ loading }
        mode={ getFormMode }
        title={ `Realizar transferência para ${ item.cobillingClientCompanyPlace }` }
        autoClose={ false }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

FormReceiptsTransferModal.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  parentItem: PropTypes.object,
  createMode: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formReceiptsTransferStore: MobxPropTypes.objectOrObservableObject,
}

FormReceiptsTransferModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {},
  parentItem: {},
  createMode: false
}

export default flow(
  withStores({ formReceiptsTransferStore }),
  withStyles(styles)
)(FormReceiptsTransferModal)
