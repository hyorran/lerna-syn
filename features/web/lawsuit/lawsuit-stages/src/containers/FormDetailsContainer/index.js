import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import HiddenInput from '@syntesis/c-inputs/src/components/HiddenInput'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import Switch from '@syntesis/c-inputs/src/components/Switch'
import { withStores } from '@syntesis/c-stores-provider'
import formLawsuitStagesStore from '../../stores/formLawsuitStagesStore'

import styles from './styles'

@inject('formLawsuitStagesStore')
@observer
class FormDetailsContainer extends Component {
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
    this.props.formLawsuitStagesStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      formLawsuitStagesStore: store,
      autoFocus
    } = this.props

    const {
      getFormControls,
      getFormStatus
    } = store

    const {
      hash,
      code,
      title,
      active
    } = getFormControls

    const { mode } = this.state
    const disabled = getFormStatus.loading
    const { synsuiteCode } = item

    return (
      <div>
        <Form
          mode={ mode }
          store={ store }
          onSuccess={ () => onSuccess(dialogId) }
          controls={ { ...getFormControls } }
          item={ item }
          containerClass={ classes.formContainer }
        >
          <HiddenInput
            name="hash"
            value={ hash.value }
          />
          <TextInput
            autoFocus={ autoFocus }
            name="code"
            label="Código"
            helperText="Informe um código para a fase processual"
            value={ code.value.toString() }
            isValid={ code.isValid }
            showError={ code.showError }
            rules={ code.rules }
            errorText={ code.errorText }
            onChange={ this.onFormChange }
            onBlur={ () => {} }
            disabled={ disabled || synsuiteCode }
          />
          <TextInput
            name="title"
            label="Título"
            helperText="Informe um título para a fase processual"
            value={ title.value }
            isValid={ title.isValid }
            showError={ title.showError }
            rules={ title.rules }
            errorText={ title.errorText }
            onChange={ this.onFormChange }
            onBlur={ () => {} }
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
        </Form>
      </div>
    )
  }
}

FormDetailsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  autoFocus: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formLawsuitStagesStore: MobxPropTypes.objectOrObservableObject
}

FormDetailsContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {},
  autoFocus: true
}

export default flow(
  withStyles(styles),
  withStores({ formLawsuitStagesStore })
)(FormDetailsContainer)
