import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountsScreen from '@syntesis/f-accounts/src/screens/ScreenDefault'

class Accounts extends Component {
  render() {
    return <AccountsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Accounts
