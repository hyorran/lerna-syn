import React, { Component } from 'react'
import { Text, Button } from 'native-base'
import PropTypes from 'prop-types'

export default class TextButton extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    this.props.onPress()
  }

  render() {
    const {
      block,
      transparent,
      title,
      disable
    } = this.props

    return (
      <Button
        block={ block }
        transparent={ transparent }
        onPress={ this.onPress }
        disable={ disable }
      >
        <Text>{ title }</Text>
      </Button>
    )
  }
}

TextButton.propTypes = {
  block: PropTypes.bool,
  transparent: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disable: PropTypes.bool
}

TextButton.defaultProps = {
  block: true,
  transparent: false,
  onPress: () => {},
  disable: false
}
