import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'

class FormReinfDetailsStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        boughtServices: {
          value: false
        },
        soldServices: {
          value: false
        },
        cprb: {
          value: false
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
      boughtServices: {
        ...this.formControls.code,
        showError: true,
        isValid: false,
        errorText
      }
    }
  }
}

const store = new FormReinfDetailsStore()
export default store
