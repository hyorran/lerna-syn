import React from 'react'
import IconButton from '../IconButton'
import UncollapseIcon from '@syntesis/c-icons/src/UncollapseIcon'

const UncollapseIconbutton = props => (
  <IconButton
    tooltip="Minimizar"
    { ...props }
  >
    <UncollapseIcon />
  </IconButton>
)
export default UncollapseIconbutton
export { UncollapseIconbutton as ComponentWithProps }
