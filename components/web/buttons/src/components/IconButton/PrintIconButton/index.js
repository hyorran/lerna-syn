import React from 'react'
import PrintIcon from '@syntesis/c-icons/src/PrintIcon'
import IconButton from '../IconButton'

const PrintIconButton = props => (
  <IconButton
    tooltip="Imprimir/Exportar"
    color="secondary"
    { ...props }
  >
    <PrintIcon />
  </IconButton>
)

export default PrintIconButton
export { PrintIconButton as ComponentWithProps }
