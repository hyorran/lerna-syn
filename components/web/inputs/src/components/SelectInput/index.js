import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import indexOf from 'lodash/indexOf'
import map from 'lodash/map'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid/Grid'
import CircularIndeterminate from '@syntesis/c-loaders/src/components/CircularIndeterminate'
import uuid from 'uuid/v1'
import applyRulesAndValidate from '../../rules'
import HelpIconButton from '@syntesis/c-buttons/src/components/IconButton/HelpIconButton'
import { openInputHelperModal } from '@syntesis/c-modals/src/containers/InputHelper/utils'

import styles from './styles'

class SelectInput extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      inputId: uuid(),
    }
  }

  handleChange = ({ target: { value } }) => {
    const {
      name,
      onChange,
      rules
    } = this.props

    value = value.toString()

    const {
      isValid,
      errorText
    } = applyRulesAndValidate(rules, value)

    onChange(name, {
      value,
      isValid,
      showError: true,
      errorText
    })
  }

  render() {
    const {
      classes,
      selectClasses,
      value,
      name,
      label,
      errorText,
      rules,
      disabled,
      helperText,
      showError,
      isValid,
      none,
      options,
      variant,
      loading,
      margin,
      visible,
      helperContent,
      helperContentProps
    } = this.props

    if (!visible) {
      return null
    }

    const { inputId } = this.state

    const error = showError && !isValid
    const isRequired = indexOf(rules, 'required') >= 0
    const readOnly = indexOf(rules, 'read-only') >= 0
    const disabledField = disabled || indexOf(rules, 'disabled') >= 0

    const hint = (
      <Fragment>
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
        { error ?
          <Fragment>
            <br />{ errorText }
          </Fragment>
          : null
        }
      </Fragment>
    )

    return (
      <Grid container spacing={ 0 }>
        <Grid item sm={ loading ? 11 : 12 }>
          <FormControl
            className={ [classes.formControl, margin ? classes.margin : null].join(' ') }
            error={ error }
          >
            {
              !isEmpty(label)
                ? <InputLabel htmlFor={ inputId }>{ label } { isRequired ? '*' : '' }</InputLabel>
                : null
            }
            <Select
              classes={ selectClasses }
              value={ value }
              onChange={ this.handleChange }
              input={ <Input name={ name } id={ inputId } /> }
              required={ isRequired }
              readOnly={ readOnly }
              disabled={ disabledField }
              variant={ variant }
            >
              {
                !isEmpty(none)
                  ? (
                    <MenuItem value="">
                      <em>{ none }</em>
                    </MenuItem>
                  )
                  : null
              }
              {
                map(options, option => (
                  <MenuItem
                    key={ option.value }
                    value={ option.value }
                  >
                    { option.label }
                  </MenuItem>
                ))
              }
            </Select>
            {
              !isEmpty(helperText) || error ?
                hint
                : null
            }
          </FormControl>
        </Grid>
        <Grid item sm={ loading ? 1 : false }>
          { loading && <CircularIndeterminate size={ 20 } /> }
        </Grid>
      </Grid>
    )
  }
}

SelectInput.propTypes = {
  classes: PropTypes.object.isRequired,
  selectClasses: PropTypes.object,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  none: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
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
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })),
  variant: PropTypes.string,
  loading: PropTypes.bool,
  margin: PropTypes.bool,
  visible: PropTypes.bool,
  helperContent: PropTypes.func,
  helperContentProps: PropTypes.object,
  dialogId: PropTypes.string
}

SelectInput.defaultProps = {
  selectClasses: undefined,
  helperText: '',
  value: '',
  isValid: true,
  showError: false,
  errorText: '',
  onChange: () => {},
  rules: [],
  disabled: false,
  label: '',
  none: 'Nenhuma opção selecionada',
  options: [],
  variant: 'standard',
  loading: false,
  margin: true,
  visible: true,
  helperContent: () => null,
  dialogId: '',
  helperContentProps: {}
}

export default withStyles(styles)(SelectInput)
export { SelectInput as ComponentWithProps }
