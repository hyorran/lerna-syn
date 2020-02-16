import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'
import { withStores } from '@syntesis/c-stores-provider'
import lawsuitClientConditionsFilterStore from '../../stores/formLawsuitClientConditionsFilterStore'

import styles from './styles'

@inject('lawsuitClientConditionsFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.lawsuitClientConditionsFilterStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      lawsuitClientConditionsFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      active,
      code,
      clientCondition,
      defendantCondition,
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
          name="clientCondition"
          label={ clientCondition.label }
          helperText="Informe uma condição cliente para a pesquisa"
          value={ clientCondition.value.toString() }
          isValid={ clientCondition.isValid }
          showError={ clientCondition.showError }
          rules={ clientCondition.rules }
          errorText={ clientCondition.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <TextInput
          name="defendantCondition"
          label={ defendantCondition.label }
          helperText="Informe uma condição adverso para a pesquisa"
          value={ defendantCondition.value.toString() }
          isValid={ defendantCondition.isValid }
          showError={ defendantCondition.showError }
          rules={ defendantCondition.rules }
          errorText={ defendantCondition.errorText }
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
  lawsuitClientConditionsFilterStore: MobxPropTypes.objectOrObservableObject
}

FormFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ lawsuitClientConditionsFilterStore })
)(FormFilterContainer)
