import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import moment from 'moment/moment'
import { momentBackMonthYearFormat } from '@syntesis/c-pickers/src/utils'

class FormReinfR2060ActivityAdjustmentsStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        // Campos do container ADJUSTMENTS
        adjustType: {
          value: '0'
        },
        adjustCode: {
          value: '',
          rules: ['required']
        },
        adjust: {
          value: '0',
          rules: ['required', 'float']
        },
        adjustDescription: {
          value: '',
          rules: ['required']
        },
        adjustDate: {
          value: moment().format(momentBackMonthYearFormat),
          rules: ['required', 'monthYear']
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
      adjustType: {
        ...this.formControls.adjustType,
        showError: true,
        isValid: false,
        errorText
      }
    }
  }
}

const store = new FormReinfR2060ActivityAdjustmentsStore()
export default store
