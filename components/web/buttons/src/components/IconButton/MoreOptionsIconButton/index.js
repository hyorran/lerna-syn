import React from 'react'
import MoreOptionsIcon from '@syntesis/c-icons/src/MoreOptionsIcon'
import IconButton from '../IconButton'

const MoreOptionsIconButton = props => (
  <IconButton
    { ...props }
  >
    <MoreOptionsIcon />
  </IconButton>
)
export default MoreOptionsIconButton
export { MoreOptionsIconButton as ComponentWithProps }
