import React from 'react'
import NavigateBeforeIcon from '@syntesis/c-icons/src/NavigateBeforeIcon'
import IconButton from '../IconButton'

const NavigateBeforeIconButton = props => (
  <IconButton
    tooltip="Arquivar"
    { ...props }
  >
    <NavigateBeforeIcon />
  </IconButton>
)
export default NavigateBeforeIconButton
