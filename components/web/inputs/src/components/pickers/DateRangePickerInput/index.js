import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment/moment'
import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import first from 'lodash/first'
import last from 'lodash/last'
import size from 'lodash/size'
import map from 'lodash/map'
import get from 'lodash/get'
import mapFP from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import CalendarMultipleIcon from '@syntesis/c-icons/src/CalendarMultipleIcon'
import CalendarPicker from '@syntesis/c-pickers/src/components/CalendarPicker'
import {
  dateFormat,
  momentFriendlyDateFormat,
  momentBackDateFormat
} from '@syntesis/c-pickers/src/utils'
import { withTextField } from '../../TextField'

import styles from './styles'

class DateRangePickerInput extends Component {
  constructor(props) {
    super(props)
    this.onDataChange = this.onDataChange.bind(this)
    this.onCloseCalendar = this.onCloseCalendar.bind(this)
  }
  onDataChange(dates) {
    const {
      onChange,
      value
    } = this.props

    if (isArray(dates) && !isEmpty(dates)) {
      dates = map(dates, date => moment(date).format(momentBackDateFormat))
    }

    onChange({
      target: {
        value: {
          ...value,
          from: {
            ...value.from,
            value: first(dates)
          },
          to: {
            ...value.to,
            value: size(dates) > 1 ? last(dates) : ''
          }
        }
      }
    })
  }

  onCloseCalendar(dates) {
    const {
      value,
      onChange
    } = this.props

    if (size(dates) < 2) {
      onChange({
        target: {
          value: {
            ...value,
            from: {
              ...value.from,
              value: ''
            },
            to: {
              ...value.to,
              value: ''
            }
          }
        }
      })
    }
  }

  render() {
    const {
      classes,
      name,
      value,
      maxDate,
      showStatic
      // inputRef,
    } = this.props

    const dates = flow(
      filter(date => !isEmpty(get(date, 'value'))),
      mapFP(date => moment(get(date, 'value'), momentBackDateFormat).format(momentFriendlyDateFormat))
    )(value)

    return (
      <CalendarPicker
        value={ dates }
        onChange={ this.onDataChange }
        options={ {
          mode: 'range',
          wrap: true,
          dateFormat,
          onClose: this.onCloseCalendar,
          static: showStatic,
          maxDate
        } }
      >
        <input
          // ref={ inputRef }
          data-input
          name={ name }
          autoComplete="off"
          className={ [classes.input, isEmpty(dates) ? classes.inputEmpty : null].join(' ') }
          onChange={ () => {} }
        />
      </CalendarPicker>
    )
  }
}

DateRangePickerInput.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  inputRef: PropTypes.func.isRequired,
  value: PropTypes.object,
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
  placeHolderInput: PropTypes.string,
  showStatic: PropTypes.bool,
  maxDate: PropTypes.string
}

DateRangePickerInput.defaultProps = {
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
  placeHolderInput: '',
  showStatic: true,
  maxDate: ''
}

export default flow(
  withStyles(styles),
  withTextField({
    type: 'tel',
    inputDefault: false,
    icon: CalendarMultipleIcon,
    iconDivisor: false,
    fixValuePropTypeWarning: true
  })
)(DateRangePickerInput)
export { DateRangePickerInput as ComponentWithProps }
