import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InfoTable from '@syntesis/c-info-table'

import styles from './styles'

class ItemInfosContainer extends Component {
  render() {
    const {
      // classes,
      item: {
        code,
        name,
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
        ref: 'name',
        columns: [
          {
            value: 'Descrição',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: name
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
