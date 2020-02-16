import React, { Component } from 'react';
import { Container, Text, Fab, Icon, Segment, Button, Spinner } from 'native-base'
import Close from './close';
import Open from './open';

export default class Solicitation extends Component {
  constructor(props) {
    super(props);
    this.handlePressNew = this.handlePressNew.bind(this)
  }

  state = {
    selected: 1,
  }

  handlePressNew = () => (
    this.props.navigation.navigate('SolicitationNew')
  )

  render() {
    return (
      <Container>
        <Segment style={ { backgroundColor: '#F5FCFF' } }>
          <Button
            first
            style={ {
              backgroundColor: this.state.selected === 1 ? '#FA5239' : '#F5FCFF',
              borderColor: this.state.selected === 1 ? '#FA5239' : '#09536F',
            } }
            active={ this.state.selected === 1 }
            onPress={ () => this.setState({ selected: 1 }) }
          >
            <Text
              style={ {
                color: this.state.selected === 1 ? '#fff' : '#09536F',
              } }
            >
              Abertas
            </Text>
          </Button>
          <Button
            last
            style={ {
              backgroundColor: this.state.selected === 2 ? '#FA5239' : '#F5FCFF',
              borderColor: this.state.selected === 2 ? '#FA5239' : '#09536F',
            } }
            active={ this.state.selected === 2 }
            onPress={ () => this.setState({ selected: 2 }) }
          >
            <Text
              style={ {
                color: this.state.selected === 2 ? '#fff' : '#09536F',
              } }
            >
              Fechadas
            </Text>
          </Button>
        </Segment>
        {this.state.selected === 1 ?
          <Open { ...this.props } /> :
          <Close { ...this.props } />}
        <Fab
          active={ false }
          direction="up"
          containerStyle={ { } }
          style={ { backgroundColor: '#FA5239' } }
          position="bottomRight"
          onPress={ this.handlePressNew }
        >
          <Icon type="FontAwesome5" name="plus" />
        </Fab>
      </Container>
    )
  }
}
