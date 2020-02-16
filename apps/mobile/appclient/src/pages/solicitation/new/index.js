import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Button,
  Text,
  View,
  Spinner,
  Textarea,
} from 'native-base'
import service from '../../../services/service';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles';
import PickerItem from '@syntesis/mc-pickers'
import HeaderBackButton from '@syntesis/mc-headers'
import general from '../../../styles/general'

export default class SolicitationNew extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      loader: false,
      selectedType: null,
      selectedTag: null,
      selectedCatalog: null,
      selectedSituation: null,
      relatedProblem: '',
      types: [],
      tags: [],
      catalogs: [],
      situations: [],
      token: [],
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@appclient:token').then((data) => {
      const token = JSON.parse(data)
      this.setState({ token })
      this.getTypes(token);
    });
  }

  getTypes = async () => {
    this.setState({ loader: true })
    const configs = {
      url: '/api/incident_types',
      params: {
        q: 1,
        fields: 'id,code,title',
        qfields: 'clientView'
      },
    }
    const response = await service.get(configs)
    this.setState({ types: response.data, loader: false })
  }

  getTags = async () => {
    console.log('tag')
    const configs = {
      url: 'api/contract_service_tags',
      params: {
        portalPerson: this.state.token.person.id,
        activationContract: true
      },
    }
    const response = await service.get(configs)
    this.setState({ tags: response.data })
  }

  getCatalogs = async (id) => {
    const configs = {
      url: `api/contract_service_tags/${ id }/catalog_services`
    }
    const response = await service.get(configs)
    this.setState({ catalogs: response.data })
  }

  getSituations = async () => {
    const configs = {
      url: 'api/service_level_agreements',
      params: {
        incidentType: this.state.selectedType,
        contractServiceTag: this.state.selectedTag,
        catalogService: this.state.selectedCatalog
      }
    }
    const response = await service.get(configs)
    console.log('response=====', response.data)
    this.setState({ situations: response.data })
  }

  typeChange = (value) => {
    this.setState({
      selectedType: value,
    })
    this.getTags()
  }

  tagChange = (value) => {
    this.setState({
      selectedTag: value
    })
    this.getCatalogs(value)
  }

  catalogChange = (value) => {
    this.setState({
      selectedCatalog: value
    })
    this.getSituations()
  }

  situationChange = (value) => {
    this.setState({
      selectedSituation: value
    })
  }

  handleSubmit = () => {
    alert(JSON.stringify('SALVAR'))
  }

  render() {
    const isLoaded = this.state.loader
    const typesIsEmpty = this.state.types === []
    const tagsIsEmpty = this.state.tags.length > 0
    const catalogsIsEmpty = this.state.catalogs.length > 0
    const situationsIsEmpty = this.state.situations.length > 0
    return (
      <Container style={ typesIsEmpty ? general.alignVertical : {} }>
        <HeaderBackButton
          styles={ styles }
          goBack={ () => this.props.navigation.goBack() }
          headerLabel="Nova Solicitação"
          statusBarColor="#09536F"
        />
        { isLoaded ?
          <View style={ general.alignHorizontal }>
            <Spinner color="#FA5239" />
          </View>
          :
          <Content padder style={ styles.contentItems }>
            <Form>
              <View style={ styles.item }>
                <PickerItem
                  placeholder="Selecione um tipo de solicitação"
                  styles={ styles }
                  text="Tipo de solicitação:"
                  selectedValue={ this.state.selectedType }
                  onValueChange={ value => this.typeChange(value) }
                  listItem={ this.state.types }
                />
              </View>
              { !isLoaded && tagsIsEmpty &&
              <View style={ styles.item }>
                <PickerItem
                  placeholder="Selecione uma etiqueta"
                  styles={ styles }
                  text="Etiqueta:"
                  selectedValue={ this.state.selectedTag }
                  onValueChange={ value => this.tagChange(value) }
                  listItem={ this.state.tags }
                />
              </View>
              }
              { !isLoaded && catalogsIsEmpty &&
              <View style={ styles.item }>
                <PickerItem
                  placeholder="Selecione um catálogo"
                  styles={ styles }
                  text="Catálogo:"
                  selectedValue={ this.state.selectedCatalog }
                  onValueChange={ value => this.catalogChange(value) }
                  listItem={ this.state.catalogs }
                />
              </View>
              }
              { !isLoaded && situationsIsEmpty &&
              <View style={ styles.item }>
                <PickerItem
                  placeholder="Selecione uma situação"
                  styles={ styles }
                  text="Situação:"
                  selectedValue={ this.state.selectedSituation }
                  onValueChange={ value => this.situationChange(value) }
                  listItem={ this.state.situations }
                />
              </View>
              }
              { !isLoaded && this.state.selectedSituation &&
              <Textarea
                placeholder="Problema relatado"
                rowSpan={ 3 }
                bordered
                style={ { marginBottom: 20 } }
                onChangeText={ text => this.setState({ relatedProblem: text }) }
              />
              }
              <View>
                <Button
                  block
                  disabled={ this.state.relatedProblem === '' }
                  style={ {
                    backgroundColor: this.state.relatedProblem === '' ? '#BEBEBE' : '#FA5239',
                    marginTop: 20,
                  } }
                  onPress={ this.handleSubmit }
                ><Text>Salvar</Text>
                </Button>
              </View>
            </Form>
          </Content>
        }
      </Container>
    )
  }
}
