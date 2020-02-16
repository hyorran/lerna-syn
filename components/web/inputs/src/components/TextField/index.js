import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import indexOf from 'lodash/indexOf'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import size from 'lodash/size'
import get from 'lodash/get'
import toString from 'lodash/toString'
import filter from 'lodash/filter'
import { withStyles } from '@material-ui/core/styles'
import MuiTextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import applyRulesAndValidate from '../../rules'
import FormHelperText from '@material-ui/core/FormHelperText'
import HelpIconButton from '@syntesis/c-buttons/src/components/IconButton/HelpIconButton'
import { openInputHelperModal } from '@syntesis/c-modals/src/containers/InputHelper/utils'

import styles from './styles'

class TextField extends Component {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    if (props.debounceTime) {
      this.formStoreChange = debounce(this.formStoreChange.bind(this), props.debounceTime)
    } else {
      this.formStoreChange = this.formStoreChange.bind(this)
    }

    this.state = {
      value: props.value
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(prevProps.value, this.props.value)
      && !isEqual(prevState.value, this.props.value)
    ) {
      this.onInputChange({ target: { value: this.props.value } })
    }
  }

  onInputChange({ target: { value: newValue } }) {
    this.setState(prevState => ({
      ...prevState,
      value: newValue
    }), this.formStoreChange)
  }

  formStoreChange() {
    const {
      name,
      onChange,
      rules
    } = this.props

    const {
      value
    } = this.state

    onChange(name, {
      value,
      showError: true,
      ...applyRulesAndValidate(rules, value)
    })
  }

  render() {
    const {
      classes,
      name,
      InputComponent,
      icon,
      iconClick,
      iconDivisor,
      inputClasses,
      containerClass,
      showError,
      errorText,
      isValid,
      rules,
      helperText,
      disabled,
      withoutHelperText,
      fixValuePropTypeWarning,
      onBlur,
      customInputProps,
      labelProps,
      visible,
      inputProps,
      iconProps,
      helperContent,
      helperContentProps
    } = this.props

    const {
      value
    } = this.state

    if (!visible) {
      return null
    }

    let InputLabelProps = {
      ...labelProps
    }

    let helperTextWithMaxLength = null
    const maxLength = get(inputProps.inputProps, 'maxLength')
    if (size(value) === maxLength) {
      helperTextWithMaxLength = `${ helperText }. ( Número máximo de ${ maxLength } caracteres atingido! )`
    }

    const myInputProps = { ...this.props }
    delete myInputProps.classes
    delete myInputProps.InputComponent
    delete myInputProps.isValid
    delete myInputProps.showError
    delete myInputProps.errorText
    delete myInputProps.helperText
    delete myInputProps.containerClass
    delete myInputProps.inputClasses
    delete myInputProps.customInputProps
    delete myInputProps.withoutHelperText
    delete myInputProps.iconClick
    delete myInputProps.iconDivisor
    delete myInputProps.icon
    delete myInputProps.iconProps
    delete myInputProps.fixValuePropTypeWarning
    delete myInputProps.onBlur
    delete myInputProps.onlyCpf
    delete myInputProps.onlyCnpj
    delete myInputProps.labelProps
    delete myInputProps.visible
    delete myInputProps.inputProps
    delete myInputProps.datagridContainer
    delete myInputProps.datagridContainerProps
    delete myInputProps.valueKey
    delete myInputProps.labelKey
    delete myInputProps.labelValue
    delete myInputProps.debounceValue
    delete myInputProps.multiActiveRows
    delete myInputProps.debounceTime
    delete myInputProps.helperContent
    delete myInputProps.helperContentProps

    const readOnly = indexOf(rules, 'read-only') >= 0

    let textFieldProps = {
      ...inputProps,
      inputProps: {
        ...inputProps.inputProps,
        readOnly
      }
    }

    if (!isEmpty(rules)) {
      // apply rule on onBlur
      textFieldProps.InputProps = {
        ...(textFieldProps.InputProps || {}),
        // onBlur: onBlur || this.onInputChange
        onBlur
      }
    }

    if (icon) {
      const Icon = icon
      textFieldProps.InputProps = {
        ...(textFieldProps.InputProps || {}),
        endAdornment: (
          <InputAdornment position="end">
            <Icon
              onClick={ iconClick || (() => {}) }
              className={ [
                classes.icon,
                iconDivisor ? classes.iconDivisor : null,
                iconClick ? classes.iconLink : null
              ].join(' ') }
              { ...iconProps }
            />
          </InputAdornment>
        )
      }
    }

    if (InputComponent) {
      textFieldProps = {
        ...textFieldProps,
        // inputProps,
        InputProps: {
          ...(textFieldProps.InputProps || {}),
          ...customInputProps,
          value,
          onChange: this.onInputChange,
          inputComponent: InputComponent,
          name,
          classes: inputClasses
        }
      }
    } else {
      textFieldProps = {
        ...textFieldProps,
        onChange: this.onInputChange
      }
    }

    const error = showError && !isValid
    let isRequired = indexOf(rules, 'required') >= 0
    const disabledField = disabled || indexOf(rules, 'disabled') >= 0

    const hint = (
      <div>
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
          { helperTextWithMaxLength || helperText }
          { error ?
            <Fragment>
              <br />{ errorText }
            </Fragment>
            : null
          }
        </FormHelperText>
      </div>
    )

    let fix = {}
    if (fixValuePropTypeWarning) {
      fix = {
        ...fix,
        value: ''
      }
    }

    if (isObject(value)) {
      const jsonContent = filter(value, item => !isEmpty(get(item, 'value')))
      if (isEmpty(jsonContent)) {
        InputLabelProps = {
          ...InputLabelProps,
          shrink: false
        }
      }

      // if is DateRangePickerInput
      const fromRules = get(value, 'from.rules')
      const toRules = get(value, 'to.rules')

      if (!isEmpty(fromRules) || !isEmpty(toRules)) {
        isRequired = (
          indexOf(fromRules, 'required') >= 0 ||
          indexOf(toRules, 'required') >= 0
        )
      }
    }

    return (
      <div className={ [classes.container, containerClass].join(' ') }>
        <MuiTextField
          value={ value }
          margin="dense"
          { ...myInputProps }
          { ...textFieldProps }
          classes={ {
            root: classes.root
          } }
          error={ error }
          // helperText={
          //   (!isEmpty(helperText) || error) && !withoutHelperText ?
          //     hint :
          //     null
          // }
          required={ isRequired }
          disabled={ disabledField }
          { ...fix }
          InputLabelProps={ !isEmpty(InputLabelProps) ? InputLabelProps : undefined }
        />
        {
          (!isEmpty(helperText) || error) && !withoutHelperText ?
            hint
            : null
         }
      </div>
    )
  }
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  InputComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]).isRequired,
  icon: PropTypes.func,
  iconClick: PropTypes.func,
  iconDivisor: PropTypes.bool,
  iconProps: PropTypes.object,
  variant: PropTypes.string,
  helperText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  errorText: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    MobxPropTypes.objectOrObservableObject,
    PropTypes.array
  ]),
  isValid: PropTypes.bool,
  showError: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  inputClasses: PropTypes.object,
  labelProps: PropTypes.object,
  inputProps: PropTypes.object,
  customInputProps: PropTypes.object,
  containerClass: PropTypes.string,
  rules: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])),
  disabled: PropTypes.bool,
  withoutHelperText: PropTypes.bool,
  fixValuePropTypeWarning: PropTypes.bool,
  visible: PropTypes.bool,
  debounceTime: PropTypes.number,
  helperContent: PropTypes.func,
  helperContentProps: PropTypes.object
}

