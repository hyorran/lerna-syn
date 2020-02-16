import React, { Component } from 'react'
import {
  Container,
  Content,
  Input,
  Item,
  Text,
  Button,
  Label,
  Icon,
  Toast,
  Spinner,
} from 'native-base'
import { Image, StatusBar } from 'react-native'
import service from '../../services/service';
import styles from './styles';
import { Formik } from 'formik';
import * as yup from 'yup'

export default class Login extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props)
    this.state = { loader: false }
    this.handleLoginPress = this.handleLoginPress.bind(this)
    this.handleForgotPasswordPress = this.handleForgotPasswordPress.bind(this)
  }

  handleLoginPress = async (values) => {
    this.setState({ loader: true })
    const response = await service.login(values.username, values.password)
    this.setState({ loader: false })
    if (!response) {
      Toast.show({
        text: 'Nome de usuário ou senha incorretos!',
        position: 'bottom',
        type: 'danger',
        textStyle: { fontSize: 15 },
        duration: 2000,
      })
    } else {
      this.props.navigation.navigate('Home')
    }
  };

  handleForgotPasswordPress = async () => {
    this.props.navigation.navigate('ForgotPassword')
  };

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Content>
          <Formik
            initialValues={ { username: '', password: '' } }
            onSubmit={ values => this.handleLoginPress(values) }
            validationSchema={ yup.object().shape({
              username: yup
                .string()
                .required('Nome de usuário precisa ser preenchido.'),
              password: yup
                .string()
                .required('Senha precisa ser preenchida.'),
            }) }
          >
            {({
                values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit
              }) => (
                <Content style={ styles.contentItems }>
                  <Image
                    style={ styles.image }
                    source={ require('../../assets/syntesis.png') }
                    resizeMode="contain"
                  />
                  <Item floatingLabel error={ touched.username && values.username === '' }>
                    <Label>Nome de Usuário</Label>
                    <Input
                      autoCapitalize="none"
                      value={ values.username }
                      onChangeText={ handleChange('username') }
                      onBlur={ () => setFieldTouched('username') }
                    />
                    {touched.username && values.username === '' && <Icon active name="close-circle" />}
                  </Item>
                  <Item style={ { marginTop: 20 } } floatingLabel error={ touched.password && values.password === '' }>
                    <Label>Senha</Label>
                    <Input
                      autoCapitalize="none"
                      value={ values.password }
                      onChangeText={ handleChange('password') }
                      onBlur={ () => setFieldTouched('password') }
                      secureTextEntry
                    />
                    {touched.password && values.password === '' && <Icon active name="close-circle" />}
                  </Item>
                  <Button
                    block
                    style={ [{ backgroundColor: isValid ? '#FA5239' : '#BEBEBE' }, styles.button] }
                    disabled={ !isValid }
                    onPress={ handleSubmit }
                  >
                    <Text>Entrar</Text>
                  </Button>
                  <Button block transparent onPress={ this.handleForgotPasswordPress }>
                    <Text style={ { color: '#FA5239' } }>Esqueceu a senha?</Text>
                  </Button>
                </Content>
            )}
          </Formik>
          { this.state.loader ? <Spinner color="#FA5239" /> : <Text /> }
        </Content>
      </Container>
    );
  }
}
