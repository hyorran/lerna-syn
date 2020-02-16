import React from 'react'
import PropTypes from 'prop-types'
import ActiveIcon from '@syntesis/c-icons/src/ActiveIcon'
import IconButton from '../IconButton'

const ActiveIconButton = props => (
  <IconButton
    tooltip="Ativo"
    { ...props }
  >
    <ActiveIcon />
  </IconButton>
)

ActiveIconButton.propTypes = {
  /** Used to customize the icon. */
  iconProps: PropTypes.object
}
ActiveIconButton.defaultProps = {
  iconProps: {}
}

export default ActiveIconButton
export { ActiveIconButton as ComponentWithProps }
