import { FormStore } from '@syntesis/c-inputs'

class FormReceiptsTransferFilterStore extends FormStore {
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

const store = new FormReceiptsTransferFilterStore()
export default store
