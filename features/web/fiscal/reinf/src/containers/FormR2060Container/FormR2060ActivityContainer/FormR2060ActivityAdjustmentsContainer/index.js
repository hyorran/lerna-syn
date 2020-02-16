import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import flow from 'lodash/fp/flow'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import CurrencyInput from '@syntesis/c-inputs/src/components/CurrencyInput'
import MonthYearInput from '@syntesis/c-inputs/src/components/MonthYearInput'
import AutoCompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import RadioButtonGroup from '@syntesis/c-inputs/src/components/RadioButtonsGroup'
import RadioButton from '@syntesis/c-inputs/src/components/RadioButton'
import getReinfAdjustTypes from '@syntesis/c-functions/src/getReinfAdjustTypes'
import { withStores } from '@syntesis/c-stores-provider'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'
import { withStyles } from '@material-ui/core/styles'
import formReinfR2060ActivityAdjustmentsStore from '../../../../stores/formReinfR2060ActivityAdjustmentsStore'

import styles from './styles'
import Form from '@syntesis/c-inputs/src/components/Form'
import isEmpty from 'lodash/isEmpty'

@inject('formReinfR2060ActivityAdjustmentsStore')
@observer
class FormActivitiesContainer extends Component {
  constructor(props) {
    super(props)
    this.onFormChange = this.onFormChange.bind(this)
  }

  componentDidMount() {
    const {
      item,
      formReinfR2060ActivityAdjustmentsStore: {
        injectExistingControls,
        getFormMode
      }
    } = this.props

    if (!isEmpty(item)) {
      injectExistingControls(item, getFormMode)
    }
  }

  componentWillUnmount() {
    const {
      formReinfR2060ActivityAdjustmentsStore: {
        resetForm
      }
    } = this.props

    resetForm()
  }

  onFormChange(controlName, control) {
    const {
      formReinfR2060ActivityAdjustmentsStore: {
        changeFormControl
      }
    } = this.props

    changeFormControl(controlName, control)
  }

  render() {
    const {
      item,
      onSuccess,
      classes,
      formReinfR2060ActivityAdjustmentsStore: store,
    } = this.props

    const {
      getFormStatus,
      getFormControls: {
        adjustType,
        adjustCode,
        adjust,
        adjustDescription,
        adjustDate
      }
    } = store

    const disabled = getFormStatus.loading
    const createMode = isEmpty(item)

    return (
      <Form
        mode={ { create: createMode, update: !createMode } }
        store={ store }
        onSuccess={ controls => onSuccess({ ...item, ...controls }) }
        controls={ { ...store.getFormControls } }
        item={ item }
        containerClass={ classes.formContainer }
      >
        <RadioButtonGroup
          inline
          label="Tipo de Ajuste"
          name="adjustType"
          color="primary"
          initialValue={ get(item, 'adjustType', get(adjustType, 'value')).toString() }
          onChange={
            value => this.onFormChange('adjustType', {
              ...adjustType,
              value
            })
          }
        >
          <RadioButton
            name="decrease"
            label="Redução"
            value="0"
            fontSize={ Fonts.fontSize.M }
            fontSizeLabel={ Fonts.fontSize.M }
          />

          <RadioButton
            name="increase"
            label="Acréscimo"
            value="1"
            fontSize={ Fonts.fontSize.M }
            fontSizeLabel={ Fonts.fontSize.M }
          />
        </RadioButtonGroup>

        <AutoCompleteInput
          name="adjustCode"
          label="Código Ajuste"
          helperText=""
          options={ getReinfAdjustTypes }
          value={ adjustCode.value }
          isValid={ adjustCode.isValid }
          showError={ adjustCode.showError }
          checked={ adjustCode.value }
          errorText={ adjustCode.errorText }
          onChange={ this.onFormChange }
          rules={ adjustCode.rules }
          disabled={ disabled }
        />

        <CurrencyInput
          name="adjust"
          label="Valor do ajuste"
          helperText=""
          value={ adjust.value }
          isValid={ adjust.isValid }
          showError={ adjust.showError }
          rules={ adjust.rules }
          errorText={ adjust.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />

        <TextInput
          name="adjustDescription"
          label="Descrição do ajuste"
          helperText=""
          value={ adjustDescription.value }
          isValid={ adjustDescription.isValid }
          showError={ adjustDescription.showError }
          rules={ adjustDescription.rules }
          errorText={ adjustDescription.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />

        <MonthYearInput
          name="adjustDate"
          label="Data do ajuste"
          helperText=""
          value={ adjustDate.value }
          isValid={ adjustDate.isValid }
          showError={ adjustDate.showError }
          rules={ adjustDate.rules }
          errorText={ adjustDate.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />

      </Form>
    )
  }
}

FormActivitiesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  formReinfR2060ActivityAdjustmentsStore: MobxPropTypes.objectOrObservableObject,
}

FormActivitiesContainer.defaultProps = {
  item: {},
  onSuccess: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ formReinfR2060ActivityAdjustmentsStore })
)(FormActivitiesContainer)
