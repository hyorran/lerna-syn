import { FormStore } from '@syntesis/c-inputs'
import {
  postActobjects,
  putActobjects,
  getActobjects
} from '@syntesis/s-actobjects'

class FormActobjectsStore extends FormStore {
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
      get: getActobjects,
      create: postActobjects,
      update: putActobjects
    }
  }
}

const store = new FormActobjectsStore()
export default store
