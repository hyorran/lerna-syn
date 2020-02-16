import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DecisionsScreen from '@syntesis/f-decisions/src/screens/ScreenDefault'

class Decisions extends Component {
  render() {
    return <DecisionsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Decisions
