import React, { Component } from 'react'
import {
  Content,
  Input,
  Item,
  Label,
  Text,
  Button,
  View,
  Container
} from 'native-base'
import styles from './styles'
import HeaderBackButton from '@syntesis/mc-headers'

export default class ForgotPassword extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
    this.handleForgotPasswordPress = this.handleForgotPasswordPress.bind(this)
  }

  handleForgotPasswordPress = async () => {
    alert(this.state.username)
  }

  render() {
    return (
      <Container>
        <HeaderBackButton
          styles={ styles }
          goBack={ () => this.props.navigation.goBack() }
          headerLabel="Recuperar"
          statusBarColor="#09536F"
        />
        <Content padder>
          <View style={ styles.contentItems }>
            <Text style={ styles.text }>
              Para que seja possível recuperarmos sua senha, por favor nos informe seu usuário.
            </Text>
            <Item floatingLabel style={ styles.item }>
              <Label>Nome de Usuário</Label>
              <Input
                style={ styles.input }
                autoCapitalize="none"
                value={ this.state.username }
                onChangeText={ value => this.setState({ username: value }) }
              />
            </Item>
            <Button
              block
              style={ {
                backgroundColor: this.state.username === '' ? '#BEBEBE' : '#FA5239'
              } }
              disabled={ this.state.username === '' }
              onPress={ this.handleForgotPasswordPress }
            >
              <Text>Recuperar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}
