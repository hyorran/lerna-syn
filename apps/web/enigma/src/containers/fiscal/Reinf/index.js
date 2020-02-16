import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReinfScreen from '@syntesis/f-reinf/src/screens/ScreenDefault'

class Reinf extends Component {
  render() {
    return <ReinfScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Reinf
