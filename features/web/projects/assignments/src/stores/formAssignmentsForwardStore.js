import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import {
  getAssignments,
  forwardAssignment
} from '@syntesis/s-assignments'

class FormAssignmentsForwardStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        responsibleId: {
          value: '',
          rules: ['required', 'disabled']
        },
        newResponsibleId: {
          value: '',
          rules: ['required']
        },
        // finalDate: {
        //   value: '',
        //   rules: ['required']
        // },
        forwardMotivesId: {
          value: '',
          rules: ['required']
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      get: getAssignments,
      update: forwardAssignment
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

const store = new FormAssignmentsForwardStore()
export default store
