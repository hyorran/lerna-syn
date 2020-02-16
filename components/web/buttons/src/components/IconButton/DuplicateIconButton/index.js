import React from 'react'
import DuplicateIcon from '@syntesis/c-icons/src/DuplicateIcon'
import IconButton from '../IconButton'

const DuplicateIconButton = props => (
  <IconButton
    tooltip="Duplicar"
    { ...props }
  >
    <DuplicateIcon />
  </IconButton>
)
export default DuplicateIconButton
export { DuplicateIconButton as ComponentWithProps }
