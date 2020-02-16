import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
// import { computed } from 'mobx'
import { getBankAccountParameters } from '@syntesis/s-bank-accounts'

class FormTellerStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        eletronicPaymentConfig: {
          getControls: getBankAccountParameters
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)
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

const store = new FormTellerStore()
export default store
