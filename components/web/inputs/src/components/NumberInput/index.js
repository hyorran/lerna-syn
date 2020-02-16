import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fill from 'lodash/fill'
import MaskedInput from 'react-text-mask'
import { withTextField } from '../TextField'

class NumberInput extends Component {
  render() {
    const {
      inputRef,
      maxLength,
      ...props
    } = this.props

    const mask = fill(Array(maxLength), /\d/)

    return (
      <MaskedInput
        mask={ mask }
        { ...props }
        // ref={ inputRef }
      />
    );
  }
}

NumberInput.propTypes = {
  /** - */
  name: PropTypes.string.isRequired,
  /** Input component's reference */
  inputRef: PropTypes.func.isRequired,
  /** - */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /** Max number of digits. */
  maxLength: PropTypes.number,
  /** - */
  guide: PropTypes.bool
}

NumberInput.defaultProps = {
  value: '',
  maxLength: 10,
  guide: false
}

export default withTextField({
  type: 'tel'
})(NumberInput)
export { NumberInput as ComponentWithProps }
