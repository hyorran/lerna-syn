import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import { withStyles } from '@material-ui/core/styles'
import MuiSwitch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText'
import Divider from '@material-ui/core/Divider'
import applyRulesAndValidate from '../../rules'
import HelpIconButton from '@syntesis/c-buttons/src/components/IconButton/HelpIconButton'
import { openInputHelperModal } from '@syntesis/c-modals/src/containers/InputHelper/utils'

import styles from './styles'

class Switch extends Component {
  constructor() {
    super()
    this.onInputChange = debounce(this.onInputChange.bind(this), 200, {
      'leading': true,
      'trailing': false
    })
  }

  onInputChange(_, newChecked) {
    const {
      name,
      onChange,
      rules
    } = this.props

    const {
      isValid
    } = applyRulesAndValidate(rules, newChecked)

    onChange(name, {
      checked: newChecked,
      value: newChecked,
      isValid
    })
  }

  render() {
    const {
      classes,
      checked,
      name,
      value,
      label,
      required,
      disabled: disabledProp,
      color,
      light,
      inline,
      ios,
      marginControlForm,
      visible,
      rules,
      helperText,
      helperContent,
      helperContentProps
    } = this.props

    if (!visible) {
      return null
    }

    const myInputProps = { ...this.props }
    delete myInputProps.isValid

    let switchClasses = {}
    if (light) {
      switchClasses = {
        ...switchClasses,
        root: classes.lightRoot,
        colorPrimary: classes.lightColorPrimary,
        checked: classes.lightChecked
      }
    } else {
      switchClasses = {
        ...switchClasses,
        root: classes.root
      }
    }
    if (ios) {
      switchClasses = {
        ...switchClasses,
        switchBase: classes.iOSSwitchBase,
        bar: classes.iOSBar,
        icon: classes.iOSIcon,
        iconChecked: classes.iOSIconChecked,
        checked: classes.iOSChecked,
        disabled: classes.iOSDisabled
      }
    }

    const disabled = disabledProp || rules.indexOf('disabled') > -1

    const control = (
      <MuiSwitch
        name={ name }
        checked={ checked }
        onChange={ this.onInputChange }
        value={ value }
        color={ color }
        disabled={ disabled }
        required={ required }
        classes={ switchClasses }
      />
    )

    if (isEmpty(label)) {
      return control
    }

    return (
      <div
        className={
          [classes.container, marginControlForm ? classes.containerFormControl : null].join(' ')
        }
      >
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
            ? <Divider className={ classes.dividerBottom } />
            : null
        }
        {
          !isEmpty(helperText) ?
            <FormHelperText
              className={ classes.helperText }
            >
              {
                helperContent() ? (
                  <HelpIconButton
                    size="mini"
                    marginHorizontal={ false }
                    onClick={
                      () => {
                        openInputHelperModal({
                          name: 'Ajuda',
                          helperContent,
                          helperContentProps
                        })
                      }
                    }
                  />
                ) : null
              }
              { helperText }
            </FormHelperText>
            : null
        }
      </div>
    )
  }
}

Switch.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  color: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  label: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  light: PropTypes.bool,
  inline: PropTypes.bool,
  marginControlForm: PropTypes.bool,
  ios: PropTypes.bool,
  isValid: PropTypes.bool,
  rules: PropTypes.array,
  visible: PropTypes.bool,
  helperText: PropTypes.string,
  helperContent: PropTypes.func,
  dialogId: PropTypes.string,
  helperContentProps: PropTypes.object
}

Switch.defaultProps = {
  checked: false,
  color: 'primary',
  value: false,
  label: '',
  onChange: () => {},
  disabled: false,
  required: true,
  light: false,
  inline: true,
  marginControlForm: true,
  ios: true,
  isValid: true,
  rules: [],
  visible: true,
  helperText: null,
  helperContent: () => null,
  dialogId: '',
  helperContentProps: {}
}

export default withStyles(styles)(Switch)
export { Switch as ComponentWithProps }
