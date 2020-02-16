import { FormStore } from '@syntesis/c-inputs'
import {
  postDistribuitions,
  putDistribuitions,
  getDistribuitions
} from '@syntesis/s-distribuitions'

class FormDistribuitionsStore extends FormStore {
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
      get: getDistribuitions,
      create: postDistribuitions,
      update: putDistribuitions
    }
  }
}

const store = new FormDistribuitionsStore()
export default store
