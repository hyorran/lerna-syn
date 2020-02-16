import first from 'lodash/first'
import get from 'lodash/get'
import omitBy from 'lodash/omitBy'
import moment from 'moment/moment'
import { FormStore } from '@syntesis/c-inputs'
import { momentBackDateFormat, momentBackMonthYearFormat } from '@syntesis/c-pickers/src/utils'
import { postTransferBetweenAccounts } from '@syntesis/s-cobilling'

class FormReceiptsTransferStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        companyPlaceId: {
          value: '',
          rules: ['required', 'disabled']
        },
        cobillingPlaceId: {
          value: ''
        },
        cobillingCustomerPlaceId: {
          value: ''
        },
        originBankAccountId: {
          value: '',
          rules: ['required', 'disabled']
        },
        financerNatureId: {
          value: '',
          rules: ['required']
        },
        amount: {
          value: '',
          rules: ['required', 'float', 'disabled']
        },
        destinyBankAccountId: {
          value: '',
          rules: ['required']
        },
        transferDate: {
          value: moment().startOf('day').format(momentBackDateFormat),
          rules: ['date', 'required', 'disabled']
        },
        competence: {
          value: moment().format(momentBackMonthYearFormat),
          rules: ['required', 'disabled']
        },
        financialHistoryId: {
          value: ''
        },
        complement: {
          value: ''
        },
        integrateaAccounting: {
          value: false,
          rules: ['disabled']
        },
        accountingDebitCc: {
          value: ''
        },
        accountingCreditCc: {
          value: ''
        },
        sumFinCobIds: {
          value: []
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      create: postTransferBetweenAccounts
    }
  }

  transformDataToApi(data) {
    data = omitBy(data, (_, key) => key === 'companyPlaceId')
    data = omitBy(data, (_, key) => key === 'competence')
    data = omitBy(data, (_, key) => key === 'accountingDebitCc')
    data = omitBy(data, (_, key) => key === 'accountingCreditCc')
    return data
  }

  onSubmitError(e = {}) {
    const { messages } = e
    const msg = first(messages)
    const errorText = get(msg, 'message')

    this.formControls = {
      ...this.formControls,
      code: {
        ...this.formControls.code,
        showError: true,
        isValid: false,
        errorText
      }
    }
  }
}

const store = new FormReceiptsTransferStore()
export default store
