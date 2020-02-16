import { FormStore } from '@syntesis/c-inputs'

class FormReceiptsFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        'financialReceivableTitle_title': {
          label: 'Título',
          value: '',
          rules: [],
          filterOperation: 'contains'
        },
        'financialReceivableTitle_billTitle_title': {
          label: 'Fatura',
          value: '',
          rules: [],
          filterOperation: 'contains'
        },
        receiptDate: {
          label: 'Data recebimento',
          value: '',
          rules: ['date']
        }
      }
    })
  }
}

const store = new FormReceiptsFilterStore()
export default store
