import React, { Component } from 'react'
import TextArea from '@syntesis/c-inputs/src/components/TextArea'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import reasonStore from './store'

@inject('reasonStore')
@observer
class FormCancel extends Component {
  render() {
    const {
      reasonStore: {
        changeFormControl,
        getFormControls: {
          reason
        }
      }
    } = this.props

    return (
      <TextArea
        autoFocus
        name="reason"
        label="Motivo"
        helperText="Informe um motivo para cancelar o item"
        value={ reason.value }
        isValid={ reason.isValid }
        showError={ reason.showError }
        rules={ reason.rules }
        errorText={ reason.errorText }
        onChange={ changeFormControl }
      />
    )
  }
}

FormCancel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  reasonStore: MobxPropTypes.objectOrObservableObject
}

export default withStores({ reasonStore })(FormCancel)
