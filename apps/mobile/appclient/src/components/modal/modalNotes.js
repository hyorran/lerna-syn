import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { Linking } from 'react-native'
import { View, Button, Text, Icon, ListItem } from 'native-base';

export default class ModalNotes extends Component {
  webview = null
  state = {
    isModalVisible: this.props.isModalVisible,
    note: this.props.note
  }

  componentDidMount() {
    this.setState({ isModalVisible: this.props.isModalVisible })
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  openUrlFile = (note) => {
    Linking.openURL(note.printUrl).catch(err =>
      console.error('An error occurred', err));
  }

  render() {
    return (
      <Modal { ...this.props }>
        <View style={ {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          } }
        >
          <View style={ {
              backgroundColor: '#FFF',
              alignItems: 'center'
            } }
          >
            <View style={ {} }>
              <ListItem itemHeader first>
                <Text>{this.props.note.clientName}</Text>
              </ListItem>
              <ListItem>
                <Text>{this.props.note.clientName2}</Text>
              </ListItem>
              <ListItem>
                <Text>{this.props.note.documentNumber}</Text>
              </ListItem>
              <ListItem>
                <Text>{this.props.note.movementDate}</Text>
              </ListItem>
              <ListItem>
                <Text>{this.props.note.totalAmountService}</Text>
              </ListItem>
            </View>
            <View style={ { flexDirection: 'row' } }>
              <Button danger transparent onPress={ this.props.toggleModal } style={ { alignSelf: 'center' } }>
                <Text>Fechar</Text>
              </Button>
              <Button transparent success iconRight onPress={ () => this.openUrlFile(this.props.note) } style={ { alignSelf: 'center' } } >
                <Text>Visualizar arquivo</Text>
                <Icon name="eye" />
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
