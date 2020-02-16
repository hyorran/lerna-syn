import React from 'react'
import ExpandOutDatagridIcon from '@syntesis/c-icons/src/ExpandOutDatagridIcon'
import IconButton from '../IconButton'

const ExpandOutDatagridIconButton = props => (
  <IconButton
    tooltip="Fechar linha"
    { ...props }
  >
    <ExpandOutDatagridIcon />
  </IconButton>
)
export default ExpandOutDatagridIconButton
export { ExpandOutDatagridIconButton as ComponentWithProps }
