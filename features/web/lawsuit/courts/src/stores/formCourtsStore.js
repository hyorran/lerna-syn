import { FormStore } from '@syntesis/c-inputs'
import {
  postCourts,
  putCourts,
  getCourts
} from '@syntesis/s-courts'

class FormCourtsStore extends FormStore {
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
      get: getCourts,
      create: postCourts,
      update: putCourts
    }
  }
}

const store = new FormCourtsStore()
export default store
