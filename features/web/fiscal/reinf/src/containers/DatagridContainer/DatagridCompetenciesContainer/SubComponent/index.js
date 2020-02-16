import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DatagridCompetenceLayoutsContainer from '../DatagridCompetenceLayoutsContainer'

import styles from './styles'

class SubComponent extends Component {
  render() {
    return <DatagridCompetenceLayoutsContainer { ...this.props } />
  }
}

SubComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
}

export default withStyles(styles)(SubComponent)
