import { FormStore } from '@syntesis/c-inputs'
import moment from 'moment/moment'
import { momentBackDateFormat } from '@syntesis/c-pickers/src/utils'
import {
  postLawsuitExpedientNotes,
  putLawsuitExpedientNotes,
  getLawsuitExpedientNotes
} from '@syntesis/s-lawsuit-expedient-notes'

class FormExpedientNotesStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        rawEvent: {
          value: '',
          rules: ['required']
        },
        lawsuitId: {
          value: ''
        },
        rawAvailableDate: {
          value: moment().startOf('day').format(momentBackDateFormat),
          rules: ['required', 'date']
        },
        rawPublicationDate: {
          value: '',
          rules: ['required', 'date']
        },
        observation: {
          value: '',
          rules: ['required', 'html']
        },
        privateObservation: {
          value: ''
        }
      }
    })

    this.services = {
      get: getLawsuitExpedientNotes,
      create: postLawsuitExpedientNotes,
      update: putLawsuitExpedientNotes
    }
  }
}

const store = new FormExpedientNotesStore()
export default store
