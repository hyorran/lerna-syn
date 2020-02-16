import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormActtypesFilterStore extends FormStore {
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
        city: {
          label: 'Cidade',
          value: ''
        },
        state: {
          label: 'Estado',
          value: '',
          filterOperation: 'equals'
        }
      }
    })
  }
}

// const hydrate = create({})
const store = new FormActtypesFilterStore()
// hydrate('FormActtypesFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
