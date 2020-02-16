import first from 'lodash/first'
import get from 'lodash/get'
import { FormStore } from '@syntesis/c-inputs'
import { postIssue } from '@syntesis/s-cobilling'

class FormEntriesIssueInvoiceModal extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        cobillingPlaceId: {
          value: '',
          rules: ['required', 'read-only'],
        },
        cobillingPlace: {
          value: '',
          rules: ['required', 'read-only'],
        },
        cobillingCustomerPlaceId: {
          value: '',
          rules: ['required', 'read-only'],
        },
        cobillingCustomerPlace: {
          value: '',
          rules: ['required', 'read-only'],
        },
        totalInvoiceAmount: {
          value: '0',
          rules: ['required', 'float'],
        },
        financialOperationId: {
          value: '',
          rules: ['required']
        },
        financialOperation: {
          value: '',
          rules: ['required']
        },
        serviceProductId: {
          value: '',
          rules: ['required']
        },
        serviceProduct: {
          value: '',
          rules: ['required']
        },
        financerNatureId: {
          value: '',
          rules: ['required']
        },
        financerNature: {
          value: '',
          rules: ['required']
        },
        paymentConditionId: {
          value: '',
          rules: ['required']
        },
        paymentCondition: {
          value: '',
          rules: ['required']
        },
        paymentConditionForwardTimes: {
          value: ''
        },
        financialCollectionTypeId: {
          value: '',
          rules: ['required']
        },
        financialCollectionType: {
          value: '',
          rules: ['required']
        },
        paymentAppreciation: {
          value: '',
          rules: ['required']
        },
        paymentAppreciationDescription: {
          value: '',
          rules: ['required']
        },
        paymentAppreciationValue: {
          value: '',
          rules: ['required']
        },
        cobillingTitleExpirationDays: {
          value: '',
          rules: ['required']
        },
        valueToInvoice: {
          value: '',
          rules: ['required']
        },
        sumFinCobIds: {
          value: [],
          rules: ['required']
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      create: postIssue
    }
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

const store = new FormEntriesIssueInvoiceModal()
export default store
