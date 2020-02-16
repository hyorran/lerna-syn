import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SentOperationsScreen from '@syntesis/f-sent-operations/src/screens/ScreenDefault'

class SentOperations extends Component {
  render() {
    return <SentOperationsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default SentOperations