TextField.defaultProps = {
  variant: 'standard',
  helperText: '',
  value: '',
  isValid: true,
  showError: false,
  errorText: '',
  icon: null,
  iconClick: null,
  iconDivisor: false,
  iconProps: {},
  inputClasses: {},
  customInputProps: {},
  inputProps: {},
  labelProps: {},
  containerClass: null,
  onChange: () => {},
  onBlur: null,
  rules: [],
  disabled: false,
  withoutHelperText: false,
  fixValuePropTypeWarning: false,
  visible: true,
  debounceTime: 300,
  helperContent: () => null,
  helperContentProps: {}
}

const withTextField = config => WrappedComponent => withStyles(styles)((props) => {
  const {
    type,
    inputDefault,
    labelProps = {},
    ...otherProps
  } = config

  const { value } = props

  let customLabelProps = labelProps
  if (isEmpty(toString(value)) && get(labelProps, 'shrink') !== undefined) {
    customLabelProps = {
      ...customLabelProps,
      shrink: false
    }
  }

  return (
    <TextField
      type={ type }
      InputComponent={ !inputDefault && WrappedComponent }
      { ...otherProps }
      { ...props }
      labelProps={ customLabelProps }
    />
  )
})

export default TextField
export { withTextField }
export { TextField as ComponentWithProps }
