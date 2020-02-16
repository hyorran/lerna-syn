import { FormStore } from '@syntesis/c-inputs'
import {
  postLocals,
  putLocals,
  getLocals
} from '@syntesis/s-locals'

class FormLocalsStore extends FormStore {
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
        city: {
          value: '',
          rules: ['required']
        },
        state: {
          value: '',
          rules: ['required']
        },
        active: {
          value: true
        }
      }
    })

    this.services = {
      get: getLocals,
      create: postLocals,
      update: putLocals
    }
  }
}

const store = new FormLocalsStore()
export default store
