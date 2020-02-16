import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AssignmentsScreen from '@syntesis/f-assignments/src/screens/ScreenDefault'

class Assignments extends Component {
  render() {
    return <AssignmentsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Assignments
