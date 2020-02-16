import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LawsuitTypesScreen from '@syntesis/f-lawsuit-types/src/screens/ScreenDefault'

class LawsuitTypes extends Component {
  render() {
    return <LawsuitTypesScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default LawsuitTypes
