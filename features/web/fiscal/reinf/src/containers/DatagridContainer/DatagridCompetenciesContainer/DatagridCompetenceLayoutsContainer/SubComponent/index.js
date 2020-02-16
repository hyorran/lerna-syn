import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DatagridCompetenceLayoutFilesContainer from '../DatagridCompetenceLayoutFilesContainer'

import styles from './styles'

class SubComponent extends Component {
  render() {
    const {
      item
    } = this.props

    return (
      <DatagridCompetenceLayoutFilesContainer
        item={ item }
      />
    )
  }
}

SubComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
}

export default withStyles(styles)(SubComponent)
