import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import toString from 'lodash/toString'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import formEntriesFilterStore from '../../../stores/EntriesStores/formEntriesFilterStore'
import AutoCompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import {
  getCobillingLocals,
  getCobillingCustomers
} from '@syntesis/s-cobilling'

import styles from './styles'

@inject('formEntriesFilterStore')
@observer
class FormEntriesFilterContainer extends Component {
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
    this.props.formEntriesFilterStore.changeFormControl(controlName, control)
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
      formEntriesFilterStore: store,
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
      cobillingCustomerPlaceId
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
      </div>
    )
  }
}

FormEntriesFilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  formEntriesFilterStore: MobxPropTypes.objectOrObservableObject
}

FormEntriesFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ formEntriesFilterStore })
)(FormEntriesFilterContainer)
