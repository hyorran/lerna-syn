import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import TextArea from '@syntesis/c-inputs/src/components/TextArea'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'
import { withStores } from '@syntesis/c-stores-provider'
import contactFormsFilterStore from '../../stores/formContactFormsFilterStore'

import styles from './styles'

@inject('contactFormsFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.contactFormsFilterStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      contactFormsFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      active,
      code,
      title,
      description
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
        <TextArea
          name="description"
          label={ description.label }
          helperText="Informe uma descrição para a pesquisa"
          value={ description.value.toString() }
          isValid={ description.isValid }
          showError={ description.showError }
          rules={ description.rules }
          errorText={ description.errorText }
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
  contactFormsFilterStore: MobxPropTypes.objectOrObservableObject
}

FormFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ contactFormsFilterStore })
)(FormFilterContainer)
