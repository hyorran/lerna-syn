import React from 'react'
import FileMoveIcon from '@syntesis/c-icons/src/FileMoveIcon'
import IconButton from '../IconButton'

const FileMoveIconButton = props => (
  <IconButton
    tooltip="Gerar arquivos"
    asCreate
    { ...props }
  >
    <FileMoveIcon />
  </IconButton>
)
export default FileMoveIconButton
export { FileMoveIconButton as ComponentWithProps }
