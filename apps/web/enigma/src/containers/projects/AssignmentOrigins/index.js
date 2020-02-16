import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AssignmentOriginsScreen from '@syntesis/f-assignment-origins/src/screens/ScreenDefault'

class AssignmentOrigins extends Component {
  render() {
    return <AssignmentOriginsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default AssignmentOrigins
