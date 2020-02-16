import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PaymentMethodsScreen from '@syntesis/f-payment-methods/src/screens/ScreenDefault'

class PaymentMethods extends Component {
  render() {
    return <PaymentMethodsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default PaymentMethods
