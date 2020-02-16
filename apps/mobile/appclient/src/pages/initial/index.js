import React, { Component } from 'react'
import { Container, Form, Label, Content, View } from 'native-base'
import styles from './styles'
import PickerItem from '@syntesis/mc-pickers'

export default class Initial extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      states: [
        { id: null, title: 'selecione' },
        { id: 1, title: 'maranhao' },
        { id: 2, title: 'mato grosso' },
        { id: 3, title: 'rio grande do sul' },
        { id: 4, title: 'sao paulo' },
        { id: 5, title: 'amapa' },
      ],
      cities: [
        { id: null, title: 'selecione' },
        { id: 1, title: 'salvador' },
        { id: 2, title: 'curitiba' },
        { id: 3, title: 'santa maria' },
        { id: 4, title: 'manaus' },
        { id: 5, title: 'Sao luiz gonzaga' },
      ],
      companies: [
        { id: null, title: 'selecione' },
        { id: 1, title: 'syntesis' },
        { id: 2, title: 'avato' },
        { id: 3, title: 'infotec' },
        { id: 4, title: 'qwerty' },
        { id: 5, title: 'sygo' },
      ],
      stateSelected: null,
      citySelected: null,
      companySelected: null
    }
  }

  handleCityChange = (value) => {
    this.setState({
      citySelected: value
    })
  }

  handleStateChange = (value) => {
    this.setState({
      stateSelected: value
    })
  }

  handleCompanyChange = (value) => {
    this.setState({
      companySelected: value
    })

    this.props.navigation.navigate('Login', this.state.companySelected)
  }

  render() {
    return (
      <Container style={ {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
      } }
      >
        <Content padder style={ styles.content }>
          <Label style={ styles.label }>
            Bem Vindo!
          </Label>
          <Form>
            <View style={ styles.item }>
              <PickerItem
                placeholder="Selecione um estado"
                styles={ styles }
                text="Estado:"
                selectedValue={ this.state.stateSelected }
                onValueChange={ this.handleStateChange }
                listItem={ this.state.states }
              />
            </View>
            {this.state.stateSelected &&
              <View style={ styles.item }>
                <PickerItem
                  placeholder="Selecione uma cidade"
                  styles={ styles }
                  text="Cidade:"
                  selectedValue={ this.state.citySelected }
                  onValueChange={ this.handleCityChange }
                  listItem={ this.state.cities }
                />
              </View>
            }
            {this.state.citySelected &&
              <View style={ styles.item }>
                <PickerItem
                  placeholder="Selecione uma empresa"
                  styles={ styles }
                  text="Empresa:"
                  selectedValue={ this.state.companySelected }
                  onValueChange={ this.handleCompanyChange }
                  listItem={ this.state.companies }
                />
              </View>
            }
          </Form>
        </Content>
      </Container>
    )
  }
}
