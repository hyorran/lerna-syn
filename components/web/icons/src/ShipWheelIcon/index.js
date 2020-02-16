import React from 'react'
import PropTypes from 'prop-types'
import ShipWheel from 'mdi-material-ui/ShipWheel'
import { withStyles } from '@material-ui/core/styles'

import styles from '../styles'

const ShipWheelIcon = (props) => {
  const { classes } = props

  return (
    <ShipWheel className={ classes.shipWheelRotate } color="primary" fontSize="large" />
  )
}

ShipWheelIcon.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ShipWheelIcon)
