import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import { withTextField } from '../TextField'

class TextArea extends Component {
  render() {
    const {
      inputRef,
      ...props
    } = this.props

    return (
      <Input
        ref={ inputRef }
        multiline
        { ...props }
      />
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  inputRef: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

TextArea.defaultProps = {
  value: ''
}

export default withTextField({
  type: 'text',
  rows: 4
})(TextArea)
export { TextArea as ComponentWithProps }
