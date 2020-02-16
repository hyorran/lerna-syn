import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FinancialInstitutionsScreen from '@syntesis/f-financial-institutions/src/screens/ScreenDefault'

class FinancialInstitutions extends Component {
  render() {
    return <FinancialInstitutionsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default FinancialInstitutions
