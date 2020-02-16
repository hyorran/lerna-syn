import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormLawsuitTypesFilterStore extends FormStore {
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
        title: {
          label: 'Título',
          value: ''
        }
      }
    })
  }
}

// const hydrate = create({})
const store = new FormLawsuitTypesFilterStore()
// hydrate('FormLawsuitTypesFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
