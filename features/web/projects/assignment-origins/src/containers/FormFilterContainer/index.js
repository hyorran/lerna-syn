import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import toString from 'lodash/toString'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'
import { withStores } from '@syntesis/c-stores-provider'
import { getModulesForSelect } from '@syntesis/s-modules'
import assignmentOriginsFilterStore from '../../stores/formAssignmentOriginsFilterStore'

import styles from './styles'

@inject('assignmentOriginsFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.getModules = this.getModules.bind(this)

    this.state = {
      listModules: [],
      loadingModules: true
    }
  }

  componentDidMount() {
    this.getModules()
  }

  onFormChange(controlName, control) {
    this.props.assignmentOriginsFilterStore.changeFormControl(controlName, control)
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
      assignmentOriginsFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      active,
      code,
      description,
      moduleId
    } = getFormControls

    const {
      listModules,
      loadingModules
    } = this.state

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
        <AutocompleteInput
          name="moduleId"
          label={ moduleId.label }
          helperText="Informe um módulo para a pesquisa"
          options={ listModules }
          value={ moduleId.value }
          isValid={ moduleId.isValid }
          showError={ moduleId.showError }
          checked={ moduleId.value }
          errorText={ moduleId.errorText }
          onChange={ this.onFormChange }
          loading={ loadingModules }
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
  assignmentOriginsFilterStore: MobxPropTypes.objectOrObservableObject
}

FormFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ assignmentOriginsFilterStore })
)(FormFilterContainer)
