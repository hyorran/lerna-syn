import React, { Component } from 'react';
import { Container, Content, Card, Text, CardItem, Body, Icon, Left } from 'native-base';
import service from '../../../services/service';
import environments from '../../../environments/environments';
import RNFetchBlob from 'rn-fetch-blob';
import * as mime from 'react-native-mime-types';

export default class SolicitationDetail extends Component {
  constructor(props) {
    super(props);
    this.getFiles = this.getFiles.bind(this)
    this.getHistory = this.getHistory.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
  }

    state = {
      solicitation: [],
      token: [],
      histories: [],
      files: [],
      assignmentId: null
    }

    componentDidMount() {
      const { id } = this.props.navigation.state.params.solicitation.assignment;
      this.setState({ assignmentId: id })
      this.getHistory(id);
      this.getFiles(id);
    }

    getHistory = async (id) => {
      const configs = {
        url: `/api/assignments/${ id }/notes`,
        params: {
          fields: 'id,title,description,person,assignment,created,modified'
        },
      }
      const response = await service.get(configs)
      this.setState({
        histories: response.data
      })
    }

    getFiles = async (id) => {
      const configs = {
        url: `/api/assignments/${ id }/uploads`,
        params: {
          fields: 'id,title,description,mimetype,created,print'
        }
      }
      const response = await service.get(configs)
      this.setState({
        files: response.data
      })
    }

    downloadFile = (file) => {
      const uri = `${ environments.BASE_URL }api/assignments/${ this.state.assignmentId }/uploads/${ file.id }/download`;
      const location = `${ RNFetchBlob.fs.dirs.DocumentDir }/${ file.id }`;

      RNFetchBlob.config({
        fileCache: true,
        path: `${ location }.${ mime.extension(file.mimetype) }`,
        mime: file.mimetype,
      }).fetch('GET', uri, {
        Authorization: `Bearer ${ this.state.token.access_token }`
      }).then((res) => {
        if (RNFetchBlob.fs.exists(location)) {
          RNFetchBlob.ios.previewDocument(res.data);
        }
      })
    }

    render() {
      const {
        assignment = [],
        incidentStatus = []
      } = this.props.navigation.state.params.solicitation

      return (
        <Container>
          <Content>
            <Card>
              <CardItem header>
                <Text>{assignment.title}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>Data de abertura: <Text note>{assignment.created}</Text></Text>
                  <Text>Status: <Text note>{incidentStatus.title}</Text></Text>
                  <Text>Etiqueta: <Text note /></Text>
                  <Text note>{assignment.description}</Text>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Text>Histórico</Text>
              </CardItem>
              {this.state.histories.map((history, key) => (
                <CardItem key={ history.id }>
                  <Body>
                    <Text>Atendimento solicitação <Text note>{history.created}</Text></Text>

                    <Text note numberOfLines={ 2 }>{history.description}</Text>
                  </Body>
                </CardItem>
              ))}
            </Card>
            <Card>
              <CardItem header>
                <Text>Anexos</Text>
              </CardItem>
              {this.state.files.map((file, key) => (
                <CardItem key={ file.id }>
                  <Left>
                    <Icon
                      onPress={ () => {
                        this.downloadFile(file)
                      } }
                      style={ { marginRight: 10 } }
                      type="FontAwesome5"
                      active
                      name="file-image"
                    />
                    <Body style={ { margin: 0 } }>
                      <Text>{file.title}</Text>
                      <Text>Data: <Text note>{file.created}</Text></Text>
                    </Body>
                  </Left>
                </CardItem>
              ))}
            </Card>
          </Content>
        </Container>
      )
    }
}
