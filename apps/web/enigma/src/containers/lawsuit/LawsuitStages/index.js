import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LawsuitStagesScreen from '@syntesis/f-lawsuit-stages/src/screens/ScreenDefault'

class LawsuitStages extends Component {
  render() {
    return <LawsuitStagesScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default LawsuitStages
