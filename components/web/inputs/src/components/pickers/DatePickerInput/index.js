import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment/moment'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import first from 'lodash/first'
import flow from 'lodash/fp/flow'
import MaskedInput from 'react-text-mask'
import CalendarIcon from '@syntesis/c-icons/src/CalendarIcon'
import CalendarPicker from '@syntesis/c-pickers/src/components/CalendarPicker'
import {
  dateFormat,
  dateMask,
  momentBackDateFormat,
  momentFriendlyDateFormat
} from '@syntesis/c-pickers/src/utils'
import { withTextField } from '../../TextField'

import styles from './styles'

class DatePickerInput extends Component {
  constructor(props) {
    super(props)
    this.onDataChange = this.onDataChange.bind(this)
  }

  onDataChange(date, config) {
    const {
      onChange
    } = this.props

    if (isArray(date)) {
      date = first(date)
    }

    const manual = get(config, 'manual', false)
    const test = moment(date, manual ? momentFriendlyDateFormat : undefined, true)
    if (test.isValid()) {
      date = test.format(momentBackDateFormat)
    }

    onChange({
      target: {
        value: date
      }
    })
  }

  render() {
    const {
      classes,
      name,
      value,
      maxDate,
      minDate,
      writeText,
      openCalendar,
      disabled
      // inputRef
    } = this.props

    let date = value

    if (isEmpty(value)) {
      date = null
    } else {
      // test if value is the backend format for transform to friendly format
      const test = moment(value, momentBackDateFormat, true)
      if (test.isValid()) {
        date = test.format(momentFriendlyDateFormat)
      }
    }

    return (
      <CalendarPicker
        value={ date }
        onChange={ this.onDataChange }
        options={ {
          mode: 'single',
          wrap: true,
          allowInput: writeText,
          clickOpens: openCalendar,
          dateFormat,
          maxDate,
          minDate
        } }
      >
        <MaskedInput
          // ref={ inputRef }
          data-input
          name={ name }
          mask={ dateMask }
          guide={ false }
          autoComplete="off"
          value={ date }
          className={ [
            classes.input,
            isEmpty(date) ? classes.inputEmpty : null,
            disabled ? classes.inputDisabled : null
          ].join(' ') }
          onChange={
            ({ target: { value: newValue } }) => this.onDataChange(newValue, { manual: true })
          }
        />
      </CalendarPicker>
    )
  }
}

DatePickerInput.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  inputRef: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  isValid: PropTypes.bool,
  showError: PropTypes.bool,
  onChange: PropTypes.func,
  rules: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])),
  disabled: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.bool,
  writeText: PropTypes.bool,
  openCalendar: PropTypes.bool,
  maxDate: PropTypes.string,
  minDate: PropTypes.string
}

DatePickerInput.defaultProps = {
  helperText: '',
  value: '',
  isValid: true,
  showError: false,
  errorText: '',
  onChange: () => {},
  rules: [],
  disabled: false,
  label: '',
  margin: true,
  writeText: true,
  openCalendar: true,
  maxDate: '',
  minDate: ''
}

export default flow(
  withStyles(styles),
  withTextField({
    type: 'tel',
    inputDefault: false,
    icon: CalendarIcon,
    iconDivisor: false
  })
)(DatePickerInput)
export { DatePickerInput as ComponentWithProps }
