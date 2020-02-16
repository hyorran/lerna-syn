import React, { Component } from 'react'
import { Input, Item, Label } from 'native-base'
import PropTypes from 'prop-types'
import styles from './styles'

export default class ItemInput extends Component {
  constructor(props) {
    super(props)
    this.onChangeText = this.onChangeText.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  onBlur() {
    this.props.onBlur()
  }
  onChangeText() {
    this.props.onChangeText()
  }

  render() {
    const {
      secureTextEntry,
      autoCapitalize,
      floatingLabel,
      title,
      value,
      name
    } = this.props

    return (
      <Item
        floatingLabel={ floatingLabel }
        style={ styles.item }
        error={ value === '' }
      >
        <Label>{ title }</Label>
        <Input
          style={ styles.input }
          autoCapitalize={ autoCapitalize }
          secureTextEntry={ secureTextEntry }
          name={ name }
          onBlur={ this.onBlur }
        />
      </Item>
    )
  }
}

ItemInput.propTypes = {
  title: PropTypes.string.isRequired,
  floatingLabel: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func
}

ItemInput.defaultProps = {
  floatingLabel: true,
  secureTextEntry: false,
  autoCapitalize: 'none',
  onChangeText: () => {},
  onBlur: () => {},
}
