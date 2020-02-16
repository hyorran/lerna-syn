import { FormStore } from '@syntesis/c-inputs'
import {
  postForums,
  putForums,
  getForums
} from '@syntesis/s-forums'

class FormForumsStore extends FormStore {
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
      get: getForums,
      create: postForums,
      update: putForums
    }
  }
}

const store = new FormForumsStore()
export default store
