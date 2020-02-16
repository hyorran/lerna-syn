import React from 'react'
import DownloadIcon from '@syntesis/c-icons/src/DownloadIcon'
import IconButton from '../IconButton'

const DownloadIconButton = props => (
  <IconButton
    tooltip="Download"
    { ...props }
  >
    <DownloadIcon />
  </IconButton>
)
export default DownloadIconButton
export { DownloadIconButton as ComponentWithProps }
