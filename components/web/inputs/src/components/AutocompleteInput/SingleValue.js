import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography/Typography'

import styles from './styles'

function SingleValue(props) {
  const {
    classes,
    isDisabled,
    innerProps,
    selectProps: {
      classes: {
        singleValue
      }
    },
    children
  } = props

  return (
    <Typography
      { ...innerProps }
      className={ [
        singleValue,
        isDisabled ? classes.inputDisabled : null
      ].join(' ') }
    >
      { children }
    </Typography>
  )
}

SingleValue.propTypes = {
  classes: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
  children: PropTypes.any
}

SingleValue.defaultProps = {
  children: null,
  innerProps: {}
}

export default withStyles(styles)(SingleValue)
