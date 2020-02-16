import { FormStore } from '@syntesis/c-inputs'
import {
  postBank,
  putBank,
  getBank
} from '@syntesis/s-banks'

class FormFinancialInstitutionsStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        code: {
          label: 'Código',
          value: '',
          rules: ['required']
        },
        name: {
          label: 'Nome',
          value: '',
          rules: ['required']
        },
        reserveTransferSystemParticipant: {
          label: 'Participante STR',
          value: true
        },
        centralBankCode: {
          label: 'Código Banco Central',
          value: '',
          rules: ['required']
        },
        registeredName: {
          label: 'Nome extenso',
          value: '',
          rules: ['required']
        },
        identifierBrazilianPaymentSystem: {
          label: 'Identificador do participante (ISPB)',
          value: '',
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

    this.services = {
      get: getBank,
      create: postBank,
      update: putBank
    }
  }

  transformApiData(data) {
    const { reserveTransferSystemParticipant } = data
    if (!reserveTransferSystemParticipant) {
      return {
        ...data,
        centralBankCode: '',
        identifierBrazilianPaymentSystem: ''
      }
    }
    return data
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
}

const store = new FormFinancialInstitutionsStore()
export default store
