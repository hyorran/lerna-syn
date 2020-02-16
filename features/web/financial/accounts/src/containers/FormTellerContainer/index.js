import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import AutomaticAutocompletes from '@syntesis/c-inputs/src/containers/AutomaticAutocompletes'
import formTellerStore from '../../stores/formTellerStore'

@inject('formTellerStore')
@observer
class FormTellerContainer extends Component {
  render() {
    const { formTellerStore: store } = this.props

    const {
      getFormStatus,
      getFormControls
    } = store

    const { loading } = getFormStatus
    const { eletronicPaymentConfig: { value } } = getFormControls

    return (
      <AutomaticAutocompletes
        collectionName="eletronicPaymentConfig"
        collectionControls={ { ...value } }
        disabled={ loading }
        store={ store }
      />
    )
  }
}

FormTellerContainer.propTypes = {
  // eslint-disable-next-line react/require-default-props
  formTellerStore: MobxPropTypes.objectOrObservableObject
}

export default withStores({ formTellerStore })(FormTellerContainer)
