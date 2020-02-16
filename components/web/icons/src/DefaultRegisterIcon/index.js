import React from 'react'
import PropTypes from 'prop-types'
import ShipWheel from 'mdi-material-ui/ShipWheel'
import { withStyles } from '@material-ui/core/styles'

import styles from '../styles'

const DefaultRegisterIcon = (props) => {
  const { classes } = props

  return (
    <ShipWheel className={ classes.shipWheelRotate } />
  )
}

DefaultRegisterIcon.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DefaultRegisterIcon)
