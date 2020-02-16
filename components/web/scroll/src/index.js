import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'


const Scroll = ({ children, ...props }) => (
  <Scrollbars
    autoHeight
    autoHide
    autoHeightMax="auto"
    { ...props }
  >
    { children }
  </Scrollbars>
)

Scroll.propTypes = {
  children: PropTypes.element
}

Scroll.defaultProps = {
  children: null
}

export default Scroll
