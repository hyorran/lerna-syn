import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import MaskedInput from 'react-text-mask'
import {
  monthYearMask,
  momentBackMonthYearFormat,
  momentFriendlyMonthYearFormat
} from '@syntesis/c-pickers/src/utils'
import moment from 'moment/moment'
import { withTextField } from '../TextField'


class MonthYearInput extends Component {
  constructor(props) {
    super(props)
    this.onDataChange = this.onDataChange.bind(this)
  }

  onDataChange(date) {
    const {
      onChange,
      minDate,
      maxDate
    } = this.props

    const test = moment(date, momentFriendlyMonthYearFormat, true)
    if (test.isValid()) {
      date = test.format(momentBackMonthYearFormat)

      if (!isEmpty(minDate)) {
        if (date < moment(minDate).format(momentBackMonthYearFormat)) {
          date = moment(minDate).format(momentBackMonthYearFormat)
        }
      }

      if (!isEmpty(maxDate)) {
        if (date > moment(maxDate).format(momentBackMonthYearFormat)) {
          date = moment(maxDate).format(momentBackMonthYearFormat)
        }
      }
    }

    onChange({
      target: {
        value: date
      }
    })
  }

  render() {
    const {
      inputRef,
      value,
      minDate,
      maxDate,
      ...inputProps
    } = this.props

    let date = value

    if (isEmpty(value)) {
      date = null
    } else {
      const test = moment(value, momentBackMonthYearFormat, true)
      if (test.isValid()) {
        date = test.format(momentFriendlyMonthYearFormat)
        console.debug(minDate, maxDate)
      }
    }

    return (
      <MaskedInput
        { ...inputProps }
        mask={ monthYearMask }
        value={ date }
        onChange={
          ({ target: { value: newValue } }) => this.onDataChange(newValue)
        }
        onBlur={ () => {} }
      />
    );
  }
}

MonthYearInput.propTypes = {
  /** - */
  name: PropTypes.string.isRequired,
  /** Input component's reference */
  inputRef: PropTypes.func.isRequired,
  /** - */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /** - */
  guide: PropTypes.bool,
  /** - */
  onChange: PropTypes.func.isRequired,
  /** - */
  minDate: PropTypes.string,
  /** - */
  maxDate: PropTypes.string
}

MonthYearInput.defaultProps = {
  value: '',
  guide: false,
  minDate: '',
  maxDate: ''
}

export default withTextField({
  type: 'tel',
  inputDefault: false
})(MonthYearInput)
export { MonthYearInput as ComponentWithProps }
