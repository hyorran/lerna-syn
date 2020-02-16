import React, { Component } from 'react';
import { Container, View, Text, ListItem, Body, Right, Icon, Spinner } from 'native-base'
import { FlatList } from 'react-native';
import service from '../../../services/service'


export default class SolicitationOpen extends Component {
  constructor(props) {
    super(props);
    this.getSolicitations = this.getSolicitations.bind(this)
    this.handlePressDetail = this.handlePressDetail.bind(this)
  }

    state = {
      solicitations: [],
    }

    componentDidMount() {
      //this.getSolicitations();
    }

    getSolicitations = async () => {
      const configs = {
        url: '/api/solicitations',
        params: {
          sort: 'protocol',
          status: 'open',
          order: 'ASC',
          limit: 20,
          page: 1,
          fields: 'protocol,assignment,incidentStatus',
        },
      }

      const response = await service.get(configs);
      this.setState({ solicitations: response.data })
    }

   handlePressDetail = (value) => {
     this.props.navigation.navigate('SolicitationDetail', { solicitation: value });
   }

   render() {
     return (
       <Container>
         <View>
           <FlatList
             data={ this.state.solicitations }
             renderItem={ ({ item }) =>
               (
                 <ListItem onPress={ () => { this.handlePressDetail(item) } }>
                   <Body>
                     <Text>{item.assignment.title}</Text>
                     <Text>Abertura: <Text note>{item.assignment.created}</Text></Text>
                     <Text>Prazo: <Text note>{item.assignment.finalDate}</Text></Text>
                     <Text note numberOfLines={ 2 }>{item.assignment.description}</Text>
                   </Body>
                   <Right style={ { marginLeft: -40 } }>
                     <Icon name="arrow-forward" />
                   </Right>
                 </ListItem>
               )
              }
             keyExtractor={ (item, index) => index.toString() }
           />
         </View>
       </Container>
     )
   }
}
