import React, { Component } from 'react'
import TextArea from '@syntesis/c-inputs/src/components/TextArea'
// import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import reasonStore from './store'

@inject('reasonStore')
@observer
class FormDelete extends Component {
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
        helperText="Informe um motivo para excluir o item"
        value={ reason.value }
        isValid={ reason.isValid }
        showError={ reason.showError }
        rules={ reason.rules }
        errorText={ reason.errorText }
        onChange={ changeFormControl }
      />
      // <AutocompleteInput
      //   name="reason"
      //   label="Motivo"
      //   helperText="Selecione o motivo para excluir o item"
      //   options={ [{ label: 'Opção 1', value: '1' }, { label: 'Opção 2', value: '2' }] }
      //   value={ reason.value }
      //   isValid={ reason.isValid }
      //   showError={ reason.showError }
      //   errorText={ reason.errorText }
      //   onChange={ changeFormControl }
      //   rules={ reason.rules }
      //   loading={ false }
      // />
    )
  }
}

FormDelete.propTypes = {
  // eslint-disable-next-line react/require-default-props
  reasonStore: MobxPropTypes.objectOrObservableObject
}

export default withStores({ reasonStore })(FormDelete)
