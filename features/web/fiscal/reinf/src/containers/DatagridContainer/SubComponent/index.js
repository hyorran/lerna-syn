import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DatagridCompetenciesContainer from '../DatagridCompetenciesContainer'

import styles from './styles'

class SubComponent extends Component {
  render() {
    const {
      item
    } = this.props

    return (
      <DatagridCompetenciesContainer
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
