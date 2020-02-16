import React from 'react'
import EyeIcon from '@syntesis/c-icons/src/EyeIcon'
import IconButton from '../IconButton'
import PropTypes from 'prop-types'

const ViewIconButton = ({ iconProps, ...props }) => (
  <IconButton
    tooltip="Visualizar"
    { ...props }
  >
    <EyeIcon { ...iconProps } />
  </IconButton>
)
ViewIconButton.propTypes = {
  /** Used to customize the internal icon. */
  iconProps: PropTypes.object
}

ViewIconButton.defaultProps = {
  iconProps: {}
}

export default ViewIconButton
export { ViewIconButton as ComponentWithProps }
