import first from 'lodash/first'
import get from 'lodash/get'
// import omitBy from 'lodash/omitBy'
import moment from 'moment/moment'
import { FormStore } from '@syntesis/c-inputs'
import { postAssignments } from '@syntesis/s-assignments'

class FormExpedientNotesActivityStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        assignmentOrigin: {
          value: '',
          rules: ['required']
        },
        // availabilityPeriod: {
        //   value: {
        //     from: {
        //       value: '',
        //       rules: ['date', 'required']
        //     },
        //     to: {
        //       value: '',
        //       rules: ['date', 'required']
        //     }
        //   }
        // },
        beginningDate: {
          value: moment().format('YYYY-MM-DD'),
          rules: ['date', 'required']
        },
        finalDate: {
          value: '',
          rules: ['date', 'required']
        },
        priority: {
          value: '',
          rules: ['required']
        },
        responsibleId: {
          value: '',
          rules: ['required']
        },
        // teamId: {
        //   value: ''
        // },
        notify: {
          value: ''
        },
        notificationType: {
          value: ''
        },
        lawsuitExpedientNotesId: {
          value: ''
        },
        assignmentType: {
          value: 'TASK'
        },
        task: {
          value: true
        },
        title: {
          value: 'Tarefa NE'
        },
        description: {
          value: 'Nova tarefa criada em NE.'
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      create: postAssignments
    }
  }

  // transformDataToApi(data) {
  //   data = {
  //     ...data,
  //     beginningDate: get(data, 'availabilityPeriod.from'),
  //     finalDate: get(data, 'availabilityPeriod.to')
  //   }
  //   data = omitBy(data, (_, key) => key === 'availabilityPeriod')
  //   return data
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

const store = new FormExpedientNotesActivityStore()
export default store
