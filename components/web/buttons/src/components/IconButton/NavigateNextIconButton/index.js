import React from 'react'
import NavigateNextIcon from '@syntesis/c-icons/src/NavigateNextIcon'
import IconButton from '../IconButton'

const NavigateNextIconButton = props => (
  <IconButton
    tooltip="Arquivar"
    { ...props }
  >
    <NavigateNextIcon />
  </IconButton>
)
export default NavigateNextIconButton
