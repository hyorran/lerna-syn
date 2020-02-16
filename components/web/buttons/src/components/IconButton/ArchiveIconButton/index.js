import React from 'react'
import ArchiveIcon from '@syntesis/c-icons/src/ArchiveIcon'
import IconButton from '../IconButton'

const ArchiveIconButton = props => (
  <IconButton
    tooltip="Arquivar"
    { ...props }
  >
    <ArchiveIcon />
  </IconButton>
)
export default ArchiveIconButton
export { ArchiveIconButton as ComponentWithProps }
