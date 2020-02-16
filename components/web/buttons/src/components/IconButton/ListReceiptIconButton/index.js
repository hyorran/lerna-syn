import React from 'react'
import ListReceiptIcon from '@syntesis/c-icons/src/ListReceiptIcon'
import IconButton from '../IconButton'

const ListIconButton = props => (
  <IconButton
    tooltip="Listar Recebimentos"
    color="secondary"
    { ...props }
  >
    <ListReceiptIcon />
  </IconButton>
)
export default ListIconButton
