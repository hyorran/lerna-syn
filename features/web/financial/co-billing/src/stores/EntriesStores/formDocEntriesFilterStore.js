import { FormStore } from '@syntesis/c-inputs'

class FormDocEntriesFilterStore extends FormStore {
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
        'invoiceNote_documentNumber': {
          label: 'Nº NFSe',
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

const store = new FormDocEntriesFilterStore()
export default store
