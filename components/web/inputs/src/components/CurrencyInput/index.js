import React, { Component } from 'react'
import PropTypes from 'prop-types'
import toString from 'lodash/toString'
import isEmpty from 'lodash/isEmpty'
import MoneyInput from 'react-currency-input'
import { withTextField } from '../TextField'

class CurrencyInput extends Component {
  render() {
    const {
      inputRef,
      precision,
      onChange,
      value,
      allowEmpty,
      ...props
    } = this.props

    const canBeEmpty = (
      allowEmpty
      && (
        isEmpty(toString(value))
        || value === 0
        || value === '0'
      )
    )

    const inputValue = canBeEmpty
      ? null
      : value

    return (
      <MoneyInput
        precision={ toString(precision) }
        value={ parseFloat(inputValue) || inputValue }
        { ...props }
        allowEmpty={ canBeEmpty }
        onChangeEvent={ (event, str, float) => onChange({ target: { value: toString(float) } }) }
        onBlur={ () => {} }
        // ref={ inputRef }
      />
    )
  }
}

CurrencyInput.propTypes = {
  /** - */
  name: PropTypes.string.isRequired,
  /** Input component's reference */
  inputRef: PropTypes.func.isRequired,
  /** Function that will be executed onChange. */
  onChange: PropTypes.func.isRequired,
  /** - */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /** - */
  prefix: PropTypes.string,
  /** - */
  suffix: PropTypes.string,
  /** - */
  decimalSeparator: PropTypes.string,
  /** - */
  thousandSeparator: PropTypes.string,
  /** Allow that input can be empty or filled with zero */
  allowEmpty: PropTypes.bool,
  /** - */
  precision: PropTypes.number
}

CurrencyInput.defaultProps = {
  value: '',
  prefix: 'R$ ',
  suffix: '',
  decimalSeparator: ',',
  thousandSeparator: '.',
  precision: 2,
  allowEmpty: false
}

export default withTextField({
  type: 'tel',
  labelProps: {
    shrink: true
  }
})(CurrencyInput)
export { CurrencyInput as ComponentWithProps }
