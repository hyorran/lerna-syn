import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormContactFormsFilterStore extends FormStore {
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
const store = new FormContactFormsFilterStore()
// hydrate('FormContactFormsFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
