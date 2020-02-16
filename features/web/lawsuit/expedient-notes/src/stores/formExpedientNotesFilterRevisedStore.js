import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormExpedientNotesFilterRevisedStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        rawEvent: {
          label: 'Evento',
          value: ''
        },
        rawProcessNumber: {
          label: 'Processo',
          value: ''
        },
        revisedDate: {
          label: 'Data revisão',
          value: '',
          rules: ['date'],
          filterOperation: 'equals'
        },
        privateObservation: {
          label: 'Observações Internas',
          value: ''
        },
        observation: {
          label: 'Conteúdo',
          value: ''
        },
        lawsuitId: {
          label: 'Vínculo',
          value: null,
          checked: null
        }
      }
    })
  }
}

// const hydrate = create({})
const store = new FormExpedientNotesFilterRevisedStore()
// hydrate('FormExpedientNotesFilterRevisedStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
