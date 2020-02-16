import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'
import { withStores } from '@syntesis/c-stores-provider'
import assignmentsFilterStore from '../../stores/formAssignmentsFilterStore'
import { getPeopleForSelect } from '@syntesis/s-people'
import { getAssignmentOriginsForSelect } from '@syntesis/s-assignment-origins'
import { getPriorityForSelect } from '@syntesis/s-selects-enum'

import styles from './styles'
import toString from 'lodash/toString'

@inject('assignmentsFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.getAssignmentOrigins = this.getAssignmentOrigins.bind(this)
    this.getPeople = this.getPeople.bind(this)
    this.getPriority = this.getPriority.bind(this)

    this.state = {
      listAssignmentOrigins: [],
      loadingAssignmentOrigins: true,
      listPeople: [],
      loadingPeople: true,
      listPriority: [],
      loadingPriority: false
    }
  }

  componentDidMount() {
    this.getAssignmentOrigins()
    this.getPeople()
    this.getPriority()
  }

  onFormChange(controlName, control) {
    this.props.assignmentsFilterStore.changeFormControl(controlName, control)
  }

  async getAssignmentOrigins() {
    try {
      const moduleId = 9
      const body = await getAssignmentOriginsForSelect({ moduleId })

      this.setState(prevState => ({
        ...prevState,
        listAssignmentOrigins: map(body.response, ({ value, label }) => ({
          value: toString(value),
          label
        })),
        loadingAssignmentOrigins: false
      }))
    } catch (e) {
      throw e
    }
  }

  async getPeople() {
    const withUser = true
    const body = await getPeopleForSelect({ withUser })

    this.setState(prevState => ({
      ...prevState,
      listPeople: map(body.response, ({ label, value }) => ({
        value: toString(value),
        label
      })),
      loadingPeople: false
    }))
  }

  async getPriority() {
    try {
      const body = await getPriorityForSelect()

      this.setState(prevState => ({
        ...prevState,
        listPriority: map(body.response, ({ value, label }) => ({
          value: toString(value),
          label
        })),
        loadingPriority: false
      }))
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      assignmentsFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      lawsuit_processNumber: lawsuitProcessNumber,
      assignmentOrigin,
      responsibleId,
      requestorId,
      progress,
      finalDate,
      priority
    } = getFormControls

    const {
      listAssignmentOrigins,
      loadingAssignmentOrigins,
      listPeople,
      loadingPeople,
      listPriority,
      loadingPriority
    } = this.state

    const disabled = getFormStatus.loading

    return (
      <div>
        <TextInput
          name="lawsuit_processNumber"
          label={ lawsuitProcessNumber.label }
          helperText="Informe um processo para a pesquisa"
          value={ lawsuitProcessNumber.value }
          isValid={ lawsuitProcessNumber.isValid }
          showError={ lawsuitProcessNumber.showError }
          rules={ lawsuitProcessNumber.rules }
          errorText={ lawsuitProcessNumber.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        {/* <TextInput
          name="title"
          label={ title.label }
          helperText="Digite a atividade para a pesquisa"
          value={ title.value }
          isValid={ title.isValid }
          showError={ title.showError }
          errorText={ title.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        /> */}
        <AutocompleteInput
          name="assignmentOrigin"
          label="Tipo de atividade"
          helperText="Selecione tipo para a atividade"
          options={ listAssignmentOrigins }
          value={ assignmentOrigin.value }
          isValid={ assignmentOrigin.isValid }
          showError={ assignmentOrigin.showError }
          errorText={ assignmentOrigin.errorText }
          onChange={ this.onFormChange }
          rules={ assignmentOrigin.rules }
          loading={ loadingAssignmentOrigins }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="responsibleId"
          label={ responsibleId.label }
          helperText="Selecione um responsável para a pesquisa"
          options={ listPeople }
          value={ responsibleId.value }
          isValid={ responsibleId.isValid }
          showError={ responsibleId.showError }
          rules={ responsibleId.rules }
          errorText={ responsibleId.errorText }
          onChange={ this.onFormChange }
          loading={ loadingPeople }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="requestorId"
          label={ requestorId.label }
          helperText="Selecione um solicitante para a pesquisa"
          options={ this.state.listPeople }
          value={ requestorId.value }
          isValid={ requestorId.isValid }
          showError={ requestorId.showError }
          rules={ requestorId.rules }
          errorText={ requestorId.errorText }
          onChange={ this.onFormChange }
          loading={ this.state.loadingPeople }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="progress"
          label={ progress.label }
          helperText="Informe um progresso para a pesquisa"
          options={ [{ label: '0%', value: '0' }, { label: '10%', value: '10' }, { label: '20%', value: '20' }, { label: '30%', value: '30' }, { label: '40%', value: '40' }, { label: '50%', value: '50' }, { label: '60%', value: '60' }, { label: '70%', value: '70' }, { label: '80%', value: '80' }, { label: '90%', value: '90' }, { label: '100%', value: '100' }] }
          value={ progress.value }
          isValid={ progress.isValid }
          showError={ progress.showError }
          rules={ progress.rules }
          errorText={ progress.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <DatePickerInput
          name="finalDate"
          label={ finalDate.label }
          helperText="Informe um prazo para a pesquisa"
          value={ finalDate.value }
          isValid={ finalDate.isValid }
          showError={ finalDate.showError }
          rules={ finalDate.rules }
          errorText={ finalDate.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="priority"
          label={ priority.label }
          helperText="Informe uma prioridade para a pesquisa"
          options={ listPriority }
          value={ priority.value }
          isValid={ priority.isValid }
          showError={ priority.showError }
          rules={ priority.rules }
          errorText={ priority.errorText }
          onChange={ this.onFormChange }
          loading={ loadingPriority }
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
  assignmentsFilterStore: MobxPropTypes.objectOrObservableObject
}

FormFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ assignmentsFilterStore })
)(FormFilterContainer)
