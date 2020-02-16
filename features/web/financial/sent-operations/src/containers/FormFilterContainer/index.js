import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import toString from 'lodash/toString'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'
import { withStores } from '@syntesis/c-stores-provider'
import sortDateRange from '@syntesis/c-functions/src/sortDateRange'
import formSentOperationsFilterStore from '../../stores/formSentOperationsFilterStore'
import {
  getStatus,
  getOperationTypes
} from '@syntesis/s-sent-operations'

import styles from './styles'

@inject('formSentOperationsFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      statusOptions: [],
      statusLoading: true,
      operationTypesOptions: [],
      operationTypesLoading: true,
      modalitysOptions: [],
      modalitysLoading: true
    }

    this.onFormChange = this.onFormChange.bind(this)
    this.getStatusOptions = this.getStatusOptions.bind(this)
    this.getOperationTypesOptions = this.getOperationTypesOptions.bind(this)
    this.getModalityOptions = this.getModalityOptions.bind(this)
  }

  componentDidMount() {
    this.getStatusOptions()
    this.getOperationTypesOptions()
    this.getModalityOptions()
  }

  onFormChange(controlName, control) {
    const {
      formSentOperationsFilterStore: {
        getFormControls: {
          initialDate,
          finalDate
        }
      }
    } = this.props

    if (controlName === 'initialDate') {
      if (!isEmpty(control.value) && !isEmpty(finalDate.value)) {
        const [from, to] = sortDateRange(control.value, finalDate.value)
        if (finalDate.value !== to) {
          control = {
            ...control,
            value: from
          }
          this.props.formSentOperationsFilterStore.changeFormControl('finalDate', {
            ...finalDate,
            value: to
          })
        }
      }
    } else if (controlName === 'finalDate') {
      if (!isEmpty(control.value) && !isEmpty(initialDate.value)) {
        const [from, to] = sortDateRange(control.value, initialDate.value)
        if (initialDate.value !== from) {
          control = {
            ...control,
            value: to
          }
          this.props.formSentOperationsFilterStore.changeFormControl('initialDate', {
            ...initialDate,
            value: from
          })
        }
      }
    }

    this.props.formSentOperationsFilterStore.changeFormControl(controlName, control)
  }

  async getStatusOptions() {
    const { response } = await getStatus()

    const statusOptions = map(response, ({ label, value }) => ({
      label,
      value: toString(value)
    }))

    this.setState(prevState => ({
      ...prevState,
      statusOptions,
      statusLoading: false
    }))
  }

  async getOperationTypesOptions() {
    const { response } = await getOperationTypes()

    const operationTypesOptions = map(response, ({ label, value }) => ({
      label,
      value: toString(value)
    }))

    this.setState(prevState => ({
      ...prevState,
      operationTypesOptions,
      operationTypesLoading: false
    }))
  }

  getModalityOptions() {
    const modalitysOptions = [
      { label: 'Crédito', value: toString(true) },
      { label: 'Débito', value: toString(false) }
    ]

    this.setState(prevState => ({
      ...prevState,
      modalitysOptions,
      modalitysLoading: false
    }))
  }

  render() {
    const {
      formSentOperationsFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      orderId,
      status,
      operationTypeId,
      isCredit,
      initialDate,
      finalDate
    } = getFormControls

    const {
      statusOptions,
      statusLoading,
      operationTypesOptions,
      operationTypesLoading,
      modalitysOptions,
      modalitysLoading
    } = this.state

    const disabled = getFormStatus.loading

    return (
      <div>
        <Grid
          container
          wrap="wrap"
          spacing={ 8 }
        >
          <Grid
            item
            xs={ 6 }
            sm={ 6 }
            md={ 6 }
            lg={ 6 }
          >
            <DatePickerInput
              name="initialDate"
              label="Data inicial"
              helperText="Informe uma data inicial"
              value={ initialDate.value }
              isValid={ initialDate.isValid }
              showError={ initialDate.showError }
              rules={ initialDate.rules }
              errorText={ initialDate.errorText }
              onChange={ this.onFormChange }
              disabled={ disabled }
            />
          </Grid>
          <Grid
            item
            xs={ 6 }
            sm={ 6 }
            md={ 6 }
            lg={ 6 }
          >
            <DatePickerInput
              name="finalDate"
              label="Data final"
              helperText="Informe uma data final"
              value={ finalDate.value }
              isValid={ finalDate.isValid }
              showError={ finalDate.showError }
              rules={ finalDate.rules }
              errorText={ finalDate.errorText }
              onChange={ this.onFormChange }
              disabled={ disabled }
            />
          </Grid>
        </Grid>
        <TextInput
          autoFocus
          name="orderId"
          label={ orderId.label }
          helperText="Informe um Identificador para a pesquisa"
          value={ orderId.value }
          isValid={ orderId.isValid }
          showError={ orderId.showError }
          rules={ orderId.rules }
          errorText={ orderId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="isCredit"
          label={ isCredit.label }
          helperText="Informe uma Modalidade para a pesquisa"
          options={ modalitysOptions }
          loading={ modalitysLoading }
          value={ isCredit.value }
          isValid={ isCredit.isValid }
          showError={ isCredit.showError }
          checked={ isCredit.value }
          rules={ isCredit.rules }
          errorText={ isCredit.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="status"
          label={ status.label }
          helperText="Informe um Status para a pesquisa"
          options={ statusOptions }
          loading={ statusLoading }
          value={ status.value }
          isValid={ status.isValid }
          showError={ status.showError }
          checked={ status.value }
          rules={ status.rules }
          errorText={ status.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="operationTypeId"
          label={ operationTypeId.label }
          helperText="Informe um Tipo de Operação para a pesquisa"
          options={ operationTypesOptions }
          loading={ operationTypesLoading }
          value={ operationTypeId.value }
          isValid={ operationTypeId.isValid }
          showError={ operationTypeId.showError }
          checked={ operationTypeId.value }
          rules={ operationTypeId.rules }
          errorText={ operationTypeId.errorText }
          onChange={ this.onFormChange }
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
  formSentOperationsFilterStore: MobxPropTypes.objectOrObservableObject
}

FormFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ formSentOperationsFilterStore })
)(FormFilterContainer)
