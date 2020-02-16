import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Progress } from 'react-sweet-progress'
import Colors from '@syntesis/c-styles/src/styles/Colors'

import styles from './styles'

const ProgressAsComponent = (props) => {
  const {
    value
  } = props

  let status = ''

  if (value <= 25) {
    status = 'red'
  } else if (value > 25 && value <= 75) {
    status = 'orange'
  } else if (value > 75) {
    status = 'green'
  }

  return (
    <Progress
      percent={ value }
      theme={ {
        red: {
          color: Colors.error.main
        },
        orange: {
          color: Colors.warning.main
        },
        green: {
          color: Colors.success.main
        }
      } }
      status={ status }
    />
  )
}

ProgressAsComponent.propTypes = {
  /** -*/
  value: PropTypes.number
};

ProgressAsComponent.defaultProps = {
  value: 0
};

export default withStyles(styles)(ProgressAsComponent)
export { ProgressAsComponent as ComponentWithProps }
