import { FormStore } from '@syntesis/c-inputs'

class FormFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        code: {
          label: 'Código',
          value: '',
          filterOperation: 'contains'
        },
        name: {
          label: 'Nome',
          value: '',
          filterOperation: 'contains'
        },
        registeredName: {
          label: 'Nome extenso',
          value: '',
          filterOperation: 'contains'
        },
        reserveTransferSystemParticipant: {
          label: 'Participante STR',
          value: null,
          checked: null,
          filterOperation: 'equals'
        },
        centralBankCode: {
          label: 'Código Banco Central',
          value: '',
          filterOperation: 'contains'
        },
        identifierBrazilianPaymentSystem: {
          label: 'Identificador do participante (ISPB)',
          value: '',
          filterOperation: 'contains'
        },
        active: {
          label: 'Ativo',
          value: null,
          checked: null,
          filterOperation: 'equals'
        }
      }
    })
  }
}

const store = new FormFilterStore()
export default store
