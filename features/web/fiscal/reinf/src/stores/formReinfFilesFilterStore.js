import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormReinfFilesFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        competence: {
          value: '',
          rules: ['monthYear']
        },
        fileLayout: {
          value: ''
        },
        fileStatus: {
          value: ''
        }
      }
    })
  }
}

// const hydrate = create({})
const store = new FormReinfFilesFilterStore()
// hydrate('formReinfFilesFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
