import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'

class FormPaymentMethodFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
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
const store = new FormPaymentMethodFilterStore()
// hydrate('FormPaymentMethodFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
