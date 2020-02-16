import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'
import toString from 'lodash/toString'
import moment from 'moment/moment'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import { getCoBillingParameters } from '@syntesis/s-cobilling'
import Form from '@syntesis/c-inputs/src/components/Form'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import Chip from '@syntesis/c-commons/src/components/Chip'
import formEntriesIssueInvoiceStore from '../../../stores/EntriesStores/formEntriesIssueInvoiceStore'

import styles from './styles'

@inject('formEntriesIssueInvoiceStore')
@observer
class FormEntriesIssueInvoiceContainer extends Component {
  constructor(props) {
    super(props)
    this.onFormChange = this.onFormChange.bind(this)
    this.getCoBillingParametersResponse = this.getCoBillingParametersResponse.bind(this)
    this.setFormParameters = this.setFormParameters.bind(this)
    this.renderFieldAppreciationValue = this.renderFieldAppreciationValue.bind(this)
    this.renderExpirationDateLabel = this.renderExpirationDateLabel.bind(this)

    this.state = {
      mode: {
        create: true
      },
      parameters: {}
    }
  }

  componentDidMount() {
    this.initForm()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.parameters, this.state.parameters)) {
      this.setFormParameters()
    }
  }

  onFormChange(controlName, control, setAsOriginal) {
    this.props.formEntriesIssueInvoiceStore.changeFormControl(controlName, control, setAsOriginal)
  }

  setFormParameters() {
    const {
      item,
      stopModalLoading,
      formEntriesIssueInvoiceStore: {
        changeAllFormControls,
        getFormControls: {
          financialOperationId,
          financialOperation,
          serviceProductId,
          serviceProduct,
          financerNatureId,
          financerNature,
          paymentConditionId,
          paymentCondition,
          paymentConditionForwardTimes,
          financialCollectionTypeId,
          financialCollectionType,
          paymentAppreciation,
          paymentAppreciationDescription,
          paymentAppreciationValue,
          cobillingTitleExpirationDays,
          valueToInvoice,
          cobillingPlaceId,
          cobillingPlace,
          cobillingCustomerPlaceId,
          cobillingCustomerPlace,
          totalInvoiceAmount,
          sumFinCobIds
        }
      }
    } = this.props

    let { parameters } = this.state

    parameters = first(parameters)

    const occurrences = get(item, 'occurrences')

    let getValueToInvoice
    const getPaymentAppreciation = get(parameters, 'appreciation.id')
    const getAppreciationValue = (get(parameters, 'appreciation.value')).toFixed(2)
    const getCobillingTitleExpirationDays = moment().add((get(parameters, 'cobillingTitleExpirationDays')), 'days').format('L')

    switch (toString(getPaymentAppreciation)) {
      case '1':
        getValueToInvoice = getAppreciationValue * occurrences
        break
      case '2':
        getValueToInvoice = totalInvoiceAmount.value * (getAppreciationValue / 100)
        break
      default:
        getValueToInvoice = 0
        break
    }

    getValueToInvoice = getValueToInvoice.toFixed(2)

    changeAllFormControls({
      cobillingPlaceId: {
        ...cobillingPlaceId,
        value: get(item, 'cobillingPlaceId')
      },
      cobillingPlace: {
        ...cobillingPlace,
        value: get(item, 'cobillingPlace')
      },
      cobillingCustomerPlaceId: {
        ...cobillingCustomerPlaceId,
        value: get(item, 'cobillingCustomerPlaceId')
      },
      cobillingCustomerPlace: {
        ...cobillingCustomerPlace,
        value: get(item, 'cobillingCustomer')
      },
      totalInvoiceAmount: {
        ...totalInvoiceAmount,
        value: get(item, 'totalValue')
      },
      financialOperationId: {
        ...financialOperationId,
        value: get(parameters, 'financialOperation.id')
      },
      financialOperation: {
        ...financialOperation,
        value: get(parameters, 'financialOperation.description')
      },
      serviceProductId: {
        ...serviceProductId,
        value: get(parameters, 'serviceProduct.id')
      },
      serviceProduct: {
        ...serviceProduct,
        value: get(parameters, 'serviceProduct.description')
      },
      financerNatureId: {
        ...financerNatureId,
        value: get(parameters, 'financerNature.id')
      },
      financerNature: {
        ...financerNature,
        value: get(parameters, 'financerNature.description')
      },
      paymentConditionId: {
        ...paymentConditionId,
        value: get(parameters, 'paymentCondition.id')
      },
      paymentCondition: {
        ...paymentCondition,
        value: get(parameters, 'paymentCondition.description')
      },
      paymentConditionForwardTimes: {
        ...paymentConditionForwardTimes,
        value: get(parameters, 'paymentCondition.forwardTimes', '')
      },
      financialCollectionTypeId: {
        ...financialCollectionTypeId,
        value: get(parameters, 'financialCollectionType.id')
      },
      financialCollectionType: {
        ...financialCollectionType,
        value: get(parameters, 'financialCollectionType.description')
      },
      paymentAppreciation: {
        ...paymentAppreciation,
        value: getPaymentAppreciation
      },
      paymentAppreciationDescription: {
        ...paymentAppreciationDescription,
        value: get(parameters, 'appreciation.description')
      },
      paymentAppreciationValue: {
        ...paymentAppreciationValue,
        value: getAppreciationValue
      },
      cobillingTitleExpirationDays: {
        ...cobillingTitleExpirationDays,
        value: getCobillingTitleExpirationDays
      },
      valueToInvoice: {
        ...valueToInvoice,
        value: getValueToInvoice
      },
      sumFinCobIds: {
        ...sumFinCobIds,
        value: get(item, 'sumFinCobIds')
      }
    }, true)

    stopModalLoading()
  }

  async getCoBillingParametersResponse() {
    const {
      item: {
        cobillingPlaceId
      }
    } = this.props

    try {
      const { response } = await getCoBillingParameters({
        companyPlaceId: cobillingPlaceId
      })
      return response
    } catch (e) {
      return {}
    }
  }

  async initForm() {
    const parameters = await Promise.all([
      this.getCoBillingParametersResponse()
    ])

    this.setState(prevState => ({
      ...prevState,
      parameters,
    }), this.setFormParameters)
  }

  renderFieldAppreciationValue() {
    const {
      formEntriesIssueInvoiceStore: {
        getFormControls: {
          paymentAppreciationValue,
          paymentAppreciation
        }
      }
    } = this.props

    switch (toString(paymentAppreciation.value)) {
      case '1':
        return (
          <Chip
            label="Valor Bruto Cobrado por Título"
            value={ formatMoney(paymentAppreciationValue.value) }
            tooltip="Valor do serviço para cada título, a ser repassado para o local de Co-Billing"
          />
        )
      case '2':
        return (
          <Chip
            label="Valor a Percentual Cobrado por Título"
            value={ `${ paymentAppreciationValue.value }%` }
            tooltip="Valor do percentual do serviço, a ser repassado para o local de Co-Billing"
          />
        )
      default:
        return null
    }
  }

  renderExpirationDateLabel() {
    const {
      formEntriesIssueInvoiceStore: {
        getFormControls: {
          cobillingTitleExpirationDays,
          paymentConditionForwardTimes
        }
      }
    } = this.props

    let label = 'Primeiro Vencimento do Título'

    if (isEmpty(paymentConditionForwardTimes.value) || toString(paymentConditionForwardTimes.value) === '1') {
      label = 'Vencimento do Título'
    }

    return (
      <Chip
        label={ label }
        value={ cobillingTitleExpirationDays.value }
        tooltip="Data de vencimento da Nota Fiscal a ser emitida"
      />
    )
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      formEntriesIssueInvoiceStore: store
    } = this.props

    const {
      mode,
    } = this.state

    const {
      getFormControls
    } = store

    const {
      financialOperation,
      serviceProduct,
      paymentCondition,
      financerNature,
      financialCollectionType,
      paymentAppreciationDescription,
      valueToInvoice
    } = getFormControls

    const {
      cobillingPlace,
      cobillingCustomer,
      totalValue
    } = item

    return (
      <Form
        mode={ mode }
        store={ store }
        onSuccess={ () => onSuccess(dialogId) }
        controls={ { ...getFormControls } }
        item={ item }
        containerClass={ classes.formContainer }
      >
        <div className={ classes.chipContainer }>
          <Chip
            label="Local"
            value={ cobillingPlace }
            tooltip="Local de Co-Billing selecionado"
          />
          <Chip
            label="Cliente"
            value={ cobillingCustomer }
            tooltip="Cliente Co-Billing selecionado"
          />
          <Chip
            label="Operação"
            value={ financialOperation.value }
            tooltip="Operação financeira parametrizada para o local"
          />
          <Chip
            label="Serviço"
            value={ serviceProduct.value }
            tooltip="Tipo de serviço parametrizado para o local"
          />
          <Chip
            label="Natureza Financeira"
            value={ financerNature.value }
            tooltip="Natureza financeira parametrizada para o local"
          />
          <Chip
            label="Valor Total dos Títulos"
            value={ formatMoney(totalValue) }
            tooltip="Valor total dos títulos para os parâmetros selcionados"
          />
          <Chip
            label="Tipo de Cobrança"
            value={ financialCollectionType.value }
            tooltip="Tipo de cobrança parametrizada para o local"
          />
          <Chip
            label="Condição de Pagamento"
            value={ paymentCondition.value }
            tooltip="Condição de pagamento parametrizado para o local"
          />
          <Chip
            label="Valorização"
            value={ paymentAppreciationDescription.value }
            tooltip="Tipo de valorização parametrizada para o local"
          />
          {
            this.renderFieldAppreciationValue()
          }
          { this.renderExpirationDateLabel() }
          <Chip
            label="Valor da Nota Fiscal"
            value={ formatMoney(valueToInvoice.value) }
            tooltip="Valor total da Nota Fiscal a ser emitida"
          />
        </div>
      </Form>
    )
  }
}

FormEntriesIssueInvoiceContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  autoFocus: PropTypes.bool,
  adjustHeight: PropTypes.func,
  startModalLoading: PropTypes.func,
  stopModalLoading: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  formEntriesIssueInvoiceStore: MobxPropTypes.objectOrObservableObject
}

FormEntriesIssueInvoiceContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {},
  autoFocus: true,
  adjustHeight: () => {},
  startModalLoading: () => {},
  stopModalLoading: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ formEntriesIssueInvoiceStore })
)(FormEntriesIssueInvoiceContainer)
