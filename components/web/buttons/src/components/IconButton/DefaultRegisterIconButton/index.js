import React from 'react'
import DefaultRegisterIcon from '@syntesis/c-icons/src/DefaultRegisterIcon'
import IconButton from '../IconButton'

const DefaultRegisterIconButton = props => (
  <IconButton
    tooltip="Registro padrão do sistema"
    color="secondary"
    { ...props }
  >
    <DefaultRegisterIcon />
  </IconButton>
)

export default DefaultRegisterIconButton
export { DefaultRegisterIconButton as ComponentWithProps }
