import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResourcesScreen from '@syntesis/f-resources/src/screens/ScreenDefault'

class Resources extends Component {
  render() {
    return <ResourcesScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Resources
