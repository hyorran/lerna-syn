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
import CalendarClockIcon from '@syntesis/c-icons/src/CalendarClockIcon'
import CalendarPicker from '@syntesis/c-pickers/src/components/CalendarPicker'
import {
  dateTimeFormat,
  momentFriendlyDateTimeFormat,
  momentBackDateTimeFormat,
  dateTimeMask
} from '@syntesis/c-pickers/src/utils'
import { withTextField } from '../../TextField'

import styles from './styles'

class DateTimePickerInput extends Component {
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
    const test = moment(date, manual ? momentFriendlyDateTimeFormat : undefined, true)
    if (test.isValid()) {
      date = test.format(momentBackDateTimeFormat)
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
      // inputRef
    } = this.props

    let date = value

    if (isEmpty(value)) {
      date = null
    } else {
      // test if value is the backend format for transform to friendly format
      const test = moment(value, momentBackDateTimeFormat, true)
      if (test.isValid()) {
        date = test.format(momentFriendlyDateTimeFormat)
      }
    }

    return (
      <CalendarPicker
        value={ date }
        onChange={ this.onDataChange }
        options={ {
          mode: 'single',
          wrap: true,
          allowInput: true,
          enableTime: true,
          time_24hr: true,
          static: true,
          dateFormat: dateTimeFormat
        } }
      >
        <MaskedInput
          // ref={ inputRef }
          data-input
          name={ name }
          mask={ dateTimeMask }
          guide={ false }
          autoComplete="off"
          value={ date }
          className={ [classes.input, isEmpty(date) ? classes.inputEmpty : null].join(' ') }
          onChange={
            ({ target: { value: newValue } }) => this.onDataChange(newValue, { manual: true })
          }
        />
      </CalendarPicker>
    )
  }
}

DateTimePickerInput.propTypes = {
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
}

DateTimePickerInput.defaultProps = {
  helperText: '',
  value: '',
  isValid: true,
  showError: false,
  errorText: '',
  onChange: () => {},
  rules: [],
  disabled: false,
  label: '',
  margin: true
}

export default flow(
  withStyles(styles),
  withTextField({
    type: 'tel',
    inputDefault: false,
    icon: CalendarClockIcon,
    iconDivisor: false
  })
)(DateTimePickerInput)
export { DateTimePickerInput as ComponentWithProps }
