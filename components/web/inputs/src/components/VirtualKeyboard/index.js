import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Keyboard from 'react-simple-keyboard'
import { confirmPreRules } from '../../rules'

import styles from './styles'

class VirtualKeyboard extends PureComponent {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)

    this.state = {
      keyboardRef: createRef()
    }
  }

  componentDidMount() {
    // For default input (i.e. if you have only one)
    this.state.keyboardRef.current.setInput(this.props.value)
  }

  onInputChange(value) {
    const {
      fieldName,
      onChange,
      rules,
      value: oldValue
    } = this.props

    const { isValid } = confirmPreRules(rules, value)

    if (isValid) {
      onChange(fieldName, {
        value,
        isValid,
        showError: true
      })
    } else {
      this.state.keyboardRef.current.setInput(oldValue)
    }
  }

  render() {
    const {
      fieldName,
      numeric
    } = this.props

    const theme = ['hg-theme-default', 'hg-theme-ios']

    let layout
    if (numeric) {
      layout = {
        default: [
          '1 2 3',
          '4 5 6',
          '7 8 9',
          '0 {bksp}',
        ]
      }
      // theme.push('hg-layout-numeric')
    }

    return (
      <Keyboard
        ref={ this.state.keyboardRef }
        inputName={ fieldName }
        onChange={ this.onInputChange }
        layout={ layout }
        theme={ theme.join(' ') }
        display={ {
          // '{alt}': '.?123',
          // '{smileys}': '\uD83D\uDE03',
          '{shift}': '⇧',
          '{shiftactivated}': '⇧',
          '{enter}': 'enter',
          // '{bksp}': '⌫',
          '{bksp}': 'APAGA',
          // '{altright}': '.?123',
          // '{downkeyboard}': '🞃',
          '{space}': ' ',
          '{default}': 'ABC',
          // '{back}': '⇦'
          '{back}': 'APAGA'
        } }
      />
    )
  }
}

VirtualKeyboard.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  numeric: PropTypes.bool,
  rules: PropTypes.array
}

VirtualKeyboard.defaultProps = {
  numeric: false,
  rules: []
}

export default withStyles(styles)(VirtualKeyboard)
export { VirtualKeyboard as ComponentWithProps }
