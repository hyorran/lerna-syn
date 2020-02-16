import React from 'react'
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import ReportProblem from '@material-ui/icons/ReportProblem'

const PriorityAsComponent = (props) => {
  const {
    value
  } = props

  let color
  let title = 'Normal'

  switch (value) {
    case 0:
      color = 'darkgrey'
      break
    case 1:
      title = 'Média'
      color = 'orange'
      break
    case 2:
      title = 'Alta'
      color = 'red'
      break
    default:
      break
  }

  return (
    <Tooltip
      title={ title }
      placement="right"
    >
      <ReportProblem
        nativeColor={ color }
      />
    </Tooltip>
  )
}

PriorityAsComponent.propTypes = {
  /** - */
  value: PropTypes.number
};

PriorityAsComponent.defaultProps = {
  value: 0
};

export default PriorityAsComponent
export { PriorityAsComponent as ComponentWithProps }
