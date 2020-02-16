import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import toString from 'lodash/toString'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import formDocEntriesFilterStore from '../../../stores/EntriesStores/formDocEntriesFilterStore'
import AutoCompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'
import {
  getCobillingLocals,
  getCobillingCustomers
} from '@syntesis/s-cobilling'

import styles from './styles'
import isEmpty from 'lodash/isEmpty'
import sortDateRange from '@syntesis/c-functions/src/sortDateRange'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'

@inject('formDocEntriesFilterStore')
@observer
class FormDocEntriesFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cobillingPlaces: [],
      cobillingPlacesLoading: true,
      cobillingCustomers: [],
      cobillingCustomersLoading: true
    }

    this.onFormChange = this.onFormChange.bind(this)
    this.getCobillingCustomersOptions = this.getCobillingCustomersOptions.bind(this)
    this.getCobillingPlacesOptions = this.getCobillingPlacesOptions.bind(this)
  }

  componentDidMount() {
    this.getCobillingPlacesOptions()
    this.getCobillingCustomersOptions()
  }

  onFormChange(controlName, control) {
    const {
      formDocEntriesFilterStore: {
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
          this.props.formDocEntriesFilterStore.changeFormControl('finalDate', {
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
          this.props.formDocEntriesFilterStore.changeFormControl('initialDate', {
            ...initialDate,
            value: from
          })
        }
      }
    }

    this.props.formDocEntriesFilterStore.changeFormControl(controlName, control)
  }

  async getCobillingPlacesOptions() {
    const { response } = await getCobillingLocals()

    const cobillingPlaces = map(response, item => ({
      label: item.description,
      value: toString(item.id)
    }))

    this.setState(prevState => ({
      ...prevState,
      cobillingPlaces,
      cobillingPlacesLoading: false
    }))
  }

  async getCobillingCustomersOptions() {
    const { response } = await getCobillingCustomers()

    const cobillingCustomers = map(response, item => ({
      label: item.description,
      value: toString(item.id)
    }))

    this.setState(prevState => ({
      ...prevState,
      cobillingCustomers,
      cobillingCustomersLoading: false
    }))
  }

  render() {
    const {
      formDocEntriesFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      cobillingPlaces,
      cobillingPlacesLoading,
      cobillingCustomers,
      cobillingCustomersLoading
    } = this.state

    const {
      cobillingPlaceId,
      cobillingCustomerPlaceId,
      invoiceNote_documentNumber: documentNumber,
      initialDate,
      finalDate
    } = getFormControls

    const disabled = getFormStatus.loading

    return (
      <div>
        <AutoCompleteInput
          name="cobillingPlaceId"
          label={ cobillingPlaceId.label }
          helperText="Informe um local de co-billing para a pesquisa"
          value={ cobillingPlaceId.value }
          isValid={ cobillingPlaceId.isValid }
          showError={ cobillingPlaceId.showError }
          options={ cobillingPlaces }
          loading={ cobillingPlacesLoading }
          rules={ cobillingPlaceId.rules }
          errorText={ cobillingPlaceId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <AutoCompleteInput
          name="cobillingCustomerPlaceId"
          label={ cobillingCustomerPlaceId.label }
          helperText="Informe um cliente co-billing para a pesquisa"
          value={ cobillingCustomerPlaceId.value }
          isValid={ cobillingCustomerPlaceId.isValid }
          showError={ cobillingCustomerPlaceId.showError }
          options={ cobillingCustomers }
          loading={ cobillingCustomersLoading }
          rules={ cobillingCustomerPlaceId.rules }
          errorText={ cobillingCustomerPlaceId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <TextInput
          name="invoiceNote_documentNumber"
          label={ documentNumber.label }
          helperText="Informe um número de NFSe para a pesquisa"
          value={ documentNumber.value }
          isValid={ documentNumber.isValid }
          showError={ documentNumber.showError }
          rules={ documentNumber.rules }
          errorText={ documentNumber.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
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
      </div>
    )
  }
}

FormDocEntriesFilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  formDocEntriesFilterStore: MobxPropTypes.objectOrObservableObject
}

FormDocEntriesFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ formDocEntriesFilterStore })
)(FormDocEntriesFilterContainer)
