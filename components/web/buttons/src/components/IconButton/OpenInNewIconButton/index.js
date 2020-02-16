import React from 'react'
import OpenInNewIcon from '@syntesis/c-icons/src/OpenInNewIcon'
import IconButton from '../IconButton'
import PropTypes from 'prop-types'

const ViewIconButton = ({ iconProps, ...props }) => (
  <IconButton
    tooltip="Acessar"
    { ...props }
  >
    <OpenInNewIcon { ...iconProps } />
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
