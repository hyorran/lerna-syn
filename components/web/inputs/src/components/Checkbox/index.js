import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import { withStyles } from '@material-ui/core/styles'
import MuiCheckbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Divider from '@material-ui/core/Divider/Divider'
import applyRulesAndValidate from '../../rules'

import styles from './styles'

class Checkbox extends Component {
  constructor(props) {
    super(props)
    this.onInputChange = debounce(this.onInputChange.bind(this), 200, {
      'leading': true,
      'trailing': false
    })
  }

  onInputChange({ target: { value: newValue } }, newChecked) {
    // Quando for feito um selecionar todos, considerar exibir um snackbar
    // informando a quantidade de seleções,
    // pois é contraprodutivo selecionar resultados invisíveis
    const {
      name,
      onChange,
      rules,
      checked,
      indeterminateRule
    } = this.props

    if (indeterminateRule && checked === false) {
      newChecked = null
    }

    const {
      isValid,
      errorText
    } = applyRulesAndValidate(rules, newChecked)

    onChange(name, {
      checked: newChecked,
      value: newValue,
      isValid,
      showError: true,
      errorText
    })
  }

  render() {
    const {
      classes,
      checked,
      name,
      value,
      label,
      disabled,
      indeterminate,
      color,
      light,
      inline,
      visible
    } = this.props

    if (!visible) {
      return null
    }

    const control = (
      <MuiCheckbox
        name={ name }
        checked={ !!checked }
        onChange={ this.onInputChange }
        value={ value.toString() }
        color={ color }
        disabled={ disabled }
        classes={ light
          ? {
            root: classes.lightRoot,
            colorPrimary: classes.lightColorPrimary,
            checked: classes.lightChecked
          }
          : {
            root: classes.root
          }
        }
        indeterminate={ indeterminate || checked === null }
      />
    )

    if (isEmpty(label)) {
      return control
    }

    return (
      <div
        className={ [
          classes.container,
          inline ? classes.containerInlineFormControl : null
        ].join(' ') }
      >
        {
          inline
            ? <Divider />
            : null
        }
        <FormControlLabel
          disabled={ disabled }
          control={ control }
          label={ label }
          labelPlacement={ inline ? 'start' : undefined }
          classes={ {
            labelPlacementStart: classes.labelInlineContainer,
            label: inline ? classes.labelInlineLabel : undefined
          } }
        />
        {
          inline
            ? <Divider />
            : null
        }
      </div>
    )
  }
}

Checkbox.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  /** - */
  checked: PropTypes.bool,
  // eslint-disable-next-line max-len
  /** The color of the component. It supports those theme colors that make sense for this component. */
  color: PropTypes.string,
  /** - */
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool
  ]),
  /** - */
  label: PropTypes.any,
  /** - */
  helperText: PropTypes.string,
  /** Function that will be executed onChange. */
  onChange: PropTypes.func,
  /** Disable the component. */
  disabled: PropTypes.bool,
  /** - */
  required: PropTypes.bool,
  // eslint-disable-next-line max-len
  /** If true, the component appears indeterminate. This does not set the native input element to indeterminate due to inconsistent behavior across browsers. However, we set a data-indeterminate attribute on the input. */
  indeterminate: PropTypes.bool,
  /** - */
  light: PropTypes.bool,
  /** If the component need validation. */
  isValid: PropTypes.bool,
  /** - */
  showError: PropTypes.bool,
  /** If 'showError ' is true, here you can put some text. */
  errorText: PropTypes.string,
  /** Rules applied to the component. */
  rules: PropTypes.array,
  /** If 'true' the rules will be applied to indeterminate. */
  indeterminateRule: PropTypes.bool,
  /** If 'true' displays inline. */
  inline: PropTypes.bool,
  /** - */
  visible: PropTypes.bool
}

Checkbox.defaultProps = {
  checked: false,
  color: 'primary',
  value: '',
  label: '',
  helperText: '',
  onChange: () => {},
  disabled: false,
  required: false,
  indeterminate: false,
  light: false,
  isValid: true,
  showError: false,
  errorText: '',
  rules: [],
  indeterminateRule: false,
  inline: false,
  visible: true
}

export default withStyles(styles)(Checkbox)
export { Checkbox as ComponentWithProps }
