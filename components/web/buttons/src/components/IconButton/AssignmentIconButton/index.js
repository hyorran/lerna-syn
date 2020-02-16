import React from 'react'
import AssignmentIcon from '@syntesis/c-icons/src/AssignmentIcon'
import IconButton from '../IconButton'

const AssignmentIconButton = props => (
  <IconButton
    tooltip="Gerar atividade"
    { ...props }
  >
    <AssignmentIcon />
  </IconButton>
)
export default AssignmentIconButton
export { AssignmentIconButton as ComponentWithProps }
