import React from 'react'
import ListIcon from '@syntesis/c-icons/src/ListIcon'
import IconButton from '../IconButton'

const ListIconButton = props => (
  <IconButton
    tooltip="Listar Títulos"
    color="secondary"
    { ...props }
  >
    <ListIcon />
  </IconButton>
)
export default ListIconButton
export { ListIconButton as ComponentWithProps }
