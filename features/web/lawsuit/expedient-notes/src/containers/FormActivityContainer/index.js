import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import get from 'lodash/get'
import map from 'lodash/map'
import isNumber from 'lodash/isNumber'
import isEmpty from 'lodash/isEmpty'
import toString from 'lodash/toString'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import HiddenInput from '@syntesis/c-inputs/src/components/HiddenInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import SaveIconButton from '@syntesis/c-buttons/src/components/IconButton/SaveIconButton'
import InfoIcon from '@syntesis/c-icons/src/InfoIcon'
import Typography from '@material-ui/core/Typography';
import { withStores } from '@syntesis/c-stores-provider'
import { getAssignmentOriginsForSelect } from '@syntesis/s-assignment-origins'
import { getPeopleForSelect } from '@syntesis/s-people'
// import { getTeamsForSelect } from '@syntesis/s-teams'
import {
  getPriorityForSelect,
  getNotifyForSelect,
  getNotificationTypeForSelect
} from '@syntesis/s-selects-enum'
import formExpedientNotesActivityStore from '../../stores/formExpedientNotesActivityStore'

import styles from './styles'

@inject('formExpedientNotesActivityStore')
@observer
class FormActivityContainer extends Component {
  constructor(props) {
    super(props)

    this.verifyLawsuit = this.verifyLawsuit.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
    this.getAssignmentOrigins = this.getAssignmentOrigins.bind(this)
    this.getPriority = this.getPriority.bind(this)
    this.getPeople = this.getPeople.bind(this)
    // this.getTeams = this.getTeams.bind(this)
    this.getNotify = this.getNotify.bind(this)
    this.getNotificationType = this.getNotificationType.bind(this)

    this.state = {
      mode: {
        create: true
      },
      lawsuitId: null,
      listAssignmentOrigins: [],
      loadingAssignmentOrigins: true,
      listPriority: [],
      loadingPriority: true,
      listResponsible: [],
      loadingResponsible: true,
      // listTeam: [],
      // loadingTeam: true,
      listNotify: [],
      loadingNotify: true,
      listNotificationType: [],
      loadingNotificationType: true,
      showNotificationType: true
    }
  }

  componentDidMount() {
    this.verifyLawsuit()

    const {
      item,
      formExpedientNotesActivityStore: {
        getFormControls: {
          lawsuitExpedientNotesId
        }
      }
    } = this.props

    this.onFormChange('lawsuitExpedientNotesId', {
      ...lawsuitExpedientNotesId,
      value: get(item, 'id')
    }, true)
  }

