import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormAssignmentOriginsFilterStore extends FormStore {
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
        },
        moduleId: {
          label: 'Módulo',
          value: '',
          filterOperation: 'equals'
        }
      }
    })
  }
}

// const hydrate = create({})
const store = new FormAssignmentOriginsFilterStore()
// hydrate('FormAssignmentOriginsFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
