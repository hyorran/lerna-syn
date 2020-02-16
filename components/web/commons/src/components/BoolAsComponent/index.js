import React from 'react'
import PropTypes from 'prop-types'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import Tooltip from '@material-ui/core/Tooltip';
import ActiveIcon from '@material-ui/icons/FiberManualRecord'

import Colors from '@syntesis/c-styles/src/styles/Colors'

const BoolAsComponent = (props) => {
  let {
    value
  } = props

  if (!isBoolean(value)) {
    value = isNumber(value)
  }

  const activeStyle = {
    color: Colors.redDeleted
  }

  if (value) {
    activeStyle.color = Colors.greenCreate
  }

  return (
    <Tooltip
      title={ `${ value ? 'Sim' : 'Não' }` }
      placement="right"
    >
      <ActiveIcon
        style={ activeStyle }
      />
    </Tooltip>
  )
}

BoolAsComponent.propTypes = {
  /* - */
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ])
};

BoolAsComponent.defaultProps = {
  value: false
};

export default BoolAsComponent
export { BoolAsComponent as ComponentWithProps }
