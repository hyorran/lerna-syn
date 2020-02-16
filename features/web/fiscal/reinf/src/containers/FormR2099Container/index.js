import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import formReinfR2099Store from '../../stores/formReinfR2099Store'
import Form from '@syntesis/c-inputs/src/components/Form'
import Switch from '@syntesis/c-inputs/src/components/Switch'
import stringIsTrue from '@syntesis/c-functions/src/stringIsTrue'
import flow from 'lodash/fp/flow'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { getR2099ToSend, verifyR2099ToSend } from '@syntesis/s-reinf'

import styles from './styles'

@inject('formReinfR2099Store')
@observer
class FormR2099Container extends Component {
  constructor(props) {
    super(props)
    this.getItems = debounce(this.getItems.bind(this), 100)
    this.onFormChange = this.onFormChange.bind(this)
    this.verifyDataForR2099 = debounce(this.verifyDataForR2099.bind(this), 100)

    this.state = {
      competenceValue: null
    }
  }

  componentDidMount() {
    this.getItems()
  }

  componentWillReceiveProps() {
    this.verifyDataForR2099()
  }

  componentWillUpdate() {
    this.getItems()
  }

  onFormChange(controlName, control) {
    this.props.formReinfR2099Store.changeFormControl(controlName, control)
  }

  async getItems() {
    const {
      item: {
        id
      },
      competence,
      formReinfR2099Store: {
        getFormMode,
        injectExistingControls
      },
      onStepperLoaded,
      onStepperRemoved,
      stepperIndex
    } = this.props

    const { competenceValue } = this.state

    if (competence.isValid && competenceValue !== competence.value) {
      onStepperRemoved(stepperIndex)

      this.verifyDataForR2099()

      const { response } = await getR2099ToSend({
        companyPlaceId: id,
        competence: competence.value,
      })

      injectExistingControls({
        ...response,
        competence: competence.value,
        // hasMiscPayments: null
      }, getFormMode)

      this.setState(prevState => ({
        ...prevState,
        competenceValue: competence.value
      }), () => onStepperLoaded(stepperIndex))
    }
  }

  async verifyDataForR2099() {
    try {
      const {
        item: { id },
        competence: {
          value
        }
      } = this.props

      const { response } = await verifyR2099ToSend({ companyPlaceId: id, competence: value })

      const {
        formReinfR2099Store: {
          changeAllFormControls,
          getFormControls: {
            boughtServices,
            soldServices,
            cprb
          }
        }
      } = this.props

      const hasR2010 = get(response, 'hasR2010')
      const hasR2020 = get(response, 'hasR2020')
      const hasR2060 = get(response, 'hasR2060')

      changeAllFormControls({
        boughtServices: {
          ...boughtServices,
          value: hasR2010
        },
        soldServices: {
          ...soldServices,
          value: hasR2020
        },
        cprb: {
          ...cprb,
          value: hasR2060
        }
      })

      // if (hasR2010) {
      //   this.onFormChange('boughtServices', {
      //     ...boughtServices,
      //     value: hasR2010
      //   })
      // }
      // if (hasR2020) {
      //   this.onFormChange('soldServices', {
      //     ...soldServices,
      //     value: hasR2020
      //   })
      // }
      // if (hasR2060) {
      //   this.onFormChange('cprb', {
      //     ...cprb,
      //     value: hasR2060
      //   })
      // }
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      classes,
      formReinfR2099Store: store,
      onSuccess,
      item
    } = this.props

    const {
      // getFormStatus,
      getFormControls
    } = store

    const {
      boughtServices,
      soldServices,
      cprb
      // hasMiscPayments
    } = getFormControls

    // const disabled = getFormStatus.loading

    return (
      <Form
        mode={ { create: true } }
        store={ store }
        onSuccess={ onSuccess }
        controls={ { ...getFormControls } }
        item={ item }
        containerClass={ classes.formContainer }
      >
        <Switch
          name="boughtServices"
          label="Contratou serviços sujeitos à retenção de contribuição previdenciária?"
          value={ boughtServices.value }
          isValid
          checked={ stringIsTrue(boughtServices.value) }
          showError={ boughtServices.showError }
          rules={ boughtServices.rules }
          errorText={ boughtServices.errorText }
          onChange={ this.onFormChange }
          disabled
        />

        <Switch
          name="soldServices"
          label="Prestou serviços sujeitos à retenção de contribuição previdenciária?"
          value={ soldServices.value }
          isValid
          checked={ stringIsTrue(soldServices.value) }
          showError={ soldServices.showError }
          rules={ soldServices.rules }
          errorText={ soldServices.errorText }
          onChange={ this.onFormChange }
          disabled
        />

        <Switch
          name="cprb"
          label="Possui informações sobre a apuração da Contribuição Previdenciária sobre a Receita Bruta?"
          value={ cprb.value }
          isValid
          checked={ stringIsTrue(cprb.value) }
          showError={ cprb.showError }
          rules={ cprb.rules }
          errorText={ cprb.errorText }
          onChange={ this.onFormChange }
          disabled
        />

        {/* <Switch
          name="hasMiscPayments"
          label="Possui informações de pagamento diversos no período de apuração?"
          value={ hasMiscPayments.value }
          isValid
          checked={ stringIsTrue(hasMiscPayments.value) }
          showError={ hasMiscPayments.showError }
          rules={ hasMiscPayments.rules }
          errorText={ hasMiscPayments.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        /> */}
      </Form>
    )
  }
}

FormR2099Container.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object,
  onStepperLoaded: PropTypes.func.isRequired,
  onStepperRemoved: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  stepperIndex: PropTypes.number.isRequired,
  competence: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  formReinfR2099Store: MobxPropTypes.objectOrObservableObject
}

FormR2099Container.defaultProps = {
  item: {},
  onSuccess: () => {},
  competence: {}
}

export default flow(
  withStyles(styles),
  withStores({ formReinfR2099Store })
)(FormR2099Container)
