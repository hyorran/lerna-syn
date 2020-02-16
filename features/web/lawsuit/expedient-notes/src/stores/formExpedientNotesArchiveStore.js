import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import { archiveLawsuitExpedientNotes } from '@syntesis/s-lawsuit-expedient-notes'

class FormExpedientNotesArchiveStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        generateOccurrence: {
          value: false
        },
        lawsuitOccurrenceId: {
          value: '',
          rules: []
        },
        occurrenceId: {
          value: '',
          rules: []
        },
        sendEmail: {
          value: false
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      update: archiveLawsuitExpedientNotes,
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

const store = new FormExpedientNotesArchiveStore()
export default store
