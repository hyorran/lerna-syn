import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Pages } from 'react-native-pages';
import { Image, Container, Text, Button } from 'native-base';

Platform.select({
  ios: () => StatusBar.setBarStyle('light-content'),
  android: () => StatusBar.setBackgroundColor('#263238'),
})();

export default class Intro extends Component {
  static navigationOptions = () => ({
    header: null
  })

  handleIgnore = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Pages>
        <Container>
          <Image source="../../assets/syntesis.png" resizeMode="contain" />
          <Text>Bem vindo ao portal de relacionamento!</Text>
          <Text>Ocorreram algumas mudanças nessa nova versão do App. Vamos conferir?</Text>
          <Button onPress={ this.handleIgnore }>
            <Text>Ignorar</Text>
          </Button>
        </Container>
        <Container>
          <Text>2</Text>
        </Container>
        <Container>
          <Text>3</Text>
        </Container>
        <Container>
          <Text>4</Text>
        </Container>
      </Pages>
    );
  }
}
