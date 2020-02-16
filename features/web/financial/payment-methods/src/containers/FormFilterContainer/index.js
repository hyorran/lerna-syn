import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import { withStores } from '@syntesis/c-stores-provider'
import paymentMethodFilterStore from '../../stores/formPaymentMethodFilterStore'

import styles from './styles'

@inject('paymentMethodFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.paymentMethodFilterStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      paymentMethodFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      code,
      title,
      description
    } = getFormControls

    const disabled = getFormStatus.loading

    return (
      <div>
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
  paymentMethodFilterStore: MobxPropTypes.objectOrObservableObject
}

FormFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ paymentMethodFilterStore })
)(FormFilterContainer)
