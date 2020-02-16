import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import AutomaticAutocompletes from '@syntesis/c-inputs/src/containers/AutomaticAutocompletes'
import formLawsuitStagesStore from '../../stores/formLawsuitStagesStore'

@inject('formLawsuitStagesStore')
@observer
class FormConfigurationContainer extends Component {
  render() {
    const { formLawsuitStagesStore: store } = this.props

    const {
      getFormStatus,
      getFormControls
    } = store

    const { loading } = getFormStatus
    const { configuration: { value } } = getFormControls

    return (
      <AutomaticAutocompletes
        collectionName="configuration"
        collectionControls={ { ...value } }
        disabled={ loading }
        store={ store }
      />
    )
  }
}

FormConfigurationContainer.propTypes = {
  // eslint-disable-next-line react/require-default-props
  formLawsuitStagesStore: MobxPropTypes.objectOrObservableObject
}

export default withStores({ formLawsuitStagesStore })(FormConfigurationContainer)
