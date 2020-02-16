import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import Indicator from '../Indicator'

import styles from './styles'

/**
 * @return {null}
 */
function IndicatorChildren(props) {
  const {
    checked,
    onClick,
    indicatorProps,
    timeout
  } = props

  if (!checked) {
    return null
  }

  return (
    <Grow
      in={ checked }
      timeout={ timeout }
    >
      <div
        onClick={ onClick }
        role="presentation"
        onKeyPress={ onClick }
      >
        <Indicator
          inGroup
          manualRefresh={ false }
          { ...indicatorProps }
        />
      </div>
    </Grow>
  )
}

IndicatorChildren.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  indicatorProps: PropTypes.object,
  timeout: PropTypes.number
}

IndicatorChildren.defaultProps = {
  checked: false,
  onClick: () => {},
  indicatorProps: {},
  timeout: 0
}

export default withStyles(styles)(IndicatorChildren)
