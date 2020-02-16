import { FormStore } from '@syntesis/c-inputs'
import {
  postCrmForms,
  putCrmForms,
  getCrmForms
} from '@syntesis/s-crm-forms'

class FormContactFormsStore extends FormStore {
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
      get: getCrmForms,
      create: postCrmForms,
      update: putCrmForms
    }
  }
}

const store = new FormContactFormsStore()
export default store
