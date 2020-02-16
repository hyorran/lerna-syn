import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormExpedientNotesFilterStore extends FormStore {
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
        rawAvailableDate: {
          label: 'Data de disponibilização',
          value: '',
          rules: ['date'],
          filterOperation: 'equals'
        },
        rawPublicationDate: {
          label: 'Data de publicação',
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
const store = new FormExpedientNotesFilterStore()
// hydrate('FormExpedientNotesFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
