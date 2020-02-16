import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OccurrencesScreen from '@syntesis/f-occurrences/src/screens/ScreenDefault'

class Occurrences extends Component {
  render() {
    return <OccurrencesScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Occurrences
