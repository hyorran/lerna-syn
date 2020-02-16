import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import { reviewLawsuitExpedientNotes } from '@syntesis/s-lawsuit-expedient-notes'

class FormExpedientNotesReviewStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        lawsuitExpedientNotesId: {
          value: ''
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      update: reviewLawsuitExpedientNotes,
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

const store = new FormExpedientNotesReviewStore()
export default store
