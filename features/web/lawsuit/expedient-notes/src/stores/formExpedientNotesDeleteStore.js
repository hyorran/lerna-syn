import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import { deleteLawsuitExpedientNotes } from '@syntesis/s-lawsuit-expedient-notes'

class FormExpedientNotesDeleteStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        solicitationRoutingMotivesId: {
          value: '',
          rules: ['required']
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      update: deleteLawsuitExpedientNotes,
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

const store = new FormExpedientNotesDeleteStore()
export default store
