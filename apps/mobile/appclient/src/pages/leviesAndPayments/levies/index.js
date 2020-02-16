import React, { Component } from 'react';
import service from '../../../services/service';
import {
  Container,
  View,
  Text,
  Icon,
  Button,
  Spinner,
  Toast, Content, Accordion
} from 'native-base'
import { Clipboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import environments from '../../../environments/environments'
import RNFetchBlob from 'rn-fetch-blob';
import styles from '../styles'
import general from '../../../styles/general'

export default class Levies extends Component {
  constructor(props) {
    super(props);
    this.getLevies = this.getLevies.bind(this)
  }

  state = {
    loader: false,
    levies: [],
    token: [],
  }
  componentDidMount() {
    AsyncStorage.getItem('@appclient:token').then((data) => {
      this.setState({ token: JSON.parse(data) })
      this.getLevies(JSON.parse(data));
    });
  }

  getLevies = async () => {
    this.setState({ loader: true })
    const configs = {
      url: '/api/portal_financial_receivable_titles',
      params: {
        fields: 'id,parcel,balance,title,bankTitleNumber,documentAmount,complement,hash,typefulLine,expirationDate,competence,fineAmount,interestAmount',
      }
    }
    const response = await service.get(configs);
    this.setState({ levies: response.data, loader: false })
  }

  writeToClipboard = (typefulLine) => {
    Clipboard.setString(typefulLine);
    Toast.show({
      text: 'Código copiado para a área de tranferencia!',
      position: 'bottom',
      textStyle: { fontSize: 15 },
      style: { marginBottom: 80 },
      duration: 2000
    })
  }

  downloadFile = (item) => {
    console.log(`DIRETORIO ${ RNFetchBlob.fs.dirs.DocumentDir }`)
    const uri = `${ environments.BASE_URL }api/financial/billet/${ item.hash }`;
    console.log(`URI ${ uri }`)
    const pdfLocation = `${ RNFetchBlob.fs.dirs.DocumentDir }/${ item.title }.pdf`;

    RNFetchBlob.config({
      path: pdfLocation,

    }).fetch('GET', uri, {
      Authorization: `Bearer ${ this.state.token.access_token }`
    }).then((res) => {
      console.log(`RESPONSE ${ JSON.stringify(res) }`)
      if (RNFetchBlob.fs.exists(pdfLocation)) {
        alert('existe pdf')
        RNFetchBlob.ios.previewDocument(res.data);
      } else {
        alert('nao existe pdf')
      }
    })
  }

  renderHeader = (item, expanded) => {
    const textHeaderColor = expanded ? '#fff' : '#000'
    const headerColor = expanded ? '#09536F' : '#fff'
    return (
      <View
        style={ [styles.header, { backgroundColor: headerColor }] }
      >
        <View style={ { width: 120 } }>
          <Text
            numberOfLines={ 1 }
            style={ {
              color: textHeaderColor,
              flex: 1
            } }
          >{ item.documentAmount }, 00
          </Text>
        </View>
        <Text
          numberOfLines={ 1 }
          style={ { color: textHeaderColor } }
        >{ item.expirationDate }
        </Text>
        { expanded
          ? <Icon style={ [styles.iconHeader, { color: textHeaderColor }] } name="remove" />
          : <Icon style={ [styles.iconHeader, { color: textHeaderColor }] } name="add" /> }
      </View>
    );
  }

  renderContent = item => (
    <View style={ styles.content }>
      <Text style={ styles.text }>
        <Text style={ general.sectionTitle }>Valor: </Text> { item.documentAmount },00
      </Text>
      <Text style={ styles.text }>
        <Text style={ general.sectionTitle }>Data de alidade: </Text>{ item.expirationDate }
      </Text>
      <Text style={ styles.text }>
        <Text style={ general.sectionTitle }>Competência: </Text>{ item.competence }
      </Text>
      <Text style={ styles.text } button onPress={ () => this.writeToClipboard(item.typefulLine) }>
        <Text style={ general.sectionTitle }>Código de barras: </Text>{ item.typefulLine }
      </Text>
      <Button
        onPress={ () => this.downloadFile(item) }
        style={ { alignSelf: 'center' } }
        transparent
        iconLeft
      >
        <Icon name="download" />
        <Text>Baixar arquivo</Text>
      </Button>
    </View>
  );

  render() {
    const isEmpty = this.state.levies.length === 0
    const isLoaded = this.state.loader
    return (
      <Container style={ isEmpty ? general.alignVertical : {} }>
        { isLoaded ?
          <View style={ general.alignHorizontal } >
            <Spinner color="#FA5239" />
          </View>
          :
          !isLoaded && isEmpty ?
            <View style={ general.alignHorizontal }>
              <Text>Não foram encontradas cobranças.</Text>
            </View>
            :
            <Content padder>
              <Accordion
                style={ { borderWidth: 0 } }
                dataArray={ this.state.levies }
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
