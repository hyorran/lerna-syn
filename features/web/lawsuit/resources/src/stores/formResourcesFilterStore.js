import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormResourcesFilterStore extends FormStore {
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
        name: {
          label: 'Descrição',
          value: ''
        }
      }
    })
  }
}

// const hydrate = create({})
const store = new FormResourcesFilterStore()
// hydrate('FormResourcesFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
