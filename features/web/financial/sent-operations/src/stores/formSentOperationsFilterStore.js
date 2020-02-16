import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormSentOperationsFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        orderId: {
          label: 'Identificador',
          value: '',
          filterOperation: 'contains'
        },
        status: {
          label: 'Situação',
          value: '',
          filterOperation: 'equals'
        },
        operationTypeId: {
          label: 'Tipo de Operação',
          value: '',
          filterOperation: 'equals'
        },
        isCredit: {
          label: 'Modalidade',
          value: '',
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

// const hydrate = create({})
const store = new FormSentOperationsFilterStore()
// hydrate('FormSentOperationsFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
