import { FormStore } from '@syntesis/c-inputs'
import {
  postCrmMotives,
  putCrmMotives,
  getCrmMotives
} from '@syntesis/s-crm-motives'

class FormContactMotivesStore extends FormStore {
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
        title: {
          value: '',
          rules: ['required']
        },
        description: {
          value: ''
        },
        active: {
          value: true
        }
      }
    })

    this.services = {
      get: getCrmMotives,
      create: postCrmMotives,
      update: putCrmMotives
    }
  }
}

const store = new FormContactMotivesStore()
export default store
