import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import parseInt from 'lodash/parseInt'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import MuiSlider from '@material-ui/lab/Slider'

import styles from './styles'
import applyRulesAndValidate from '../../rules'

class Slider extends Component {
  constructor() {
    super()
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(_, newValue) {
    const {
      name,
      onChange,
      rules
    } = this.props

    const {
      isValid
    } = applyRulesAndValidate(rules, newValue)

    onChange(name, {
      value: newValue,
      isValid
    })
  }

  render() {
    const {
      classes,
      name,
      value,
      label,
      required,
      disabled,
      color,
      min,
      max,
      step,
      visible
    } = this.props

    if (!visible) {
      return null
    }

    const newValue = parseInt(value)

    const myInputProps = { ...this.props }
    delete myInputProps.isValid

    return (
      <div className={ classes.root }>
        <Typography id="label">{ label }</Typography>
        <Tooltip
          title={ value }
          placement="right"
        >
          <MuiSlider
            name={ name }
            onChange={ this.onInputChange }
            value={ newValue }
            color={ color }
            disabled={ disabled }
            required={ required }
            aria-labelledby="label"
            classes={ {
              container: classes.slider
            } }
            min={ min }
            max={ max }
            step={ step }
          />
        </Tooltip>
      </div>
    )
  }
}

Slider.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  label: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  isValid: PropTypes.bool,
  rules: PropTypes.array,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  visible: PropTypes.bool
}

Slider.defaultProps = {
  color: 'primary',
  value: 0,
  label: '',
  onChange: () => {},
  disabled: false,
  required: true,
  isValid: true,
  rules: [],
  min: 0,
  max: 100,
  step: 1,
  visible: true
}

export default withStyles(styles)(Slider)
export { Slider as ComponentWithProps }
