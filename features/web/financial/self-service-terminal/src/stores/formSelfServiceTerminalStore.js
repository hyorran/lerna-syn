import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import {
  postSelfServiceTerminal,
  putSelfServiceTerminal,
  getSelfServiceTerminal
} from '@syntesis/s-self-service-terminal'

class FormSelfServiceTerminalStore extends FormStore {
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
        identifier: {
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

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      get: getSelfServiceTerminal,
      create: postSelfServiceTerminal,
      update: putSelfServiceTerminal
    }
  }

  // transformApiData = (response = {}) => ({
  //   ...response,
  //   userId: get(response, 'user.id', ''),
  //   type: get(response, 'type.value', '')
  // })

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

const store = new FormSelfServiceTerminalStore()
export default store
