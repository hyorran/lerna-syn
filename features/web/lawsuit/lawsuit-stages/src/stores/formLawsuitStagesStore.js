import { FormStore } from '@syntesis/c-inputs'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import {
  postLawsuitStages,
  putLawsuitStages,
  getLawsuitStages,
  getLawsuitStagesConfigurationControls
} from '@syntesis/s-lawsuit-stages'

class FormLawsuitStagesStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        hash: {
          value: ''
        },
        code: {
          value: '',
          rules: ['required']
        },
        title: {
          value: '',
          rules: ['required']
        },
        active: {
          value: true
        },
        configuration: {
          getControls: getLawsuitStagesConfigurationControls
        }
      }
    })

    this.services = {
      get: getLawsuitStages,
      create: postLawsuitStages,
      update: putLawsuitStages
    }
  }


  // transformApiData(response = {}) {
  //   try {
  //     const {
  //       configuration,
  //       ...otherFields
  //     } = response
  //
  //     return {
  //       ...otherFields,
  //       configuration: JSON.parse(configuration)
  //     }
  //   } catch (e) {
  //     return response
  //   }
  // }

  transformDataToApi(data = {}) {
    const configuration = flow(
      get('configuration'),
      map.convert({ cap: false })((value, key) => ({
        key,
        value
      }))
    )(data)

    return {
      ...data,
      configuration
    }
  }
}

const store = new FormLawsuitStagesStore()
export default store
