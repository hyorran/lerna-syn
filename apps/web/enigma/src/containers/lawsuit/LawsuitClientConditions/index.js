import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LawsuitClientConditionsScreen from '@syntesis/f-lawsuit-client-conditions/src/screens/ScreenDefault'

class LawsuitClientConditions extends Component {
  render() {
    return <LawsuitClientConditionsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default LawsuitClientConditions
