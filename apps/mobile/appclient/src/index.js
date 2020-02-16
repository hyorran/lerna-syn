import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Root } from 'native-base'
import Router from './routes'

export default class App extends Component {
  render() {
    console.disableYellowBox = true
    return (
      <Root>
        <Router />
      </Root>
    );
  }
}

AppRegistry.registerComponent('App', () => App)
