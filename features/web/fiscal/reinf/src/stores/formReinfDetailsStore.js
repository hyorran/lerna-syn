import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import moment from 'moment/moment'
import { momentBackMonthYearFormat } from '@syntesis/c-pickers/src/utils'

class FormReinfDetailsStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        code: {
          value: '',
          rules: ['required']
        },
        description: {
          value: ''
        },
        competence: {
          value: moment().format(momentBackMonthYearFormat),
          rules: ['required', 'monthYear'],
          isValid: true
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

const store = new FormReinfDetailsStore()
export default store
