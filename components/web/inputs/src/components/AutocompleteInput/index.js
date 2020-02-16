import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import indexOf from 'lodash/indexOf'
import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import filter from 'lodash/filter'
import find from 'lodash/find'
import map from 'lodash/map'
import FormControl from '@material-ui/core/FormControl/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText'
import { withStyles } from '@material-ui/core/styles'
import NoSsr from '@material-ui/core/NoSsr'
import createFilterOptions from 'react-select-fast-filter-options'
import applyRulesAndValidate from '../../rules'
import Option from './Option'
import Control from './Control'
import Menu from './Menu'
import MenuList from './MenuList'
import MultiValue from './MultiValue'
import NoOptionsMessage from './NoOptionsMessage'
import Placeholder from './Placeholder'
import SingleValue from './SingleValue'
import ValueContainer from './ValueContainer'
import HelpIconButton from '@syntesis/c-buttons/src/components/IconButton/HelpIconButton'
import { openInputHelperModal } from '@syntesis/c-modals/src/containers/InputHelper/utils'

import styles from './styles'

const components = {
  Control,
  Menu,
  MenuList,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
}

class SelectInput extends Component {

  state = {
    inputValue: ''
  }

  onChangeInputValue = (inputValue) => {
    this.setState(prevState => ({
      ...prevState,
      inputValue
    }))
  }

  handleChange = (selectedOptions) => {
    const {
      name,
      onChange,
      rules
    } = this.props

    let value = ''
    let alias = ''
    if (isArray(selectedOptions)) {
      value = map(selectedOptions, option => option.value)
      alias = map(selectedOptions, option => option.label)
    } else if (selectedOptions) {
      // eslint-disable-next-line no-undef,prefer-destructuring
      value = selectedOptions.value
      alias = selectedOptions.label
    }

    const {
      isValid,
      errorText
    } = applyRulesAndValidate(rules, value)

    onChange(name, {
      value,
      alias,
      isValid,
      showError: true,
      errorText
    })
  }

  render() {
    const {
      classes,
      name,
      theme,
      options,
      value,
      multi,
      label,
      placeholder,
      errorText,
      rules,
      noOptionsMessage,
      disabled,
      helperText,
      showError,
      isValid,
      loading,
      isClearable,
      visible,
      helperContent,
      helperContentProps
    } = this.props

    if (!visible) {
      return null
    }

    const { inputValue } = this.state

    const error = showError && !isValid
    const isRequired = indexOf(rules, 'required') >= 0
    const readOnly = indexOf(rules, 'read-only') >= 0 || disabled || indexOf(rules, 'disabled') >= 0

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
            { !isEmpty(helperText) ? <br /> : null }{ errorText }
          </Fragment>
          : null
        }
      </Fragment>
    )

    const selectStyles = {
      menuPortal: base => ({
        ...base,
        zIndex: 9999
      }),
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit'
        },
      }),
      clearIndicator: base => ({
        ...base,
        cursor: 'pointer'
      })
    }

    let selectedValues = null
    if (isArray(value)) {
      selectedValues = filter(options, option => indexOf(value, option.value) > -1)
    } else if (value) {
      selectedValues = find(options, option => option.value === value)
    }

    // For more configuration options, see:
    // https://github.com/bvaughn/react-select-fast-filter-options#configuration-options
    const filterOptions = createFilterOptions({
      options
    })

    return (
      <FormControl className={ classes.root } error={ error }>
        <NoSsr>
          <Select
            isLoading={ loading }
            name={ name }
            menuPortalTarget={ document.getElementById('react-dialog-portal') }
            isClearable={ isClearable }
            classes={ classes }
            styles={ selectStyles }
            filterOptions={ filterOptions }
            options={ options }
            components={ components }
            value={ selectedValues }
            onChange={ this.handleChange }
            placeholder={ placeholder }
            isMulti={ multi }
            textFieldProps={ {
              label: `${ label }${ isRequired ? ' *' : '' }`,
              error,
              disabled,
              margin: 'dense',
              InputLabelProps: {
                shrink: !isEmpty(selectedValues) || !isEmpty(inputValue),
              },
            } }
            required={ isRequired }
            noOptionsMessage={ () => noOptionsMessage }
            isDisabled={ readOnly }
            onInputChange={ this.onChangeInputValue }
          />
        </NoSsr>
        {
          !isEmpty(helperText) || error ?
            hint
            : null
        }
      </FormControl>
    )
  }
}

SelectInput.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]))
  ]),
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
  helperText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  errorText: PropTypes.string,
  isValid: PropTypes.bool,
  showError: PropTypes.bool,
  onChange: PropTypes.func,
  rules: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])),
  noOptionsMessage: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  isClearable: PropTypes.bool,
  label: PropTypes.string,
  visible: PropTypes.bool,
  helperContent: PropTypes.func,
  dialogId: PropTypes.string,
  helperContentProps: PropTypes.object
}

SelectInput.defaultProps = {
  multi: false,
  placeholder: '',
  helperText: '',
  value: '',
  isValid: true,
  showError: false,
  errorText: '',
  onChange: () => {},
  rules: [],
  disabled: false,
  loading: false,
  isClearable: true,
  label: '',
  options: [],
  noOptionsMessage: 'Nenhuma opção encontrada',
  visible: true,
  helperContent: () => null,
  dialogId: '',
  helperContentProps: {}
}

export default withStyles(styles, { withTheme: true })(SelectInput)
