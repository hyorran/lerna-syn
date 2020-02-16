import { FormStore } from '@syntesis/c-inputs'
import {
  postAreas,
  putAreas,
  getAreas
} from '@syntesis/s-areas'

class FormAreasStore extends FormStore {
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
      get: getAreas,
      create: postAreas,
      update: putAreas
    }
  }
}

const store = new FormAreasStore()
export default store