  onFormChange(controlName, control, setAsOriginal) {
    const {
      formExpedientNotesActivityStore: {
        changeControlRules,
        changeFormControl
      }
    } = this.props

    if (controlName === 'notify') {
      const { value } = control
      const flag = !isEmpty(value) && value !== '0'
      changeControlRules('notificationType', ['required'], flag)
      this.setState(prevState => ({
        ...prevState,
        showNotificationType: flag
      }))
    }

    changeFormControl(controlName, control, setAsOriginal)
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

  async getPeople() {
    try {
      const withUser = true
      const body = await getPeopleForSelect({ withUser })

      this.setState(prevState => ({
        ...prevState,
        listResponsible: map(body.response, ({ label, value }) => ({
          value: toString(value),
          label
        })),
        loadingResponsible: false
      }))
    } catch (e) {
      throw e
    }
  }

  // async getTeams() {
  //   try {
  //     const body = await getTeamsForSelect()
  //
  //     this.setState(prevState => ({
  //       ...prevState,
  //       listTeam: map(body.response, ({ label, value }) => ({
  //         value: toString(value),
  //         label
  //       })),
  //       loadingTeam: false
  //     }))
  //   } catch (e) {
  //     throw e
  //   }
  // }

  async getNotify() {
    try {
      const body = await getNotifyForSelect()

      this.setState(prevState => ({
        ...prevState,
        listNotify: map(body.response, ({ value, label }) => ({
          value: toString(value),
          label
        })),
        loadingNotify: false
      }))
    } catch (e) {
      throw e
    }
  }

  async getNotificationType() {
    try {
      const body = await getNotificationTypeForSelect()

      this.setState(prevState => ({
        ...prevState,
        listNotificationType: map(body.response, ({ value, label }) => ({
          value: toString(value),
          label
        })),
        loadingNotificationType: false
      }))
    } catch (e) {
      throw e
    }
  }

  async verifyLawsuit() {
    const lawsuitId = get(this.props.item, 'lawsuitId', null)
    if (isNumber(lawsuitId)) {
      this.setState(prevState => ({
        ...prevState,
        lawsuitId
      }))
      await this.getAssignmentOrigins()
      await this.getPriority()
      await this.getPeople()
      // await this.getTeams()
      await this.getNotify()
      await this.getNotificationType()
    }
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      formExpedientNotesActivityStore: store,
      footerContainerClass,
      withButtons
    } = this.props

    const {
      getFormControls,
      getFormStatus,
      changed
    } = store

    const {
      assignmentOrigin,
      // availabilityPeriod,
      beginningDate,
      finalDate,
      priority,
      responsibleId,
      // teamId,
      notify,
      notificationType,
      lawsuitExpedientNotesId,
      assignmentType,
      task,
      title,
      description
    } = getFormControls

    const { mode } = this.state
    const disabled = getFormStatus.loading

    return (
      <div>
        {
          isNumber(this.state.lawsuitId)
            ? (
              <Form
                mode={ mode }
                store={ store }
                onSuccess={ () => onSuccess(dialogId) }
                controls={ { ...getFormControls } }
                item={ item }
              >
                <HiddenInput
                  name="lawsuitExpedientNotesId"
                  value={ lawsuitExpedientNotesId.value }
                />
                <HiddenInput
                  name="assignmentType"
                  value={ assignmentType.value }
                />
                <HiddenInput
                  name="task"
                  value={ toString(task.value) }
                />
                <HiddenInput
                  name="title"
                  value={ title.value }
                />
                <HiddenInput
                  name="description"
                  value={ description.value }
                />
                <HiddenInput
                  name="beginningDate"
                  value={ beginningDate.value }
                />
                <AutocompleteInput
                  name="assignmentOrigin"
                  label="Tipo de atividade"
                  helperText="Selecione tipo para a atividade"
                  options={ this.state.listAssignmentOrigins }
                  value={ assignmentOrigin.value }
                  isValid={ assignmentOrigin.isValid }
                  showError={ assignmentOrigin.showError }
                  errorText={ assignmentOrigin.errorText }
                  onChange={ this.onFormChange }
                  rules={ assignmentOrigin.rules }
                  loading={ this.state.loadingAssignmentOrigins }
                  disabled={ disabled }
                />
                {/* <DateRangePickerInput
                  name="availabilityPeriod"
                  label="Período de disponibilização"
                  helperText="Informe uma data de disponibilização para a atividade"
                  value={ availabilityPeriod.value }
                  isValid={ availabilityPeriod.isValid }
                  showError={ availabilityPeriod.showError }
                  rules={ availabilityPeriod.rules }
                  errorText={ availabilityPeriod.errorText }
                  onChange={ this.onFormChange }
                  disabled={ disabled }
                /> */}
                <DatePickerInput
                  name="finalDate"
                  label="Prazo final"
                  helperText="Informe prazo final para a atividade"
                  value={ finalDate.value }
                  isValid={ finalDate.isValid }
                  showError={ finalDate.showError }
                  rules={ finalDate.rules }
                  errorText={ finalDate.errorText }
                  onChange={ this.onFormChange }
                  inputProps={ {
                    inputProps: {
                      minDate: 'today'
                    }
                  } }
                  disabled={ disabled }
                />
                <AutocompleteInput
                  name="priority"
                  label="Prioridade"
                  helperText="Selecione uma prioridade para a atividade"
                  options={ this.state.listPriority }
                  value={ priority.value }
                  isValid={ priority.isValid }
                  showError={ priority.showError }
                  errorText={ priority.errorText }
                  onChange={ this.onFormChange }
                  rules={ priority.rules }
                  loading={ this.state.loadingPriority }
                  disabled={ disabled }
                />
                <AutocompleteInput
                  name="responsibleId"
                  label="Responsável"
                  helperText="Selecione um responsável para a atividade"
                  options={ this.state.listResponsible }
                  value={ responsibleId.value }
                  isValid={ responsibleId.isValid }
                  showError={ responsibleId.showError }
                  errorText={ responsibleId.errorText }
                  onChange={ this.onFormChange }
                  rules={ responsibleId.rules }
                  loading={ this.state.loadingResponsible }
                  disabled={ disabled }
                />
                {/* <AutocompleteInput
                  name="teamId"
                  label="Equipe"
                  helperText="Selecione uma equipe para a atividade"
                  options={ this.state.listTeam }
                  value={ teamId.value }
                  isValid={ teamId.isValid }
                  showError={ teamId.showError }
                  errorText={ teamId.errorText }
                  onChange={ this.onFormChange }
                  rules={ teamId.rules }
                  loading={ this.state.loadingTeam }
                  disabled={ disabled }
                /> */}
                <AutocompleteInput
                  name="notify"
                  label="Notificar"
                  helperText="Selecione uma notificação para a atividade"
                  options={ this.state.listNotify }
                  value={ notify.value }
                  isValid={ notify.isValid }
                  showError={ notify.showError }
                  errorText={ notify.errorText }
                  onChange={ this.onFormChange }
                  rules={ notify.rules }
                  loading={ this.state.loadingNotify }
                  disabled={ disabled }
                />
                <AutocompleteInput
                  name="notificationType"
                  label="Tipo de notificação"
                  helperText="Selecione um tipo de notificação para a atividade"
                  options={ this.state.listNotificationType }
                  value={ notificationType.value }
                  isValid={ notificationType.isValid }
                  showError={ notificationType.showError }
                  errorText={ notificationType.errorText }
                  onChange={ this.onFormChange }
                  rules={ notificationType.rules }
                  loading={ this.state.loadingNotificationType }
                  visible={ this.state.showNotificationType }
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
                          Salvar
                        </SaveIconButton>
                      </div>
                    )
                    : null
                }
              </Form>
            ) : (
              <Typography
                align="center"
                variant="subtitle1"
                className={ classes.typography }
              >
                <InfoIcon className={ classes.infoIcon } />
                Nenhum processo foi vinculado a essa Nota de Expediente.
              </Typography>
            )
        }
      </div>
    )
  }
}

FormActivityContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesActivityStore: MobxPropTypes.objectOrObservableObject
}

FormActivityContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ formExpedientNotesActivityStore })
)(FormActivityContainer)
