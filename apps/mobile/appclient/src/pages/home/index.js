import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Text, View, Header, Button, Left, Right, Icon, Container, Body, ActionSheet } from 'native-base'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import styles from './styles'
import ScrollableTabBar from '@syntesis/mc-tabs'
import LeviesAndPayments from '../leviesAndPayments'
import Notes from '../notes'
import Solicitation from '../solicitation'
import AsyncStorage from '@react-native-community/async-storage'
import service from '../../services/service'

const quantityOfTabs = 6 // #TODO QUANTIDADE DE TABS
export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      person: [],
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@appclient:token').then((data) => {
      console.log(data)
      this.findNotification(data)
      this.setState({ person: JSON.parse(data).person })
    });
  }

  findNotification = async () => {
    const configs = {
      url: 'api/people_warnings',
      params: {
        person: this.state.person.id,
        sort: 'id',
        order: 'ASC',
        status: 'unread',
        limit: 20,
        type: 2,
        page: 1,
        fields: 'id,read,readHour,readDate,warning',
      }
    }

    const response = await service.get(configs)
    console.log(response.data)
  }

  handleLogout = () => {
    ActionSheet.show(
      {
        options: ['Sair', 'Cancelar'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
        title: 'Deseja realmente sair?'
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          AsyncStorage.removeItem('@appclient:token')
          this.props.navigation.navigate('Login')
        }
      }
    )
  }

  _scrollX = new Animated.Value(0);
  interpolators = Array.from({ length: quantityOfTabs }, (_, i) => i).map(idx => ({
    scale: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    }),
    opacity: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [0.9, 1.1, 0.9],
      extrapolate: 'clamp',
    }),
    textColor: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: ['#09536F', '#fff', '#09536F'],
      extrapolate: 'clamp',
    }),
    backgroundColor: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: ['#09536F', '#09536F', '#09536F'],
      extrapolate: 'clamp',
    }),
  }));

  render() {
    return (
      <Container style={ { marginBottom: -1 } }>
        <Header androidStatusBarColor="#09536F" hasSegment style={ styles.header }>
          <Left>
            <View style={ styles.view }>
              <Button transparent onPress={ () => this.props.navigation.navigate('Profile') }>
                <Icon style={ styles.icon } type="FontAwesome5" name="user" />
              </Button>
              <Text style={ styles.text }>{ this.state.person.nameList }</Text>
            </View>
          </Left>
          <Body />
          <Right>
            <View>
              <Button transparent onPress={ () => this.props.navigation.navigate('Notification') }>
                <Icon style={ styles.icon } type="FontAwesome5" name="bell" />
              </Button>
            </View>
            <View>
              <Button transparent onPress={ this.handleLogout }>
                <Icon style={ styles.icon } type="FontAwesome5" name="sign-out-alt" />
              </Button>
            </View>
          </Right>
        </Header>
        <ScrollableTabView
          tabBarPosition="bottom"
          renderTabBar={ () => (
            <TabBar
              underlineColor="#FA5239"
              tabBarStyle={ styles.tabBar }
              renderTab={ (tab, page, isTabActive, onPressHandler, onTabLayout) => {
                console.log(page)
                return (
                  <ScrollableTabBar
                    key={ page }
                    tab={ tab }
                    page={ page }
                    isTabActive={ isTabActive }
                    onPressHandler={ onPressHandler }
                    onTabLayout={ onTabLayout }
                    styles={ this.interpolators[page] }
                  />
                )
              } }
            />
          ) }
          onScroll={ x => this._scrollX.setValue(x) }
        >
          <LeviesAndPayments tabLabel={ { label: 'Cobranças', icon: 'barcode' } } />
          <Notes tabLabel={ { label: 'Notas', icon: 'file-alt' } } />
          <Solicitation { ...this.props } tabLabel={ { label: 'Solicitações', icon: 'comment' } } />
          <LeviesAndPayments tabLabel={ { label: 'Cobranças', icon: 'barcode' } } />
          <Notes tabLabel={ { label: 'Notas', icon: 'file-alt' } } />
          <Solicitation { ...this.props } tabLabel={ { label: 'Solicitações', icon: 'comment' } } />
        </ScrollableTabView>
      </Container>
    );
  }
}
