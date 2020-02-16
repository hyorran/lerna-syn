import React from 'react'
import PropTypes from 'prop-types'
import RefreshIcon from '@syntesis/c-icons/src/RefreshIcon'
import IconButton from '../IconButton'

const UpdateStatusIconButton = props => (
  <IconButton
    tooltip="Atualizar status"
    { ...props }
  >
    <RefreshIcon />
  </IconButton>
)

UpdateStatusIconButton.propTypes = {
  /** Used to customize the icon. */
  iconProps: PropTypes.object
}
UpdateStatusIconButton.defaultProps = {
  iconProps: {}
}

export default UpdateStatusIconButton
export { UpdateStatusIconButton as ComponentWithProps }
