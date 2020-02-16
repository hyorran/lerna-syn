import React, { Component } from 'react';
import { Platform, Linking } from 'react-native';
import { Container, Content, Button, Icon, Text } from 'native-base'
import styles from './styles'
import environment from '../../environments/environments';

export default class Contact extends Component {

    handleOpenCallNumber = () => {
      console.log('callNumber ----> ', environment.PHONE);
      let phoneNumber = environment.PHONE;
      if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${ environment.PHONE }`;
      } else {
        phoneNumber = `tel:${ environment.PHONE }`;
      }
      Linking.openURL(phoneNumber)
        .catch(err => console.error(err));
    };

    handleOpenSite = () => {
      Linking.openURL(environment.SITE)
        .catch(err => console.error(err));
    }

    handleOpenEmail = () => {
      Linking.openURL(`mailto:${ environment.SITE }`)
        .catch(err => console.error(err));
    }

    render() {
      return (
        <Container style={ styles.container }>
          <Content>
            <Button iconLeft style={ styles.button } onPress={ this.handleOpenEmail }>
              <Icon type="FontAwesome5" name="envelope" />
              <Text>Do nosso e-mail</Text>
            </Button>
            <Button iconLeft style={ styles.button } onPress={ this.handleOpenCallNumber }>
              <Icon type="FontAwesome5" name="phone" />
            </Button>
            <Button iconLeft style={ styles.button } onPress={ this.handleOpenSite }>
              <Icon type="FontAwesome5" name="window-restore" />
              <Text>Do nosso site</Text>
            </Button>
          </Content>
        </Container>
      )
    }
}
