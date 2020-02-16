import React, { Component } from 'react';
import api from '../../services/service';
import { Container, View, Content, Accordion, Text, Icon, Button, Spinner } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles'
import { Linking } from 'react-native'
import general from '../../styles/general'

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.getNotes = this.getNotes.bind(this)
  }

  state = {
    notes: [],
    note: '',
    loader: false
  }

  componentDidMount() {
    AsyncStorage.getItem('@appclient:token').then((data) => {
      this.setState({ loader: true })
      this.getNotes(JSON.parse(data));
    });
  }

  getNotes = async () => {
    const configs = {
      url: '/api/portal_invoice_notes',
      params: {
        sort: 'id',
        order: 'DESC',
        limit: 20,
        page: 1,
        fields: 'id,movementDate,documentNumber,clientName,clientName2,totalAmountService,printUrl,contract,financialCollectionType,financialOperation',
      }
    }
    const response = await api.get(configs);
    this.setState({ notes: response.data, loader: false });
  }

  openUrlFile = (note) => {
    Linking.openURL(note.printUrl).catch(err =>
      console.error('An error occurred', err));
  }

  renderHeader = (item, expanded) => {
    const textHeaderColor = expanded ? '#fff' : '#000'
    const headerColor = expanded ? '#09536F' : '#fff'
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
          >{ item.financialCollectionType.title }
          </Text>
        </View>
        <Text
          numberOfLines={ 1 }
          style={ { color: textHeaderColor } }
        >{ item.movementDate }
        </Text>
        <Text
          numberOfLines={ 1 }
          style={ { color: textHeaderColor } }
        >{ item.totalAmountService }
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
        <Text style={ general.sectionTitle }>Tomador: </Text> {item.clientName}
      </Text>
      <Text style={ general.accordionText }>
        <Text style={ general.sectionTitle }>Número do Documento: </Text>{item.documentNumber}
      </Text>
      <Text style={ general.accordionText }>
        <Text style={ general.sectionTitle }>Data de Emissão: </Text>{item.movementDate}
      </Text>
      <Text style={ general.accordionText }>
        <Text style={ general.sectionTitle }>Valor: </Text>{item.totalAmountService}
      </Text>
      <Button
        disabled={ item.printUrl === null }
        transparent
        iconRight
        onPress={ () => this.openUrlFile(item.printUrl) }
        style={ { alignSelf: 'center' } }
      >
        <Text>Visualizar arquivo</Text>
        <Icon name="eye" />
      </Button>
    </View>
  );

  render() {
    const isEmpty = this.state.notes.length === 0
    const isLoaded = this.state.loader
    return (
      <Container style={ isEmpty ? general.alignVertical : {} }>
        { !isLoaded && isEmpty ?
          <View style={ general.alignHorizontal }>
            <Text>Não foram encontradas notas.</Text>
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
                dataArray={ this.state.notes }
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
