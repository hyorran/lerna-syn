import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelfServiceTerminalScreen from '@syntesis/f-self-service-terminal/src/screens/ScreenDefault'

class SelfServiceTerminal extends Component {
  render() {
    return <SelfServiceTerminalScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default SelfServiceTerminal
