import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, Container, Content, Left, Body, Button, Text, Icon, Header } from 'native-base';

class SideMenu extends Component {

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  handleLogout = () => {
    AsyncStorage.removeItem('@appclient:token');
    this.props.navigation.navigate('Index');
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <ListItem icon onPress={ this.navigateToScreen('Index') }>
            <Left>
              <Button style={ { backgroundColor: '#023A' } }>
                <Icon type="FontAwesome" active name="home" />
              </Button>
            </Left>
            <Body>
              <Text>Home</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={ this.navigateToScreen('Index') }>
            <Left>
              <Button style={ { backgroundColor: '#FF9501' } }>
                <Icon type="FontAwesome" active name="user" />
              </Button>
            </Left>
            <Body>
              <Text>Perfil</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={ this.navigateToScreen('Intro') }>
            <Left>
              <Button style={ { backgroundColor: '#007AFF' } }>
                <Icon type="FontAwesome" active name="info-circle" />
              </Button>
            </Left>
            <Body>
              <Text>Introdução</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={ this.navigateToScreen('LeviesAndPayments') }>
            <Left>
              <Button style={ { backgroundColor: '#023CFF' } }>
                <Icon active name="barcode" />
              </Button>
            </Left>
            <Body>
              <Text>Cobranças</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={ this.navigateToScreen('Index') }>
            <Left>
              <Button style={ { backgroundColor: '#FFB011' } }>
                <Icon active type="FontAwesome5" name="file-alt" />
              </Button>
            </Left>
            <Body>
              <Text>Notas</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={ this.navigateToScreen('Index') }>
            <Left>
              <Button style={ { backgroundColor: '#C021F1' } }>
                <Icon active type="FontAwesome5" name="comment" />
              </Button>
            </Left>
            <Body>
              <Text>Solicitações</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={ this.navigateToScreen('Index') }>
            <Left>
              <Button style={ { backgroundColor: '#11CCF1' } }>
                <Icon active type="FontAwesome5" name="id-badge" />
              </Button>
            </Left>
            <Body>
              <Text>Contato</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={ this.handleLogout }>
            <Left>
              <Button style={ { backgroundColor: '#F00000' } }>
                <Icon type="FontAwesome" active name="sign-out" />
              </Button>
            </Left>
            <Body>
              <Text>Sair</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default SideMenu;
