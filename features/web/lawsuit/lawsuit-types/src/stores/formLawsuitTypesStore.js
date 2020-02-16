import { FormStore } from '@syntesis/c-inputs'
import parseInt from 'lodash/parseInt'
import toString from 'lodash/toString'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import {
  postLawsuitTypes,
  putLawsuitTypes,
  getLawsuitTypes,
  getLawsuitTypesConfigurationControls
} from '@syntesis/s-lawsuit-types'

class FormLawsuitTypesStore extends FormStore {
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
        stages: {
          value: []
        },
        configuration: {
          getControls: getLawsuitTypesConfigurationControls
        }
      }
    })

    // this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      get: getLawsuitTypes,
      create: postLawsuitTypes,
      update: putLawsuitTypes
    }
  }

  transformApiData(response = {}) {
    try {
      const {
        lawsuitTypesStages,
        configuration,
        ...otherFields
      } = response

      const stages = map(({ value }) => toString(value))(lawsuitTypesStages)

      return {
        ...otherFields,
        configuration: JSON.parse(configuration),
        stages
      }
    } catch (e) {
      return response
    }
  }

  transformDataToApi(data = {}) {
    const configuration = flow(
      get('configuration'),
      map.convert({ cap: false })((value, key) => ({
        key,
        value
      }))
    )(data)

    const stages = flow(
      get('stages'),
      map(value => parseInt(value))
    )(data)

    return {
      ...data,
      configuration,
      stages
    }
  }
}

const store = new FormLawsuitTypesStore()
export default store
