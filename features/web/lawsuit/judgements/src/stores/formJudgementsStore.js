import { FormStore } from '@syntesis/c-inputs'
import {
  postJudgements,
  putJudgements,
  getJudgements
} from '@syntesis/s-judgements'

class FormJudgementsStore extends FormStore {
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
        name: {
          value: '',
          rules: ['required']
        },
        active: {
          value: true
        }
      }
    })

    this.services = {
      get: getJudgements,
      create: postJudgements,
      update: putJudgements
    }
  }
}

const store = new FormJudgementsStore()
export default store
