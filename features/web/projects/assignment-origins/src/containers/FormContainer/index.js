import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import toString from 'lodash/toString'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import HiddenInput from '@syntesis/c-inputs/src/components/HiddenInput'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import Switch from '@syntesis/c-inputs/src/components/Switch'
import SaveIconButton from '@syntesis/c-buttons/src/components/IconButton/SaveIconButton'
import { withStores } from '@syntesis/c-stores-provider'
import { getModulesForSelect } from '@syntesis/s-modules'
import formAssignmentOriginsStore from '../../stores/formAssignmentOriginsStore'

import styles from './styles'

@inject('formAssignmentOriginsStore')
@observer
class FormContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.getModules = this.getModules.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id, // informa qual o id do item que está sendo editado
      },
      listModules: [],
      loadingModules: true
    }
  }

  componentDidMount() {
    this.getModules()
  }

  onFormChange(controlName, control) {
    this.props.formAssignmentOriginsStore.changeFormControl(controlName, control)
  }

  async getModules() {
    try {
      const body = await getModulesForSelect()

      this.setState(prevState => ({
        ...prevState,
        listModules: map(body.response, ({ value, label }) => ({
          value: toString(value),
          label
        })),
        loadingModules: false
      }))
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      formAssignmentOriginsStore: store,
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
      description,
      moduleId,
      active
    } = getFormControls

    const {
      listModules,
      loadingModules
    } = this.state

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
        >
          <HiddenInput
            name="hash"
            value={ hash.value }
          />
          <TextInput
            autoFocus
            name="code"
            label="Código"
            helperText="Informe um código para o tipo de atividade"
            value={ code.value.toString() }
            isValid={ code.isValid }
            showError={ code.showError }
            rules={ code.rules }
            errorText={ code.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled || synsuiteCode }
          />
          <TextInput
            name="description"
            label="Descrição"
            helperText="Informe uma descrição para o tipo de atividade"
            value={ description.value }
            isValid={ description.isValid }
            showError={ description.showError }
            rules={ description.rules }
            errorText={ description.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled || synsuiteCode }
          />
          <AutocompleteInput
            name="moduleId"
            label="Módulo"
            helperText="Informe um módulo para o tipo de atividade"
            options={ listModules }
            value={ moduleId.value }
            isValid={ moduleId.isValid }
            showError={ moduleId.showError }
            checked={ moduleId.value }
            errorText={ moduleId.errorText }
            onChange={ this.onFormChange }
            rules={ moduleId.rules }
            loading={ loadingModules }
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
  formAssignmentOriginsStore: MobxPropTypes.objectOrObservableObject
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
  withStores({ formAssignmentOriginsStore })
)(FormContainer)
