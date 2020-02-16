import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormLawsuitClientConditionsFilterStore extends FormStore {
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
        clientCondition: {
          label: 'Condição Cliente',
          value: ''
        },
        defendantCondition: {
          label: 'Condição Adverso',
          value: ''
        }
      }
    })
  }
}

// const hydrate = create({})
const store = new FormLawsuitClientConditionsFilterStore()
// hydrate('FormLawsuitClientConditionsFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
