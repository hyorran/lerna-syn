import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import HiddenInput from '@syntesis/c-inputs/src/components/HiddenInput'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import AutoCompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import Switch from '@syntesis/c-inputs/src/components/Switch'
import SaveIconButton from '@syntesis/c-buttons/src/components/IconButton/SaveIconButton'
import { withStores } from '@syntesis/c-stores-provider'
import formLocalsStore from '../../stores/formLocalsStore'
import getBrazilStates from '@syntesis/c-functions/src/getBrazilStates'

import styles from './styles'

@inject('formLocalsStore')
@observer
class FormContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id, // informa qual o id do item que está sendo editado
      }
    }
  }

  onFormChange(controlName, control) {
    this.props.formLocalsStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      formLocalsStore: store,
      footerContainerClass,
      withButtons
    } = this.props

    const {
      getFormControls,
      getFormStatus,
      changed
    } = store

    const {
      hash,
      code,
      city,
      state,
      active
    } = getFormControls

    const { mode } = this.state

    const disabled = getFormStatus.loading
    const { synsuiteCode } = item

    const states = getBrazilStates

    return (
      <div>
        <Form
          mode={ mode }
          store={ store }
          onSuccess={ () => onSuccess(dialogId) }
          controls={ { ...getFormControls } }
          item={ item }
        >
          <HiddenInput
            name="hash"
            value={ hash.value }
          />
          <TextInput
            autoFocus
            name="code"
            label="Código"
            helperText="Informe um código para o local"
            value={ code.value }
            isValid={ code.isValid }
            showError={ code.showError }
            rules={ code.rules }
            errorText={ code.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled || synsuiteCode }
          />
          <TextInput
            name="city"
            label="Cidade"
            helperText="Informe uma cidade para o local"
            value={ city.value }
            isValid={ city.isValid }
            showError={ city.showError }
            rules={ city.rules }
            errorText={ city.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled || synsuiteCode }
          />
          <AutoCompleteInput
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
            disabled={ disabled || synsuiteCode }
          />
          <Switch
            name="active"
            label="Ativo"
            value={ mode.create ? true : active.value }
            isValid
            checked={ mode.create ? true : active.value }
            errorText={ active.errorText }
            onChange={ this.onFormChange }
            rules={ active.rules }
            disabled={ mode.create || disabled }
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
  formLocalsStore: MobxPropTypes.objectOrObservableObject
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
  withStores({ formLocalsStore })
)(FormContainer)
