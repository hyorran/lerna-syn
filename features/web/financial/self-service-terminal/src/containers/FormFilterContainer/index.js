import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'
import { withStores } from '@syntesis/c-stores-provider'
import selfServiceTerminalFilterStore from '../../stores/formSelfServiceTerminalFilterStore'

import styles from './styles'

@inject('selfServiceTerminalFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.selfServiceTerminalFilterStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      selfServiceTerminalFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      active,
      code,
      title,
      identifier
    } = getFormControls

    const disabled = getFormStatus.loading

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
          name="title"
          label={ title.label }
          helperText="Informe um título para a pesquisa"
          value={ title.value.toString() }
          isValid={ title.isValid }
          showError={ title.showError }
          rules={ title.rules }
          errorText={ title.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <TextInput
          name="identifier"
          label={ identifier.label }
          helperText="Informe um identificador para a pesquisa"
          value={ identifier.value.toString() }
          isValid={ identifier.isValid }
          showError={ identifier.showError }
          rules={ identifier.rules }
          errorText={ identifier.errorText }
          onChange={ this.onFormChange }
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
  selfServiceTerminalFilterStore: MobxPropTypes.objectOrObservableObject
}

FormFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ selfServiceTerminalFilterStore })
)(FormFilterContainer)
