import React from 'react'
import IconButton from '../IconButton'
import UnselectedIcon from '@syntesis/c-icons/src/UnselectedIcon'

const UnselectedIconButton = props => (
  <IconButton
    tooltip="Desmarcar"
    { ...props }
  >
    <UnselectedIcon />
  </IconButton>
)
export default UnselectedIconButton
export { UnselectedIconButton as ComponentWithProps }
