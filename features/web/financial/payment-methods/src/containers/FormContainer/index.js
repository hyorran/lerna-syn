import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import TextArea from '@syntesis/c-inputs/src/components/TextArea'
import SaveIconButton from '@syntesis/c-buttons/src/components/IconButton/SaveIconButton'
import { withStores } from '@syntesis/c-stores-provider'
import formPaymentMethodStore from '../../stores/formPaymentMethodStore'

import styles from './styles'

@inject('formPaymentMethodStore')
@observer
class FormContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id // informa qual o id do item que está sendo editado
      }
    }
  }

  onFormChange(controlName, control) {
    this.props.formPaymentMethodStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      formPaymentMethodStore: store,
      footerContainerClass,
      withButtons
    } = this.props

    const {
      getFormControls,
      getFormStatus,
      changed
    } = store

    const {
      code,
      title,
      description
    } = getFormControls

    const { mode } = this.state

    const disabled = getFormStatus.loading

    return (
      <div>
        <Form
          mode={ mode }
          store={ store }
          onSuccess={ () => onSuccess(dialogId) }
          controls={ { ...getFormControls } }
          item={ item }
        >
          <TextInput
            autoFocus
            name="code"
            label="Código"
            helperText="Informe um código para o método de pagamento"
            value={ code.value.toString() }
            isValid={ code.isValid }
            showError={ code.showError }
            rules={ code.rules }
            errorText={ code.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
          />
          <TextInput
            name="title"
            label="Título"
            helperText="Informe um título para o método de pagamento"
            value={ title.value }
            isValid={ title.isValid }
            showError={ title.showError }
            rules={ title.rules }
            errorText={ title.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
          />
          <TextArea
            name="description"
            label="Descrição"
            helperText="Informe uma descrição para o método de pagamento"
            value={ description.value }
            isValid={ description.isValid }
            showError={ description.showError }
            errorText={ description.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
          />

          {
            withButtons
              ? (
                <div className={ [classes.footerContainer, footerContainerClass].join(' ') }>
                  <SaveIconButton
                    type="submit"
                    asCreate
                    disabled={ disabled || !changed }
                  >
                    {
                      mode.update
                        ? 'Salvar'
                        : 'Adicionar'
                    }
                  </SaveIconButton>
                </div>
              )
              : null
          }
        </Form>
      </div>
    )
  }
}

FormContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formPaymentMethodStore: MobxPropTypes.objectOrObservableObject
}

FormContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ formPaymentMethodStore })
)(FormContainer)
