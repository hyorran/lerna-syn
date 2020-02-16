import React from 'react'
import PropTypes from 'prop-types'
import toString from 'lodash/toString'
import { makeStyles } from '@material-ui/styles'
import MuiRadio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'

const style = fontSizeLabel => makeStyles({
  label: {
    fontSize: fontSizeLabel
  }
})

const RadioButton = (props) => {
  const {
    classes,
    name,
    onChange,
    fontSize,
    fontSizeLabel,
    value,
    label,
    checked,
    visible,
    ...controlProps
  } = props

  if (!visible) {
    return null
  }

  const customStyle = style(fontSizeLabel)()

  return (
    <FormControlLabel
      name={ name }
      value={ toString(value) }
      label={ label }
      checked={ checked }
      classes={ {
        label: customStyle.label,
        ...classes
       } }
      control={
        <MuiRadio
          onChange={ onChange }
          icon={
            <RadioButtonUncheckedIcon
              // fontSize={ fontSize }
              style={ { fontSize } }
            />
          }
          checkedIcon={
            <RadioButtonCheckedIcon
              // fontSize={ fontSize }
              style={ { fontSize } }
            />
          }
          { ...controlProps }
        />
      }
      labelPlacement="end"
    />
  )
}

RadioButton.propTypes = {
  /** - */
  label: PropTypes.string.isRequired,
  /** - */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  /** - */
  checked: PropTypes.bool,
  /** - */
  name: PropTypes.string,
  /** - */
  onChange: PropTypes.func,
  /** - */
  fontSize: PropTypes.number,
  /** - */
  visible: PropTypes.bool,
  /** - */
  fontSizeLabel: PropTypes.number,
  /** Provided by material-ui. */
  classes: PropTypes.object
}

RadioButton.defaultProps = {
  name: '',
  checked: false,
  onChange: () => {},
  fontSize: 30,
  visible: true,
  fontSizeLabel: 20,
  classes: {}
}

export default RadioButton
