import { FormStore } from '@syntesis/c-inputs'
import { computed } from 'mobx'

class FormFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        code: {
          label: 'Código',
          value: '',
          filterOperation: 'contains'
        },
        description: {
          label: 'Título',
          value: '',
          filterOperation: 'contains'
        },
        type: {
          label: 'Tipo',
          value: '',
          filterOperation: 'equals'
        },
        companyPlaceId: {
          label: 'Local',
          value: '',
          filterOperation: 'equals'
        },
        agency: {
          label: 'Agência',
          value: '',
          filterOperation: 'contains'
        },
        agencyCheckDigit: {
          label: 'Díg. verificador',
          value: '',
          filterOperation: 'contains'
        },
        account: {
          label: 'Conta',
          value: '',
          filterOperation: 'contains'
        },
        accountCheckDigit: {
          label: 'Díg. verificador',
          value: '',
          filterOperation: 'contains'
        },
        bankId: {
          label: 'Instituição Financeira',
          value: '',
          filterOperation: 'equals'
        },
        operation: {
          label: 'Operação',
          value: '',
          filterOperation: 'contains'
        },
        post: {
          label: 'Posto da cooperativa',
          value: '',
          filterOperation: 'contains'
        },
        openingBalance: {
          label: 'Saldo inicial',
          value: '',
          filterOperation: 'equals'
        },
        signal: {
          label: 'Sinal',
          value: '',
          filterOperation: 'equals'
        },
        date: {
          label: 'Data saldo inicial',
          value: '',
          rules: ['date'],
          filterOperation: 'equals'
        },
        accountAccounting: {
          label: 'Conta contábil',
          value: '',
          filterOperation: 'equals'
        },
        accountAttendance: {
          label: 'Caixa Atendimento',
          value: null,
          checked: null,
          filterOperation: 'equals'
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

  @computed
  get hasBankIntegration() {
    const { type } = this.formControls
    return type.value === '2'
  }

  @computed
  get isTeller() {
    const { type } = this.formControls
    return type.value === '1'
  }
}

const store = new FormFilterStore()
export default store
