import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DistribuitionsScreen from '@syntesis/f-distribuitions/src/screens/ScreenDefault'

class Distribuitions extends Component {
  render() {
    return <DistribuitionsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Distribuitions
