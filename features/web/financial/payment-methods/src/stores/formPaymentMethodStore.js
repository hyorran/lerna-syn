import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import {
  postPaymentMethod,
  putPaymentMethod,
  getPaymentMethod
} from '@syntesis/s-payment-methods'

class FormPaymentMethodStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        code: {
          value: '',
          rules: ['required']
        },
        title: {
          value: '',
          rules: ['required']
        },
        description: {
          value: ''
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      get: getPaymentMethod,
      create: postPaymentMethod,
      update: putPaymentMethod
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

const store = new FormPaymentMethodStore()
export default store
