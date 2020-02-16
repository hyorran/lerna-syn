import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ActobjectsScreen from '@syntesis/f-actobjects/src/screens/ScreenDefault'

class Actobjects extends Component {
  render() {
    return <ActobjectsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Actobjects
