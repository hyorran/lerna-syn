import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AreasScreen from '@syntesis/f-areas/src/screens/ScreenDefault'

class Areas extends Component {
  render() {
    return <AreasScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Areas
