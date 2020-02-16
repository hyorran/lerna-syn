import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DashboardExpedientNotesScreen from '@syntesis/d-expedient-notes'

class DashboardExpedientNotes extends Component {
  render() {
    return <DashboardExpedientNotesScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default DashboardExpedientNotes
