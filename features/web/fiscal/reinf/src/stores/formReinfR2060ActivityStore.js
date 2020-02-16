import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'

class FormReinfR2060ActivityStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        fiscalEconomicActivityId: {
          value: '',
          rules: ['required']
        },
        grossRevenueActivity: {
          value: '0',
          rules: ['required', 'float']
        },
        excludedGrossRevenue: {
          value: '0',
          rules: ['required', 'float']
        },
        aditionalGrossRevenue: {
          value: '0',
          rules: ['required', 'float']
        },
        calcBaseCprb: {
          value: '0',
          rules: ['required', 'float']
        },
        valueCprb: {
          value: '0',
          rules: ['required', 'float']
        },
        adjustments: {
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
      fiscalEconomicActivityId: {
        ...this.formControls.fiscalEconomicActivityId,
        showError: true,
        isValid: false,
        errorText
      }
    }
  }
}

const store = new FormReinfR2060ActivityStore()
export default store
