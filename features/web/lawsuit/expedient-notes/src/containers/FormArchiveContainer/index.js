import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import isEmpty from 'lodash/isEmpty'
import toString from 'lodash/toString'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import Switch from '@syntesis/c-inputs/src/components/Switch'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import HiddenInput from '@syntesis/c-inputs/src/components/HiddenInput'
import InfoIcon from '@syntesis/c-icons/src/InfoIcon'
import Typography from '@material-ui/core/Typography'
import CircularIndeterminate from '@syntesis/c-loaders/src/components/CircularIndeterminate'
import { withStores } from '@syntesis/c-stores-provider'
import { getLawsuitsOccurrencesForSelect } from '@syntesis/s-lawsuits-occurrences'
import { getOccurrencesForSelect } from '@syntesis/s-occurrences'
import expedientNotesArchiveStore from '../../stores/formExpedientNotesArchiveStore'

import styles from './styles'

@inject('expedientNotesArchiveStore')
@observer
class FormArchiveContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.getLawsuitsOccurrencesForSelect = this.getLawsuitsOccurrencesForSelect.bind(this)
    this.getOccurrencesForSelect = this.getOccurrencesForSelect.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id
      },
      listLawsuitsOccurrences: [],
      loadingListLawsuitsOccurrences: true,
      listOccurrences: [],
      loadingListOccurrences: true
    }
  }


  componentDidMount() {
    const { item } = this.props
    const lawsuitId = get(item, 'lawsuitId', 0)
    this.getLawsuitsOccurrencesForSelect(lawsuitId)
    this.getOccurrencesForSelect()
  }

  onFormChange(controlName, control) {
    const {
      expedientNotesArchiveStore: {
        changeControlRules,
        changeFormControl
      }
    } = this.props

    if (controlName === 'generateOccurrence') {
      const { value } = control
      changeControlRules('lawsuitOccurrenceId', ['required'], value)
      changeControlRules('occurrenceId', ['required'], value)
    }

    changeFormControl(controlName, control)
  }

  async getLawsuitsOccurrencesForSelect(lawsuitId) {
    try {
      const body = await getLawsuitsOccurrencesForSelect(lawsuitId)

      this.setState(prevState => ({
        ...prevState,
        listLawsuitsOccurrences: map(body.response, ({ label, value }) => ({
          value: toString(value),
          label
        })),
        loadingListLawsuitsOccurrences: false
      }))
    } catch (e) {
      throw e
    }
  }

  async getOccurrencesForSelect() {
    try {
      const body = await getOccurrencesForSelect()

      this.setState(prevState => ({
        ...prevState,
        listOccurrences: map(body.response, ({ label, value }) => ({
          value: toString(value),
          label
        })),
        loadingListOccurrences: false
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
      expedientNotesArchiveStore: store
    } = this.props

    const {
      getFormControls,
      getFormStatus
    } = store

    const {
      generateOccurrence,
      lawsuitOccurrenceId,
      occurrenceId,
      sendEmail
    } = getFormControls

    const {
      mode,
      listLawsuitsOccurrences,
      loadingListLawsuitsOccurrences,
      listOccurrences,
      loadingListOccurrences
    } = this.state

    const disabled = getFormStatus.loading
    const lawsuitId = get(item, 'lawsuitId', '')

    if (loadingListLawsuitsOccurrences) {
      return (
        <div className={ classes.paddingModal }>
          <CircularIndeterminate style={ { left: '45%', position: 'relative' } } />
        </div>
      )
    }

    if (!isNumber(lawsuitId) || isEmpty(listLawsuitsOccurrences)) {
      const renderForm = (
        <Form
          mode={ mode }
          store={ store }
          onSuccess={ () => onSuccess(dialogId) }
          controls={ { ...getFormControls } }
          item={ item }
        >
          <HiddenInput
            name="generateOccurrence"
            value={ toString(generateOccurrence.value) }
          />
          <HiddenInput
            name="lawsuitOccurrenceId"
            value={ lawsuitOccurrenceId.value }
          />
          <HiddenInput
            name="occurrenceId"
            value={ occurrenceId.value }
          />
          <HiddenInput
            name="sendEmail"
            value={ toString(sendEmail.value) }
          />
          <Typography
            align="center"
            variant="subtitle1"
            className={ classes.typography }
          >
            <InfoIcon className={ classes.infoIcon } />
            {
              !isNumber(lawsuitId) ? (
                'Nenhum processo foi vinculado a essa Nota de Expediente. Nenhuma ocorrência será gerada.'
              ) : (
                'Nenhuma fase foi vinculada ao Processo desta Nota de Expediente. Nenhuma ocorrência será gerada.'
              )
            }
          </Typography>
        </Form>
      )

      return (renderForm)
    }

    return (
      <div>
        <Form
          mode={ mode }
          store={ store }
          onSuccess={ () => onSuccess(dialogId) }
          controls={ { ...getFormControls } }
          item={ item }
        >
          <Switch
            name="generateOccurrence"
            label="Gerar ocorrência"
            value={ generateOccurrence.value }
            isValid
            checked={ generateOccurrence.value }
            errorText={ generateOccurrence.errorText }
            onChange={ this.onFormChange }
            rules={ generateOccurrence.rules }
            disabled={ disabled }
          />
          <AutocompleteInput
            name="lawsuitOccurrenceId"
            label="Fase"
            helperText="Selecione uma fase para a nota de expediente"
            options={ listLawsuitsOccurrences }
            value={ lawsuitOccurrenceId.value }
            isValid={ lawsuitOccurrenceId.isValid }
            showError={ lawsuitOccurrenceId.showError }
            checked={ lawsuitOccurrenceId.value }
            errorText={ lawsuitOccurrenceId.errorText }
            onChange={ this.onFormChange }
            rules={ lawsuitOccurrenceId.rules }
            loading={ loadingListLawsuitsOccurrences }
            disabled={ disabled }
          />
          <AutocompleteInput
            name="occurrenceId"
            label="Tipo de ocorrência"
            helperText="Selecione um tipo de ocorrência para a nota de expediente"
            options={ listOccurrences }
            value={ occurrenceId.value }
            isValid={ occurrenceId.isValid }
            showError={ occurrenceId.showError }
            checked={ occurrenceId.value }
            errorText={ occurrenceId.errorText }
            onChange={ this.onFormChange }
            rules={ occurrenceId.rules }
            loading={ loadingListOccurrences }
            disabled={ disabled }
          />
          <Switch
            name="sendEmail"
            label="Enviar e-mail ao cliente"
            value={ sendEmail.value }
            isValid
            checked={ sendEmail.value }
            errorText={ sendEmail.errorText }
            onChange={ this.onFormChange }
            rules={ sendEmail.rules }
            disabled={ disabled }
          />
        </Form>
      </div>
    )
  }
}

FormArchiveContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  expedientNotesArchiveStore: MobxPropTypes.objectOrObservableObject
}

FormArchiveContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ expedientNotesArchiveStore })
)(FormArchiveContainer)
