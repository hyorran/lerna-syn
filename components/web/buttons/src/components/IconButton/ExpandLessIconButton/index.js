import React from 'react'
import PropTypes from 'prop-types'
import ExpandLessIcon from '@syntesis/c-icons/src/ExpandLessIcon'
import IconButton from '../IconButton'

const ExpandLessIconButton = ({ iconProps, ...props }) => (
  <IconButton
    tooltip="Recolher"
    { ...props }
  >
    <ExpandLessIcon { ...iconProps } />
  </IconButton>
)

ExpandLessIconButton.propTypes = {
  /** Used to customize the internal icon. */
  iconProps: PropTypes.object
}

ExpandLessIconButton.defaultProps = {
  iconProps: {}
}

export default ExpandLessIconButton
export { ExpandLessIconButton as ComponentWithProps }
