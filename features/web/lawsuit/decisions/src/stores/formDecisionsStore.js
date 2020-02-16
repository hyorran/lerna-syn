import { FormStore } from '@syntesis/c-inputs'
import {
  postDecisions,
  putDecisions,
  getDecisions
} from '@syntesis/s-decisions'

class FormDecisionsStore extends FormStore {
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
        name: {
          value: '',
          rules: ['required']
        },
        active: {
          value: true
        }
      }
    })

    this.services = {
      get: getDecisions,
      create: postDecisions,
      update: putDecisions
    }
  }
}

const store = new FormDecisionsStore()
export default store
