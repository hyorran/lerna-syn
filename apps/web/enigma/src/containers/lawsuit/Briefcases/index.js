import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BriefcasesScreen from '@syntesis/f-briefcases/src/screens/ScreenDefault'

class Briefcases extends Component {
  render() {
    return <BriefcasesScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Briefcases
