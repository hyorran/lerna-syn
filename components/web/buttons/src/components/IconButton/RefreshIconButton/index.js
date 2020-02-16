import React from 'react'
import PropTypes from 'prop-types'
import RefreshIcon from '@syntesis/c-icons/src/RefreshIcon'
import IconButton from '../IconButton'

const RefreshIconButton = ({ iconProps, ...props }) => (
  <IconButton
    tooltip="Atualizar"
    { ...props }
  >
    <RefreshIcon { ...iconProps } />
  </IconButton>
)

RefreshIconButton.propTypes = {
  /** Used to customize the internal icon. */
  iconProps: PropTypes.object
}

RefreshIconButton.defaultProps = {
  iconProps: {}
}

export default RefreshIconButton
export { RefreshIconButton as ComponentWithProps }
