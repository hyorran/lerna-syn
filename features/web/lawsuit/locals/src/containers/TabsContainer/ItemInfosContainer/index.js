import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InfoTable from '@syntesis/c-info-table'
import searchBrazilStates from '@syntesis/c-functions/src/searchBrazilStates'

import styles from './styles'

class ItemInfosContainer extends Component {
  render() {
    const {
      // classes,
      item: {
        code,
        city,
        state,
        active
      }
    } = this.props

    const data = [
      {
        ref: 'code',
        columns: [
          {
            value: 'Código',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: code
          }
        ]
      },
      {
        ref: 'city',
        columns: [
          {
            value: 'Cidade',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: city
          }
        ]
      },
      {
        ref: 'state',
        columns: [
          {
            value: 'Estado',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: searchBrazilStates(state)
          }
        ]
      },
      {
        ref: 'active',
        columns: [
          {
            value: 'Ativo',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: active ? 'Sim' : 'Não'
          }
        ]
      }
    ]

    return (
      <InfoTable
        data={ data }
        paper={ false }
      />
    )
  }
}

ItemInfosContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemInfosContainer)
