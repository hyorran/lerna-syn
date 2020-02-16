import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LocalsScreen from '@syntesis/f-locals/src/screens/ScreenDefault'

class Locals extends Component {
  render() {
    return <LocalsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Locals
