import React, { Component } from 'react'
import { Body, Button, Header, Icon, Left, Right, Title, View } from 'native-base'
import PropTypes from 'prop-types'

export default class HeaderBackButton extends Component {

  render() {
    const {
      styles,
      headerLabel,
      goBack,
      statusBarColor,
    } = this.props

    return (
      <Header androidStatusBarColor={ statusBarColor } style={ styles.header }>
        <Left>
          <View style={ styles.viewHeader }>
            <Button transparent onPress={ goBack }>
              <Icon style={ styles.headerIcon } name="arrow-back" />
            </Button>
          </View>
        </Left>
        <Body>
          <View style={ styles.viewHeader }>
            <Title style={ styles.headerText }>{ headerLabel }</Title>
          </View>
        </Body>
        <Right />
      </Header>
    )
  }
}

HeaderBackButton.propTypes = {
  styles: PropTypes.object.isRequired,
  headerLabel: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  statusBarColor: PropTypes.string.isRequired
}

