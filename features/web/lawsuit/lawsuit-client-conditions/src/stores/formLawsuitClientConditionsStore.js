import { FormStore } from '@syntesis/c-inputs'
import {
  postLawsuitClientConditions,
  putLawsuitClientConditions,
  getLawsuitClientConditions
} from '@syntesis/s-lawsuit-client-conditions'

class FormLawsuitClientConditionsStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        hash: {
          value: ''
        },
        code: {
          value: '',
          rules: ['required']
        },
        clientCondition: {
          value: '',
          rules: ['required']
        },
        defendantCondition: {
          value: '',
          rules: ['required']
        },
        active: {
          value: true
        }
      }
    })

    this.services = {
      get: getLawsuitClientConditions,
      create: postLawsuitClientConditions,
      update: putLawsuitClientConditions
    }
  }
}

const store = new FormLawsuitClientConditionsStore()
export default store
