import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import toArray from 'lodash/toArray'
import isEmpty from 'lodash/isEmpty'
import flow from 'lodash/fp/flow'
import CurrencyInput from '@syntesis/c-inputs/src/components/CurrencyInput'
import AutoCompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import { withStores } from '@syntesis/c-stores-provider'
import { withStyles } from '@material-ui/core/styles'
import Form from '@syntesis/c-inputs/src/components/Form'
import formReinfR2060ActivityStore from '../../../stores/formReinfR2060ActivityStore'
import DatagridR2060ActivityAdjustmentsContainer from './DatagridR2060ActivityAdjustmentsContainer'

import styles from './styles'
import map from 'lodash/map'

@inject('formReinfR2060ActivityStore')
@observer
class FormR2060ActivityContainer extends Component {
  constructor(props) {
    super(props)
    this.onAdjustmentChange = this.onAdjustmentChange.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
  }

  componentDidMount() {
    const {
      item,
      formReinfR2060ActivityStore: {
        getFormMode,
        injectExistingControls
      }
    } = this.props

    if (!isEmpty(item)) {
      injectExistingControls(item, getFormMode)
    }
  }

  componentWillUnmount() {
    const {
      formReinfR2060ActivityStore: {
        resetForm
      }
    } = this.props

    resetForm()
  }

  onFormChange(controlName, control) {
    const {
      formReinfR2060ActivityStore: {
        changeFormControl
      }
    } = this.props

    changeFormControl(controlName, control)
  }

  onAdjustmentChange(datagridData) {
    const {
      formReinfR2060ActivityStore: store
    } = this.props
    const { getFormControls } = store
    const { adjustments } = getFormControls
    this.onFormChange('adjustments', {
      ...adjustments,
      value: map(datagridData, ({ _uuid, ...item }) => ({ ...item }))
    })
  }

  render() {
    const {
      classes,
      formReinfR2060ActivityStore: store,
      item,
      economicActivities,
      economicActivitiesLoading,
      onSuccess
    } = this.props

    const { getFormStatus } = store

    const {
      getFormControls: {
        fiscalEconomicActivityId,
        grossRevenueActivity,
        excludedGrossRevenue,
        aditionalGrossRevenue,
        calcBaseCprb,
        valueCprb,
        adjustments
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
        <AutoCompleteInput
          name="fiscalEconomicActivityId"
          label="Código da Atividade"
          helperText={
            // eslint-disable-next-line max-len
            <span>A descrição dos item acima está disponível na <strong>Tabela 9</strong>&#160;
              <a
                href="http://sped.rfb.gov.br/estatico/FA/8B747B92BBA42325278124249DB3FBE82627A3/Leiautes%20da%20EFD-Reinf%20v1.4%20-%20Anexo%20I%20-%20Tabelas.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                do documento em anexo
              </a>.
            </span>
          }
          value={ fiscalEconomicActivityId.value }
          isValid={ fiscalEconomicActivityId.isValid }
          showError={ fiscalEconomicActivityId.showError }
          options={ economicActivities }
          loading={ economicActivitiesLoading }
          rules={ fiscalEconomicActivityId.rules }
          errorText={ fiscalEconomicActivityId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          // multi
        />
        <CurrencyInput
          name="grossRevenueActivity"
          label="Valor Receita Atividade"
          helperText=""
          value={ grossRevenueActivity.value }
          isValid={ grossRevenueActivity.isValid }
          showError={ grossRevenueActivity.showError }
          rules={ grossRevenueActivity.rules }
          errorText={ grossRevenueActivity.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />

        <CurrencyInput
          name="excludedGrossRevenue"
          label="Valor Total Reduções"
          helperText="Preencher com o Valor Total das Reduções da Receita Bruta previstas em lei."
          value={ excludedGrossRevenue.value }
          isValid={ excludedGrossRevenue.isValid }
          showError={ excludedGrossRevenue.showError }
          rules={ excludedGrossRevenue.rules }
          errorText={ excludedGrossRevenue.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />

        <CurrencyInput
          name="aditionalGrossRevenue"
          label="Valor Total Acréscimos"
          helperText="Preencher com o Valor Total de Acréscimos da Receita Bruta previstas em lei."
          value={ aditionalGrossRevenue.value }
          isValid={ aditionalGrossRevenue.isValid }
          showError={ aditionalGrossRevenue.showError }
          rules={ aditionalGrossRevenue.rules }
          errorText={ aditionalGrossRevenue.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />

        <CurrencyInput
          name="calcBaseCprb"
          label="Base de cálculo CPRB"
          helperText="Preencher com o valor da base de cálculo CPRB."
          value={ calcBaseCprb.value }
          isValid={ calcBaseCprb.isValid }
          showError={ calcBaseCprb.showError }
          rules={ calcBaseCprb.rules }
          errorText={ calcBaseCprb.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />

        <CurrencyInput
          name="valueCprb"
          label="Valor CPRB"
          helperText="Preencher com o Valor Contribuição Previdenciária sobre a Receita Bruta."
          value={ valueCprb.value }
          isValid={ valueCprb.isValid }
          showError={ valueCprb.showError }
          rules={ valueCprb.rules }
          errorText={ valueCprb.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />

        <DatagridR2060ActivityAdjustmentsContainer
          initialData={ toArray(adjustments.value) }
          onDataChanged={ this.onAdjustmentChange }
        />
      </Form>
    )
  }
}

FormR2060ActivityContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  economicActivities: PropTypes.arrayOf(PropTypes.object).isRequired,
  economicActivitiesLoading: PropTypes.bool.isRequired,
  item: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  formReinfR2060ActivityStore: MobxPropTypes.objectOrObservableObject
}

FormR2060ActivityContainer.defaultProps = {
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ formReinfR2060ActivityStore })
)(FormR2060ActivityContainer)
