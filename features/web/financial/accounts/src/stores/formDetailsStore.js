import { FormStore } from '@syntesis/c-inputs'
import { computed } from 'mobx'
import moment from 'moment/moment'
import { momentBackDateFormat } from '@syntesis/c-pickers/src/utils'

class FormDetailsStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        code: {
          label: 'Código',
          value: '',
          rules: ['required']
        },
        description: {
          label: 'Título',
          value: '',
          rules: ['required']
        },
        type: {
          label: 'Tipo',
          value: '',
          rules: ['required']
        },
        companyPlaceId: {
          label: 'Local',
          value: '',
          rules: ['required']
        },
        agency: {
          label: 'Agência',
          value: ''
        },
        agencyCheckDigit: {
          label: 'Díg. verificador',
          value: ''
        },
        account: {
          label: 'Conta',
          value: ''
        },
        accountCheckDigit: {
          label: 'Díg. verificador',
          value: ''
        },
        bankId: {
          label: 'Instituição Financeira',
          value: ''
        },
        operation: {
          label: 'Operação',
          value: ''
        },
        post: {
          label: 'Posto da cooperativa',
          value: ''
        },
        openingBalance: {
          label: 'Saldo inicial',
          value: '0'
        },
        signal: {
          label: 'Sinal',
          value: '1'
        },
        date: {
          label: 'Data saldo inicial',
          value: moment().format(momentBackDateFormat),
          rules: ['required', 'date']
        },
        accountAccounting: {
          label: 'Conta contábil',
          value: ''
        },
        accountAttendance: {
          label: 'Habilitar "Caixa Atendimento"',
          value: false
        },
        active: {
          label: 'Ativo',
          value: true
        },
        hash: {
          value: ''
        }
      }
    })

    // this.onSubmitError = this.onSubmitError.bind(this)
  }

  // onSubmitError(e = {}) {
  //   const { messages } = e
  //   const msg = first(messages)
  //   const errorText = get(msg, 'message')
  //
  //   this.formControls = {
  //     ...this.formControls,
  //     code: {
  //       ...this.formControls.code,
  //       showError: true,
  //       isValid: false,
  //       errorText
  //     }
  //   }
  // }

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

const store = new FormDetailsStore()
export default store
