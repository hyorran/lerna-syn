import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTextField } from '../TextField'

class TextInput extends Component {
  render() {
    const {
      inputRef,
      ...props
    } = this.props

    return (
      <input
        ref={ inputRef }
        { ...props }
      />
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  inputRef: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

TextInput.defaultProps = {
  value: ''
}

export default withTextField({
  type: 'text'
})(TextInput)
export { TextInput as ComponentWithProps }
