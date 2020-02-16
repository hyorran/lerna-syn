import React from 'react'
import CashIcon from '@syntesis/c-icons/src/CashIcon'
import IconButton from '../IconButton'

const CashReceiptIconButton = props => (
  <IconButton
    tooltip="Realizar Transferência"
    { ...props }
  >
    <CashIcon />
  </IconButton>
)
export default CashReceiptIconButton
