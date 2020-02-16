import { FormStore } from '@syntesis/c-inputs'
import {
  postBriefcases,
  putBriefcases,
  getBriefcases
} from '@syntesis/s-briefcases'

class FormBriefcasesStore extends FormStore {
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
        type: {
          value: '',
          rules: ['required']
        },
        active: {
          value: true
        }
      }
    })

    this.services = {
      get: getBriefcases,
      create: postBriefcases,
      update: putBriefcases
    }
  }
}

const store = new FormBriefcasesStore()
export default store
