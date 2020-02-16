import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'
import { withStores } from '@syntesis/c-stores-provider'
import localsFilterStore from '../../stores/formLocalsFilterStore'
import getBrazilStates from '@syntesis/c-functions/src/getBrazilStates'

import styles from './styles'

@inject('localsFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.localsFilterStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      localsFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      active,
      code,
      city,
      state
    } = getFormControls

    const disabled = getFormStatus.loading

    const states = getBrazilStates

    return (
      <div>
        <Checkbox
          inline
          isValid
          indeterminateRule
          name="active"
          label="Ativo"
          value={ active.value }
          checked={ active.checked }
          errorText={ active.errorText }
          onChange={ this.onFormChange }
          rules={ active.rules }
          disabled={ disabled }
        />
        <TextInput
          autoFocus
          name="code"
          label={ code.label }
          helperText="Informe um código para a pesquisa"
          value={ code.value }
          isValid={ code.isValid }
          showError={ code.showError }
          rules={ code.rules }
          errorText={ code.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <TextInput
          name="city"
          label={ city.label }
          helperText="Informe uma cidade para a pesquisa"
          value={ city.value.toString() }
          isValid={ city.isValid }
          showError={ city.showError }
          rules={ city.rules }
          errorText={ city.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="state"
          label="Estado"
          helperText="Informe um estado para o local"
          options={ states }
          value={ state.value }
          isValid={ state.isValid }
          showError={ state.showError }
          checked={ state.value }
          errorText={ state.errorText }
          onChange={ this.onFormChange }
          rules={ state.rules }
          disabled={ disabled }
        />
      </div>
    )
  }
}

FormFilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  localsFilterStore: MobxPropTypes.objectOrObservableObject
}

FormFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ localsFilterStore })
)(FormFilterContainer)
