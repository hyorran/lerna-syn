/* eslint-disable object-curly-newline */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import indexOf from 'lodash/indexOf'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import uuid from 'uuid/v1'
import '@ckeditor/ckeditor5-build-classic/build/translations/pt-br'
import applyRulesAndValidate from '../../rules'
import HelpIconButton from '@syntesis/c-buttons/src/components/IconButton/HelpIconButton'
// import { InputHelperModal } from '@syntesis/c-modals'

import styles from './styles'

class TextAreaWithEditor extends Component {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputBlur = this.onInputBlur.bind(this)

    this.state = {
      inputId: uuid(),
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
  }

  onInputChange(newValue) {
    const {
      name,
      onChange
    } = this.props

    onChange(name, {
      value: newValue,
      isValid: true
    })
  }

  onInputBlur() {
    const {
      name,
      onChange,
      rules,
      value
    } = this.props

    const {
      isValid,
      errorText
    } = applyRulesAndValidate(rules, value)

    onChange(name, {
      value,
      isValid,
      errorText,
      showError: true
    })
  }

  renderHelperModal = () => {
    // const {
    //   helperContent,
    //   helperText,
    //   dialogId
    // } = this.props

    // window.openDialog({
    //   component: ({ dialogId: unsafeDialogId, open }) => (
    //     <InputHelperModal
    //       open={ open }
    //       dialogId={ unsafeDialogId }
    //       parentDialog={ dialogId }
    //       helperContent={ helperContent }
    //       helperTitle={ helperText }
    //     />
    //   )
    // })
  }

  render() {
    const {
      classes,
      label,
      value,
      helperText,
      isValid,
      errorText,
      showError,
      rules,
      disabled,
      show,
      helperContent
    } = this.props

    if (!show) {
      return null
    }

    const { inputId } = this.state

    const error = showError && !isValid
    const isRequired = indexOf(rules, 'required') >= 0
    const readOnly = indexOf(rules, 'read-only') >= 0
    const disabledField = disabled || indexOf(rules, 'disabled') >= 0

    const labelText = `${ label }${ isRequired ? ' *' : '' }`

    const hint = (
      <Fragment>
        <FormHelperText
          className={ classes.helperText }
        >
          {
            helperContent ?
              <HelpIconButton
                size="mini"
                marginHorizontal={ false }
                onClick={ this.renderHelperModal }
              />
              : null
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
      <FormControl
        className={ [classes.container, classes.containerFonts].join(' ') }
        error={ error }
      >
        {
          !isEmpty(label)
            ? (
              <InputLabel
                shrink
                htmlFor={ inputId }
              >
                { labelText }
              </InputLabel>
            )
            : null
        }
        <div id={ inputId } className={ [classes.container, 'fix-ckeditor'].join(' ') }>
          <CKEditor
            editor={ ClassicEditor }
            data={ value }
            config={ {
              language: 'pt-br',
              isReadOnly: readOnly,
              toolbar: ['heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'], // 'link'
            } }
            onInit={ (editor) => {
              editor.ui.view.editable.editableElement.styles.height = '110px'
            } }
            onChange={ (event, editor) => {
              const data = editor.getData()
              this.onInputChange(data)
            } }
            disabled={ disabledField }
          />
          {
            !isEmpty(helperText) || error ?
              hint
              : null
          }
        </div>
      </FormControl>
    )
  }
}

TextAreaWithEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
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
  show: PropTypes.bool,
  helperContent: PropTypes.func,
  dialogId: PropTypes.string
}

TextAreaWithEditor.defaultProps = {
  helperText: '',
  value: '',
  isValid: true,
  showError: false,
  errorText: '',
  onChange: () => {},
  rules: [],
  disabled: false,
  label: '',
  show: true,
  helperContent: null,
  dialogId: ''
}

export default withStyles(styles)(TextAreaWithEditor)
export { TextAreaWithEditor as ComponentWithProps }
