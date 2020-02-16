import React from 'react'
import CheckCircleIcon from '@syntesis/c-icons/src/CheckCircleIcon'
import IconButton from '../IconButton'

const ReviewIconButton = props => (
  <IconButton
    tooltip="Revisar"
    { ...props }
  >
    <CheckCircleIcon />
  </IconButton>
)
export default ReviewIconButton
export { ReviewIconButton as ComponentWithProps }
