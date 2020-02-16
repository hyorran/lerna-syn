import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import toArray from 'lodash/toArray'
import debounce from 'lodash/debounce'
import map from 'lodash/map'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { withStores } from '@syntesis/c-stores-provider'
import CurrencyInput from '@syntesis/c-inputs/src/components/CurrencyInput'
import { getR2060ToSend } from '@syntesis/s-reinf'
import Form from '@syntesis/c-inputs/src/components/Form'
import formReinfR2060Store from '../../stores/formReinfR2060Store'
import DatagridR2060ActivitiesContainer from './DatagridR2060ActivitiesContainer'

import styles from './styles'

@inject('formReinfR2060Store')
@observer
class FormR2060Container extends Component {
  constructor(props) {
    super(props)
    this.getItems = debounce(this.getItems.bind(this), 100)
    this.onFormChange = this.onFormChange.bind(this)
    this.onActivityChange = this.onActivityChange.bind(this)

    this.state = {
      competenceValue: null
    }
  }

  componentDidMount() {
    this.getItems()
  }

  componentWillUpdate() {
    this.getItems()
  }

  onFormChange(controlName, control) {
    this.props.formReinfR2060Store.changeFormControl(controlName, control)
  }

  onActivityChange(datagridData) {
    const {
      formReinfR2060Store: store
    } = this.props
    const { getFormControls } = store
    const { activities } = getFormControls
    this.onFormChange('activities', {
      ...activities,
      value: map(datagridData, ({ _uuid, ...item }) => ({ ...item }))
    })
  }

  async getItems() {
    const {
      item: {
        id
      },
      competence,
      formReinfR2060Store: {
        injectExistingControls,
        getFormMode
      },
      onStepperLoaded,
      onStepperRemoved,
      stepperIndex
    } = this.props

    const { competenceValue } = this.state

    if (competence.isValid && competenceValue !== competence.value) {
      onStepperRemoved(stepperIndex)

      const { response = {} } = await getR2060ToSend({
        companyPlaceId: id,
        competence: competence.value,
      })

      injectExistingControls(response, getFormMode)

      this.setState(prevState => ({
        ...prevState,
        competenceValue: competence.value
      }), () => onStepperLoaded(stepperIndex))
    }
  }

  render() {
    const {
      classes,
      item,
      formReinfR2060Store: store,
      adjustHeight,
      onSuccess,
      // isActiveStepper
    } = this.props

    const {
      getFormControls,
      getFormStatus
    } = store

    const {
      totalGrossRevenue,
      totalCp,
      // totalSuspCprb,
      activities
    } = getFormControls

    const disabled = getFormStatus.loading

    return (
      <Form
        mode={ { create: true } }
        store={ store }
        onSuccess={ onSuccess }
        controls={ { ...getFormControls } }
        item={ item }
        containerClass={ classes.formContainer }
      >
        <CurrencyInput
          name="totalGrossRevenue"
          label="Valor Receita Bruta Total"
          helperText="Valor da Receita Bruta Total do Estabelecimento no Período."
          value={ totalGrossRevenue.value }
          isValid={ totalGrossRevenue.isValid }
          showError={ totalGrossRevenue.showError }
          rules={ totalGrossRevenue.rules }
          errorText={ totalGrossRevenue.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />

        <CurrencyInput
          name="totalCp"
          label="Valor total da CPRB"
          helperText="Valor total da Contribuição Previdenciária sobre Receita Bruta apurada pelo Estabelecimento no período."
          value={ totalCp.value }
          isValid={ totalCp.isValid }
          showError={ totalCp.showError }
          rules={ totalCp.rules }
          errorText={ totalCp.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />

        {/* <CurrencyInput
          name="totalSuspCprb"
          label="Valor total CPRB com exigibilidade suspensa"
          helperText="Valor da Contribuição Previdenciária com exigibilidade suspensa."
          value={ totalSuspCprb.value }
          isValid={ totalSuspCprb.isValid }
          showError={ totalSuspCprb.showError }
          rules={ totalSuspCprb.rules }
          errorText={ totalSuspCprb.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        /> */}

        <DatagridR2060ActivitiesContainer
          initialData={ toArray(activities.value) }
          adjustHeight={ adjustHeight }
          onDataChanged={ this.onActivityChange }
        />
      </Form>
    )
  }
}

FormR2060Container.propTypes = {
  classes: PropTypes.object.isRequired,
  onStepperLoaded: PropTypes.func.isRequired,
  onStepperRemoved: PropTypes.func.isRequired,
  competence: PropTypes.object.isRequired,
  stepperIndex: PropTypes.number.isRequired,
  isActiveStepper: PropTypes.bool.isRequired,
  adjustHeight: PropTypes.func,
  item: PropTypes.object,
  onRefresh: PropTypes.func,
  onSuccess: PropTypes.func,
  createMode: PropTypes.bool,
  dialogId: PropTypes.string,
  getFormStatus: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  formReinfR2060Store: MobxPropTypes.objectOrObservableObject
}

FormR2060Container.defaultProps = {
  item: {},
  onRefresh: () => {},
  onSuccess: () => {},
  adjustHeight: () => {},
  createMode: false,
  dialogId: undefined,
  getFormStatus: {}
}

export default flow(
  withStores({ formReinfR2060Store }),
  withStyles(styles)
)(FormR2060Container)
