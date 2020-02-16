import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CourtsScreen from '@syntesis/f-courts/src/screens/ScreenDefault'

class Courts extends Component {
  render() {
    return <CourtsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Courts
