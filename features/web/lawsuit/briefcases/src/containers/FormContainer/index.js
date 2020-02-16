import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import HiddenInput from '@syntesis/c-inputs/src/components/HiddenInput'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import AutoCompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput';
import Switch from '@syntesis/c-inputs/src/components/Switch'
import SaveIconButton from '@syntesis/c-buttons/src/components/IconButton/SaveIconButton'
import { withStores } from '@syntesis/c-stores-provider'
import { getBriefcasesTypeForSelect } from '@syntesis/s-selects-enum'
import formBriefcasesStore from '../../stores/formBriefcasesStore'

import styles from './styles'
import map from 'lodash/map'
import toString from 'lodash/toString'

@inject('formBriefcasesStore')
@observer
class FormContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.getBriefcasesType = this.getBriefcasesType.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id,
        listBriefcasesType: [],
        loadingBriefcasesType: true
      }
    }
  }

  componentDidMount() {
    this.getBriefcasesType()
  }

  onFormChange(controlName, control) {
    this.props.formBriefcasesStore.changeFormControl(controlName, control)
  }

  async getBriefcasesType() {
    try {
      const body = await getBriefcasesTypeForSelect()

      this.setState(prevState => ({
        ...prevState,
        listBriefcasesType: map(body.response, ({ value, label }) => ({
          value: toString(value),
          label
        })),
        loadingBriefcasesType: false
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
      formBriefcasesStore: store,
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
      name,
      type,
      active
    } = getFormControls

    const {
      listBriefcasesType,
      loadingBriefcasesType
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
            helperText="Informe um código para a pasta"
            value={ code.value.toString() }
            isValid={ code.isValid }
            showError={ code.showError }
            rules={ code.rules }
            errorText={ code.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled || synsuiteCode }
          />
          <TextInput
            name="name"
            label="Descrição"
            helperText="Informe uma descrição para a pasta"
            value={ name.value }
            isValid={ name.isValid }
            showError={ name.showError }
            rules={ name.rules }
            errorText={ name.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled || synsuiteCode }
          />
          <AutoCompleteInput
            name="type"
            label="Tipo"
            helperText="Informe um tipo para a pasta"
            options={ listBriefcasesType }
            value={ type.value }
            isValid={ type.isValid }
            showError={ type.showError }
            checked={ type.value }
            errorText={ type.errorText }
            onChange={ this.onFormChange }
            rules={ type.rules }
            loading={ loadingBriefcasesType }
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
  formBriefcasesStore: MobxPropTypes.objectOrObservableObject
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
  withStores({ formBriefcasesStore })
)(FormContainer)
