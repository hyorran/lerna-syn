import { FormStore } from '@syntesis/c-inputs'
import {
  postOccurrences,
  putOccurrences,
  getOccurrences
} from '@syntesis/s-occurrences'

class FormOccurrencesStore extends FormStore {
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
        description: {
          value: '',
          rules: ['required']
        },
        active: {
          value: true
        }
      }
    })

    this.services = {
      get: getOccurrences,
      create: postOccurrences,
      update: putOccurrences
    }
  }
}

const store = new FormOccurrencesStore()
export default store
