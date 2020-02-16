import React from 'react'
import ExpandInDatagridIcon from '@syntesis/c-icons/src/ExpandInDatagridIcon'
import IconButton from '../IconButton'

const ExpandInDatagridIconButton = props => (
  <IconButton
    tooltip="Expandir linha"
    { ...props }
  >
    <ExpandInDatagridIcon />
  </IconButton>
)
export default ExpandInDatagridIconButton
export { ExpandInDatagridIconButton as ComponentWithProps }
