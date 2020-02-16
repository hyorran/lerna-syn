import React from 'react'
import FileTransmitIcon from '@syntesis/c-icons/src/FileTransmitIcon'
import IconButton from '../IconButton'

const FileTransmissionIconButton = props => (
  <IconButton
    tooltip="Transmitir arquivo"
    asCreate
    { ...props }
  >
    <FileTransmitIcon />
  </IconButton>
)
export default FileTransmissionIconButton
export { FileTransmissionIconButton as ComponentWithProps }
