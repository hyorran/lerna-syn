import { FormStore } from '@syntesis/c-inputs'

class FormListDocEntriesFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        'title': {
          label: 'Título',
          value: '',
          rules: [],
          filterOperation: 'contains'
        },
        'billtitle_title': {
          label: 'Fatura',
          value: '',
          rules: [],
          filterOperation: 'contains'
        },
        issueDate: {
          label: 'Data emissão',
          value: '',
          rules: ['date']
        }
      }
    })
  }
}

const store = new FormListDocEntriesFilterStore()
export default store
