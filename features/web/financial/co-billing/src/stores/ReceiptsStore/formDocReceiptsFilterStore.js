import { FormStore } from '@syntesis/c-inputs'

class FormDocReceiptsFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        originCompanyPlaceId: {
          label: 'Local',
          value: '',
          rules: [],
          filterOperation: 'equals'
        },
        destinyCompanyPlaceId: {
          label: 'Cliente',
          value: '',
          rules: [],
          filterOperation: 'equals'
        },
        initialDate: {
          label: 'Data inicial',
          value: '',
          rules: ['date'],
          filterOperation: 'GreaterThanOrEquals'
        },
        finalDate: {
          label: 'Data final',
          value: '',
          rules: ['date'],
          filterOperation: 'LessThanOrEquals'
        }
      }
    })
  }
}

const store = new FormDocReceiptsFilterStore()
export default store
