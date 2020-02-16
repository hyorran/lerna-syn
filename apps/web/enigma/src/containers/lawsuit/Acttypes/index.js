import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ActtypesScreen from '@syntesis/f-acttypes/src/screens/ScreenDefault'

class Acttypes extends Component {
  render() {
    return <ActtypesScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Acttypes
