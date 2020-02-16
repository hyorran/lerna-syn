import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import PageUnderConstruction from '@syntesis/c-page-under-construction'

import styles from './styles'

class Overview extends Component {
  render() {
    return (
      <PageUnderConstruction />
    )
  }
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview)
