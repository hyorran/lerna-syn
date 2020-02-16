import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@syntesis/c-icons/src/AddIcon'
import IconButton from '../IconButton'

const AddIconButton = props => (
  <IconButton
    tooltip="Criar novo registro"
    asCreate
    { ...props }
  >
    <AddIcon />
  </IconButton>
)
AddIconButton.propTypes = {
  /** Used to customize the icon. */
  iconProps: PropTypes.object
}
AddIconButton.defaultProps = {
  iconProps: {}
}

export default AddIconButton
export { AddIconButton as ComponentWithProps }
