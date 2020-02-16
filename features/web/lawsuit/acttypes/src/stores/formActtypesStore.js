import { FormStore } from '@syntesis/c-inputs'
import {
  postActtypes,
  putActtypes,
  getActtypes
} from '@syntesis/s-acttypes'

class FormActtypesStore extends FormStore {
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
      get: getActtypes,
      create: postActtypes,
      update: putActtypes
    }
  }
}

const store = new FormActtypesStore()
export default store
