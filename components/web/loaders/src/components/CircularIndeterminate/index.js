import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './styles'

function CircularIndeterminate(props) {
  const {
    classes,
    size,
    marginTop,
    style,
    className
  } = props

  return (
    <CircularProgress
      size={ size }
      className={ [classes.progress, className].join(' ') }
      style={ {
        ...style,
        marginTop: marginTop || undefined
      } }
      variant="indeterminate"
    />
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number,
  marginTop: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
};

CircularIndeterminate.defaultProps = {
  size: 40,
  marginTop: 30,
  style: {},
  className: null
}

export default withStyles(styles)(CircularIndeterminate)
export { CircularIndeterminate as ComponentWithProps }
