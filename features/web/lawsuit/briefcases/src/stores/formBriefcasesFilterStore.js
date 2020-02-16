import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormBriefcasesFilterStore extends FormStore {
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
        },
        type: {
          label: 'Tipo',
          value: '',
          filterOperation: 'equals'
        }
      }
    })
  }
}

// const hydrate = create({})
const store = new FormBriefcasesFilterStore()
// hydrate('FormBriefcasesFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
