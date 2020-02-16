import React from 'react'
import CopyIcon from '@syntesis/c-icons/src/CopyIcon'
import IconButton from '../IconButton'

const CopyIconButton = props => (
  <IconButton
    tooltip="Copiar"
    { ...props }
  >
    <CopyIcon />
  </IconButton>
)
export default CopyIconButton
export { CopyIconButton as ComponentWithProps }
