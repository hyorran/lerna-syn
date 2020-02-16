import { FormStore } from '@syntesis/c-inputs'
// import { create } from 'mobx-persist'
// import get from 'lodash/get'
// import omitBy from 'lodash/omitBy'

class FormAssignmentsFilterStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        'lawsuit_processNumber': {
          label: 'Processo',
          value: '',
          filterOperation: 'contains'
        },
        assignmentOrigin: {
          label: 'Tipo de atividade',
          value: '',
          filterOperation: 'equals'
        },
        responsibleId: {
          label: 'Responsável',
          value: '',
          filterOperation: 'equals'
        },
        requestorId: {
          label: 'Solicitante',
          value: '',
          filterOperation: 'equals'
        },
        progress: {
          label: 'Progresso',
          value: '',
          filterOperation: 'equals'
        },
        finalDate: {
          label: 'Prazo',
          value: '',
          rules: ['date'],
          filterOperation: 'equals'
        },
        priority: {
          label: 'Prioridade',
          value: '',
          filterOperation: 'equals'
        }
      }
    })
  }
}

// const hydrate = create({})
const store = new FormAssignmentsFilterStore()
// hydrate('FormAssignmentsFilterStore', store).then((hydratedStore) => {
//   hydratedStore.setOriginalControls(hydratedStore.formControls)
// })

export default store
