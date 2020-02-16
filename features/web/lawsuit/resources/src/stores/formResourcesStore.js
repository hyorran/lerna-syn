import { FormStore } from '@syntesis/c-inputs'
import {
  postResources,
  putResources,
  getResources
} from '@syntesis/s-resources'

class FormResourcesStore extends FormStore {
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
      get: getResources,
      create: postResources,
      update: putResources
    }
  }
}

const store = new FormResourcesStore()
export default store
