import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
// import flow from 'lodash/fp/flow'
// import getFP from 'lodash/fp/get'
// import firstFP from 'lodash/fp/first'
// import toArray from 'lodash/fp/toArray'
import { linkProcessLawsuitExpedientNotes } from '@syntesis/s-lawsuit-expedient-notes'

class FormExpedientNotesLinkProcessStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        linkType: {
          value: '1'
        },
        lawsuitId: {
          value: '',
          rules: ['required']
        },
        lawsuitTypeId: {
          value: ''
        },
        processNumber: {
          value: ''
        },
        authorId: {
          value: ''
        },
        causeLawyerId: {
          value: ''
        },
        defendantId: {
          value: ''
        },
        oppositeLawyerId: {
          value: ''
        },
        actobjectId: {
          value: ''
        },
        acttypeId: {
          value: ''
        },
        judgementId: {
          value: ''
        },
        distribuitionId: {
          value: ''
        },
        entry: {
          value: ''
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      update: linkProcessLawsuitExpedientNotes
    }
  }

  // transformDataToApi(data) {
  //   const lawsuitId = flow(
  //     getFP('lawsuitId'),
  //     toArray,
  //     firstFP
  //   )(data)
  //
  //   return {
  //     ...data,
  //     lawsuitId
  //   }
  // }

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

const store = new FormExpedientNotesLinkProcessStore()
export default store
