import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import toArray from 'lodash/toArray'
import toString from 'lodash/toString'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import HiddenInput from '@syntesis/c-inputs/src/components/HiddenInput'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import Switch from '@syntesis/c-inputs/src/components/Switch'
import { withStores } from '@syntesis/c-stores-provider'
import { getLawsuitStagesForSelect } from '@syntesis/s-lawsuit-stages'
import formLawsuitTypesStore from '../../stores/formLawsuitTypesStore'

import styles from './styles'

@inject('formLawsuitTypesStore')
@observer
class FormDetailsContainer extends Component {
  constructor(props) {
    super(props)
    this.onFormChange = this.onFormChange.bind(this)
    this.getLawsuitStagesForSelect = this.getLawsuitStagesForSelect.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id,
      },
      listLawsuitStages: [],
      loadingLawsuitStages: true
    }
  }

  componentDidMount() {
    this.getLawsuitStagesForSelect()
  }

  onFormChange(controlName, control) {
    this.props.formLawsuitTypesStore.changeFormControl(controlName, control)
    if (controlName === 'stages') {
      const { adjustHeight } = this.props
      adjustHeight()
    }
  }

  async getLawsuitStagesForSelect() {
    try {
      const body = await getLawsuitStagesForSelect()

      this.setState(prevState => ({
        ...prevState,
        listLawsuitStages: map(body.response, ({ label, value }) => ({
          value: toString(value),
          label
        })),
        loadingLawsuitStages: false
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
      formLawsuitTypesStore: store,
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
      stages,
      active
    } = getFormControls

    const {
      mode,
      listLawsuitStages,
      loadingLawsuitStages
    } = this.state

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
            helperText="Informe um código para o tipo de processo"
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
            helperText="Informe um título para o tipo de processo"
            value={ title.value }
            isValid={ title.isValid }
            showError={ title.showError }
            rules={ title.rules }
            errorText={ title.errorText }
            onChange={ this.onFormChange }
            onBlur={ () => {} }
            disabled={ disabled || synsuiteCode }
          />
          <AutocompleteInput
            name="stages"
            label="Fases"
            helperText="Selecione as fases para o tipo de processo"
            multi
            options={ listLawsuitStages }
            value={ toArray(stages.value) }
            isValid={ stages.isValid }
            showError={ stages.showError }
            checked={ stages.value }
            errorText={ stages.errorText }
            onChange={ this.onFormChange }
            rules={ stages.rules }
            loading={ loadingLawsuitStages }
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
  adjustHeight: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  formLawsuitTypesStore: MobxPropTypes.objectOrObservableObject
}

FormDetailsContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {},
  autoFocus: true,
  adjustHeight: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ formLawsuitTypesStore })
)(FormDetailsContainer)
