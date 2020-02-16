import React from 'react'
import CloudDownloadIcon from '@syntesis/c-icons/src/CloudDownloadIcon'
import IconButton from '../IconButton'

const CloudDownloadIconButton = props => (
  <IconButton
    tooltip="Buscar"
    { ...props }
  >
    <CloudDownloadIcon />
  </IconButton>
)
export default CloudDownloadIconButton
export { CloudDownloadIconButton as ComponentWithProps }
