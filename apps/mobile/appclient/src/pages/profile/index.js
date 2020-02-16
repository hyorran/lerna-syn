import React, { Component } from 'react';
import styles from './styles';
import service from '../../services/service';
import { Formik } from 'formik';
import {
  Container,
  Content,
  Item,
  Input,
  Label,
  Button,
  Text,
  View,
  Spinner,
  Toast,
  CheckBox,
  ListItem
} from 'native-base'
import HeaderBackButton from '@syntesis/mc-headers'
import general from '../../styles/general'

export default class Profile extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      user: [],
      loader: false,
      isChecked: false
    }
    this.findAProfile = this.findAProfile.bind(this)
  }

  componentDidMount() {
    this.findAProfile();
  }

  findAProfile = async () => {
    this.setState({ loader: true })
    this.setState()
    const configs = {
      url: 'api/person_users/whoami',
      params: {
        fields: 'id,name,name2,email,nameList,phone,cellPhone1'
      }
    }
    const response = await service.get(configs)
    this.setState({ user: response.data, loader: false })
  }

  handleSubmit = async (values) => {
    if (values.password !== '') {
      const configs = {
        url: 'api/person_users/whoami',
        params: {
          email: values.email,
          phone: values.phone,
          cellPhone1: values.cellPhone1,
          oldPassword: values.password,
          fields: 'id,name,name2,email,nameList,phone,cellPhone1',
        }
      }
      console.log(values)
      if (this.state.isChecked) {
        configs.params = {
          ...configs.params,
          newPassword: values.newPassword,
          confirmationPassword: values.newPassword2,
        }
      }

      const response = await service.post(configs)
      const isSuccess = response.data !== undefined
      Toast.show({
        text: !isSuccess ? 'Erro ao atualizar informações!' : 'Informações atualizados com sucesso!',
        position: 'bottom',
        type: !isSuccess ? 'danger' : 'success',
        textStyle: { fontSize: 15 },
        duration: 2000,
      })
      if (isSuccess) this.findAProfile()
    }
  }

  render() {
    const {
      name2,
      phone,
      cellPhone1,
      email
    } = this.state.user
    const isEmpty = this.state.user === []
    const isLoaded = this.state.loader
    return (
      <Container style={ isEmpty ? general.alignVertical : {} }>
        <HeaderBackButton
          styles={ styles }
          goBack={ () => this.props.navigation.goBack() }
          headerLabel="Perfil"
          statusBarColor="#09536F"
        />
        { isLoaded ?
          <View style={ general.alignHorizontal } >
            <Spinner color="#FA5239" />
          </View>
          :
          <Content padder>
            <Formik
              enableReinitialize
              initialValues={ {
                name2,
                phone,
                cellPhone1,
                email
              } }
              onSubmit={ (values) => {
                this.handleSubmit(values)
              } }
            >
              { ({ handleChange, handleSubmit, values }) => (
                <Content style={ styles.contentItems }>
                  <Item floatingLabel last style={ styles.item }>
                    <Label>Nome</Label>
                    <Input
                      style={ styles.input }
                      onChangeText={ handleChange('name2') }
                      name="name2"
                      value={ values.name2 }
                    />
                  </Item>
                  <Item floatingLabel last style={ styles.item }>
                    <Label>Telefone</Label>
                    <Input
                      style={ styles.input }
                      onChangeText={ handleChange('phone') }
                      name="phone"
                      value={ values.phone }
                    />
                  </Item>
                  <Item floatingLabel last style={ styles.item }>
                    <Label>Telefone celular</Label>
                    <Input
                      style={ styles.input }
                      onChangeText={ handleChange('cellPhone1') }
                      name="cellPhone1"
                      value={ values.cellPhone1 }
                    />
                  </Item>
                  <Item floatingLabel last style={ styles.item }>
                    <Label>E-mail</Label>
                    <Input
                      style={ styles.input }
                      onChangeText={ handleChange('email') }
                      name="email"
                      value={ values.email }
                    />
                  </Item>
                  <Item floatingLabel last style={ styles.item }>
                    <Label>Senha</Label>
                    <Input
                      secureTextEntry
                      style={ styles.input }
                      onChangeText={ handleChange('password') }
                      name="password"
                      value={ values.password }
                    />
                  </Item>
                  <ListItem button style={ styles.itemCheck }>
                    <Label>Deseja trocar a senha?</Label>
                    <CheckBox
                      color="#FA5239"
                      style={ styles.check }
                      checked={ this.state.isChecked }
                      onPress={ () => this.setState({ isChecked: !this.state.isChecked }) }
                    />
                  </ListItem>
                  { !this.state.isChecked ? <View /> :
                  <View>
                    <Item floatingLabel last style={ styles.item }>
                      <Label>Nova senha</Label>
                      <Input
                        secureTextEntry
                        style={ styles.input }
                        onChangeText={ handleChange('newPassword') }
                        name="resetPassword"
                        value={ values.newPassword }
                      />
                    </Item>
                    <Item floatingLabel last style={ styles.item }>
                      <Label>Repita a nova senha</Label>
                      <Input
                        secureTextEntry
                        style={ styles.input }
                        onChangeText={ handleChange('newPassword2') }
                        name="resetPassword2"
                        value={ values.newPassword2 }
                      />
                    </Item>
                  </View>
                  }
                  <Button
                    disabled={ !values.password }
                    style={ {
                      backgroundColor: !values.password ? '#BEBEBE' : '#FA5239',
                      marginTop: 20,
                    } }
                    block
                    onPress={ handleSubmit }
                  >
                    <Text>Salvar</Text>
                  </Button>
                </Content>
              ) }
            </Formik>
          </Content>
        }
      </Container>
    )
  }
}
