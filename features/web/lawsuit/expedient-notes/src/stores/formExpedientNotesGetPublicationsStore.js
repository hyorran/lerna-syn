import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import omitBy from 'lodash/omitBy'
import { getPublicationsIntegrationLawsuitExpedientNotes } from '@syntesis/s-lawsuit-expedient-notes'

class FormExpedientNotesGetPublicationsStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        period: {
          value: {
            from: {
              value: '',
              rules: ['date', 'required']
            },
            to: {
              value: '',
              rules: ['date', 'required']
            }
          }
        },
        date: {
          value: '',
          rules: ['date', 'required']
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      create: getPublicationsIntegrationLawsuitExpedientNotes
    }
  }

  transformDataToApi(data) {
    if (!isEmpty(get(data, 'period.from'))) {
      data = {
        ...data,
        initialDate: get(data, 'period.from'),
        finalDate: get(data, 'period.to')
      }
    } else {
      data = {
        ...data,
        initialDate: get(data, 'date')
      }
    }
    data = omitBy(data, (_, key) => key === 'period')
    data = omitBy(data, (_, key) => key === 'date')
    return data
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

const store = new FormExpedientNotesGetPublicationsStore()
export default store
