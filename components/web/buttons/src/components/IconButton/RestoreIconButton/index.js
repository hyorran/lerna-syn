import React from 'react'
import RestoreIcon from '@syntesis/c-icons/src/RestoreIcon'
import IconButton from '../IconButton'

const RestoreIconButton = props => (
  <IconButton
    tooltip="Restaurar"
    { ...props }
  >
    <RestoreIcon />
  </IconButton>
)
export default RestoreIconButton
export { RestoreIconButton as ComponentWithProps }
