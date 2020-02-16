import React, { Component } from 'react';
import { Container, Text, Button, Segment } from 'native-base';
import Levies from './levies';
import Payments from './payments';
import { Colors } from '@syntesis/c-styles'

export default class LeviesAndPayments extends Component {
  state = {
    selected: 1
  }

  btnStyle = option => ({
    backgroundColor: this.state.selected === option ? Colors.secondary : '#F5FCFF',
    borderColor: this.state.selected === option ? Colors.secondary : Colors.primary
  })

  textStyle = option => ({
    color: this.state.selected === option ? Colors.white : Colors.primary,
  })

  render() {
    return (
      <Container>
        <Segment style={ { backgroundColor: '#F5FCFF' } }>
          <Button
            first
            style={ this.btnStyle(1) }
            active={ this.state.selected === 1 }
            onPress={ () => this.setState({ selected: 1 }) }
          >
            <Text style={ this.textStyle(1) }>
              Cobranças
            </Text>
          </Button>
          <Button
            last
            style={ this.btnStyle(2) }
            active={ this.state.selected === 2 }
            onPress={ () => this.setState({ selected: 2 }) }
          >
            <Text style={ this.textStyle(2) }>
              Pagamentos
            </Text>
          </Button>
        </Segment>
        {this.state.selected === 1 ? <Levies /> : <Payments />}
      </Container>
    )
  }
}
