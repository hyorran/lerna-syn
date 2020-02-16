import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import DatagridInput from '@syntesis/c-inputs/src/components/DatagridInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'
import TextArea from '@syntesis/c-inputs/src/components/TextArea'
import SaveIconButton from '@syntesis/c-buttons/src/components/IconButton/SaveIconButton'
import { withStores } from '@syntesis/c-stores-provider'
import DatagridLawsuitsContainer from '@syntesis/c-datagrid/src/inputs/DatagridLawsuitsContainer'
import expedientNotesStore from '../../stores/formExpedientNotesStore'

import styles from './styles'

@inject('expedientNotesStore')
@observer
class FormContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id
      }
    }
  }

  onFormChange(controlName, control) {
    this.props.expedientNotesStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      expedientNotesStore: store,
      footerContainerClass,
      withButtons
    } = this.props

    const {
      getFormControls,
      getFormStatus,
      changed
    } = store

    const {
      rawEvent,
      lawsuitId,
      rawAvailableDate,
      rawPublicationDate,
      observation,
      privateObservation
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
            name="rawEvent"
            label="Evento"
            helperText="Informe o evento para a nota de expediente"
            value={ rawEvent.value }
            isValid={ rawEvent.isValid }
            showError={ rawEvent.showError }
            rules={ rawEvent.rules }
            errorText={ rawEvent.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
          />
          <DatagridInput
            name="lawsuitId"
            label="Processo"
            helperText="Selecione um processo para a nota de expediente"
            value={ lawsuitId.value }
            isValid={ lawsuitId.isValid }
            showError={ lawsuitId.showError }
            rules={ lawsuitId.rules }
            errorText={ lawsuitId.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
            datagridContainer={ DatagridLawsuitsContainer }
            labelKey="processNumber"
            valueKey="id"
          />
          <DatePickerInput
            name="rawAvailableDate"
            label="Data de disponibilização"
            helperText="Informe uma data de disponibilização para a nota de expediente"
            value={ rawAvailableDate.value }
            isValid={ rawAvailableDate.isValid }
            showError={ rawAvailableDate.showError }
            rules={ rawAvailableDate.rules }
            errorText={ rawAvailableDate.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
          />
          <DatePickerInput
            name="rawPublicationDate"
            label="Data de publicação"
            helperText="Informe uma data de publicação para a nota de expediente"
            value={ rawPublicationDate.value }
            isValid={ rawPublicationDate.isValid }
            showError={ rawPublicationDate.showError }
            rules={ rawPublicationDate.rules }
            errorText={ rawPublicationDate.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
          />
          <TextArea
            name="observation"
            label="Conteúdo"
            helperText="Informe o conteúdo para a nota de expediente"
            value={ observation.value }
            isValid={ observation.isValid }
            showError={ observation.showError }
            rules={ observation.rules }
            errorText={ observation.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
          />
          <TextArea
            name="privateObservation"
            label="Observações Internas"
            helperText="Informe observações internas para a nota de expediente"
            value={ privateObservation.value }
            isValid={ privateObservation.isValid }
            showError={ privateObservation.showError }
            rules={ privateObservation.rules }
            errorText={ privateObservation.errorText }
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
  expedientNotesStore: MobxPropTypes.objectOrObservableObject
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
  withStores({ expedientNotesStore })
)(FormContainer)
