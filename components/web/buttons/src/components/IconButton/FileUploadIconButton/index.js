import React from 'react'
import FileUploadIcon from '@syntesis/c-icons/src/FileUploadIcon'
import IconButton from '../IconButton'

const FileUploadIconButton = props => (
  <IconButton
    tooltip="Gerar arquivo"
    asCreate
    { ...props }
  >
    <FileUploadIcon />
  </IconButton>
)
export default FileUploadIconButton
export { FileUploadIconButton as ComponentWithProps }
