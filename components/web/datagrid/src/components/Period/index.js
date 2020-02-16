import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import DateRangePickerInput from '@syntesis/c-inputs/src/components/pickers/DateRangePickerInput'

import styles from './styles'

class Period extends Component {
  constructor(props) {
    super(props)

    this.onChangeValue = this.onChangeValue.bind(this)
  }

  onChangeValue(_, period) {
    const { onChange } = this.props

    const from = get(period, 'value.from')
    const to = get(period, 'value.to')

    const fromValue = get(from, 'value')
    const toValue = get(to, 'value')

    const fromApiKey = get(from, 'apiKey')
    const toApiKey = get(to, 'apiKey')

    if (!isEmpty(fromValue) && !isEmpty(toValue)) {
      onChange({
        [fromApiKey]: fromValue,
        [toApiKey]: toValue
      })
    }
  }

  render() {
    const {
      classes,
      value
    } = this.props

    return (
      <DateRangePickerInput
        name="period"
        label="Período"
        value={ value }
        // margin="dense"
        onChange={ this.onChangeValue }
        containerClass={ classes.searchInputContainer }
        inputProps={ {
          inputProps: {
            showStatic: false
          }
        } }
        withoutHelperText
      />
    )
  }
}

Period.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
}

export default withStyles(styles)(Period)
