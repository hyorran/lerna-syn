import { FormStore } from '@syntesis/c-inputs'

class FormReceiptsFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        cobillingPlaceId: {
          label: 'Local',
          value: '',
          rules: [],
          filterOperation: 'equals'
        },
        cobillingCustomerPlaceId: {
          label: 'Cliente',
          value: '',
          rules: [],
          filterOperation: 'equals'
        },
      }
    })
  }
}

const store = new FormReceiptsFilterStore()
export default store
