import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import {
  postAssignmentOrigins,
  putAssignmentOrigins,
  getAssignmentOrigins
} from '@syntesis/s-assignment-origins'

class FormAssignmentOriginsStore extends FormStore {
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
        description: {
          value: '',
          rules: ['required']
        },
        moduleId: {
          value: '',
          rules: ['required']
        },
        active: {
          value: true
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      get: getAssignmentOrigins,
      create: postAssignmentOrigins,
      update: putAssignmentOrigins
    }
  }

  onSubmitError(e = {}) {
    const { messages } = e
    const msg = first(messages)
    const errorText = get(msg, 'message')

    this.formControls = {
      ...this.formControls,
      code: {
        ...this.formControls.code,
        showError: true,
        isValid: false,
        errorText
      }
    }
  }
}

const store = new FormAssignmentOriginsStore()
export default store
