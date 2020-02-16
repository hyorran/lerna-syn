import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormOccurrencesFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        active: {
          label: 'Ativo',
          value: null,
          checked: null,
          filterOperation: 'equals'
        },
        code: {
          label: 'Código',
          value: ''
        },
        description: {
          label: 'Descrição',
          value: ''
        }
      }
    })
  }
}

// const hydrate = create({})
const store = new FormOccurrencesFilterStore()
// hydrate('FormOccurrencesFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
