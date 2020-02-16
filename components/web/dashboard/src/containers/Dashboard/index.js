import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import supportsHistory from '@syntesis/c-functions/src/supportsHistory'
import { HashRouter as Router } from 'react-router-dom'
import DashboardContent from './DashboardContent'

import styles from './styles'

const forceRefresh = !supportsHistory()

class Dashboard extends Component {
  render() {
    return (
      <Router forceRefresh={ forceRefresh }>
        <DashboardContent { ...this.props } />
      </Router>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  items: PropTypes.array
}

Dashboard.defaultProps = {
  items: []
}

export default withStyles(styles)(Dashboard)
export { Dashboard as ComponentWithProps }
