import React from 'react'
import HelpIcon from '@syntesis/c-icons/src/HelpIcon'
import IconButton from '../IconButton'

const HelpIconButton = props => (
  <IconButton
    tooltip="Ajuda da Rotina"
    color="secondary"
    { ...props }
  >
    <HelpIcon />
  </IconButton>
)
export default HelpIconButton
export { HelpIconButton as ComponentWithProps }
