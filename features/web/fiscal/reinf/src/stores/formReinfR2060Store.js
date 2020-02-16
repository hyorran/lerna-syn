import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'

class FormReinfR2060Store extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        /*
        * Formulário para o R-2060
        */
        totalGrossRevenue: {
          value: '0',
          rules: ['required', 'float']
        },
        totalCp: {
          value: '0',
          rules: ['required', 'float']
        },
        totalSuspCprb: {
          value: '0',
          rules: ['float']
        },
        activities: {
          value: []
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

const store = new FormReinfR2060Store()
export default store
