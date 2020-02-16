import React, { Component } from 'react'
import { ActivityIndicator, View, } from 'react-native'
import service from './service'

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const userToken = await service.getToken();
    this.props.navigation.navigate(userToken ? 'Main' : 'Login');
    console.log(JSON.parse(userToken))
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}
