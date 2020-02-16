import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'

class FormReasonStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        reason: {
          value: '',
          rules: ['required']
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      create: () => {}
    }
  }

  onSubmitError(e = {}) {
    const { messages } = e
    const msg = first(messages)
    const errorText = get(msg, 'message')

    this.formControls = {
      ...this.formControls,
      reason: {
        ...this.formControls.reason,
        showError: true,
        isValid: false,
        errorText
      }
    }
  }
}

const store = new FormReasonStore()
export default store
