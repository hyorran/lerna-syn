import React, { Component } from 'react'
import { Text, Button, Icon } from 'native-base'
import PropTypes from 'prop-types'

export default class IconButton extends Component {
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
      disable,
      styleBtn,
      styleBtnIcon,
      iconName
    } = this.props

    return (
      <Button
        block={ block }
        transparent={ transparent }
        onPress={ this.onPress }
        disable={ disable }
        style={ styleBtn }
      >
        <Icon style={ styleBtnIcon } name={ iconName } />
        {title && <Text>{ title }</Text>}
      </Button>
    )
  }
}

IconButton.propTypes = {
  block: PropTypes.bool,
  transparent: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func,
  disable: PropTypes.bool,
  styles: PropTypes.object,
  iconName: PropTypes.object.isRequired,
  styleBtnIcon: PropTypes.object,
  styleBtn: PropTypes.object
}

IconButton.defaultProps = {
  block: false,
  transparent: true,
  onPress: () => {},
  disable: false,
  styles: [],
  title: null,
  styleBtnIcon: [],
  styleBtn: []
}
