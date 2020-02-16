import React from 'react'
import PropTypes from 'prop-types'
import AutoRenewIcon from '@syntesis/c-icons/src/AutoRenewIcon'
import IconButton from '../IconButton'

const ReopenIconButton = props => (
  <IconButton
    tooltip="Reabrir competência"
    asCreate
    { ...props }
  >
    <AutoRenewIcon />
  </IconButton>
)
ReopenIconButton.propTypes = {
  /** Used to customize the icon. */
  iconProps: PropTypes.object
}
ReopenIconButton.defaultProps = {
  iconProps: {}
}

export default ReopenIconButton
export { ReopenIconButton as ComponentWithProps }
