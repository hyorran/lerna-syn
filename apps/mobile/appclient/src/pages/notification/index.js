import React, { Component } from 'react'
import {
  Container,
  Content,
  Text,
  Spinner,
  Accordion,
  View,
  Icon,
} from 'native-base'
import styles from './styles'
import general from '../../styles/general'
import service from '../../services/service'
import HeaderBackButton from '@syntesis/mc-headers'
import { Colors } from '@syntesis/c-styles'

export default class Notification extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.getNotifications = this.getNotifications.bind(this)
    this.state = {
      loader: false,
      notifications: [
        {
          id: 1,
          title: 'Notificacao numero 1',
          description: 'monte de coisas aleatorias para poder testar as dimendoes',
          date: '10/10/2018'
        }, {
          id: 2,
          title: 'Notificacao numero 2',
          description: 'monte de coisas aleatorias para poder testar as dimendoes',
          date: '19/07/2018'
        }, {
          id: 3,
          title: 'Notificacao numero 3',
          description: 'monte de coisas aleatorias para poder testar as dimendoes',
          date: '30/03/2018'
        }, {
          id: 4,
          title: 'Notificacao numero 4',
          description: 'monte de coisas aleatorias para poder testar as dimendoes',
          date: '31/09/2018'
        }, {
          id: 5,
          title: 'Notificacao numero 5',
          description: 'monte de coisas aleatorias para poder testar as dimendoes',
          date: '12/02/2018'
        }, {
          id: 6,
          title: 'Notificacao numero 6',
          description: 'monte de coisas aleatorias para poder testar as dimendoes',
          date: '09/12/2018'
        },
      ]
    }
  }

  getNotifications = async () => {
    this.setState({ loader: true })
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
    this.setState({
      notifications: response.data,
      loader: false
    })
    console.log(response.data)
  }

  renderHeader = (item, expanded) => {
    const textHeaderColor = expanded ? Colors.white : '#000'
    const headerColor = expanded ? Colors.primary : Colors.white
    return (
      <View
        style={ [general.accordionHeader, { backgroundColor: headerColor }] }
      >
        <View style={ { width: 120 } }>
          <Text
            numberOfLines={ 1 }
            style={ {
              color: textHeaderColor,
              flex: 1
            } }
          >{ item.title }
          </Text>
        </View>
        <Text numberOfLines={ 1 } style={ { color: textHeaderColor } }>
          { item.date }
        </Text>
        { expanded
          ? <Icon style={ [general.accordionHeaderIcon, { color: textHeaderColor }] } name="remove" />
          : <Icon style={ [general.accordionHeaderIcon, { color: textHeaderColor }] } name="add" /> }
      </View>
    );
  }

  renderContent = item => (
    <View style={ general.accordionContent }>
      <Text style={ general.accordionText }>
        {item.description}
      </Text>
    </View>
  );

  render() {
    const isEmpty = this.state.notifications.length === 0
    const isLoaded = this.state.loader
    return (
      <Container style={ isEmpty ? general.alignVertical : {} }>
        <HeaderBackButton
          styles={ styles }
          goBack={ () => this.props.navigation.goBack() }
          headerLabel="Notificações"
          statusBarColor="#09536F"
        />
        { !isLoaded && isEmpty ?
          <View style={ general.alignHorizontal }>
            <Text>Não foram encontradas notificações.</Text>
          </View>
          :
          isLoaded ?
            <View style={ general.alignHorizontal } >
              <Spinner color="#FA5239" />
            </View>
            :
            <Content padder>
              <Accordion
                style={ { borderWidth: 0 } }
                dataArray={ this.state.notifications }
                animation
                expanded={ 0 }
                renderHeader={ this.renderHeader }
                renderContent={ this.renderContent }
              />
            </Content>
        }
      </Container>
    )
  }
}
