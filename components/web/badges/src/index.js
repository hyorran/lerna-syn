import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MuiBadge from '@material-ui/core/Badge'

import styles from './styles'

function Badge(props) {
  const {
    classes,
    children,
    content,
    color,
    invisible
  } = props

  if (invisible) return children

  return (
    <MuiBadge
      color={ color }
      badgeContent={ content }
      className={ classes.margin }
    >
      { children }
    </MuiBadge>
  )
}

Badge.propTypes = {
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** - */
  children: PropTypes.element.isRequired,
  /** Content that will be displayed inside the badge, can be a number or an string. */
  content: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  /** The color of the component. It supports those theme colors provided by material-ui. */
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'error']),
  /** If true, the badge will be invisible. */
  invisible: PropTypes.bool
}

Badge.defaultProps = {
  color: 'primary',
  invisible: false
}

export default withStyles(styles)(Badge)
export { Badge as ComponentWithProps }
