import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardMagneticFilesScreen from '@syntesis/d-magnetic-files'

class DashboardMagneticFiles extends Component {
  render() {
    return <DashboardMagneticFilesScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default DashboardMagneticFiles
