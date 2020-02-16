import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardCoBillingScreen from '@syntesis/d-co-billing'

class DashboardCoBilling extends Component {
  render() {
    return <DashboardCoBillingScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default DashboardCoBilling
