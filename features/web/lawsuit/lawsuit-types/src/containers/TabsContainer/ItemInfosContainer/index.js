import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import get from 'lodash/get'
import last from 'lodash/last'
import { withStyles } from '@material-ui/core/styles'
import InfoTable from '@syntesis/c-info-table'

import styles from './styles'

class ItemInfosContainer extends Component {
  render() {
    const {
      // classes,
      item: {
        code,
        title,
        lawsuitTypesStages,
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
        ref: 'title',
        columns: [
          {
            value: 'Título',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: title
          }
        ]
      },
      {
        ref: 'lawsuitTypesStages',
        columns: [
          {
            value: 'Fases',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: !isEmpty(lawsuitTypesStages)
              ? (
                map(
                  lawsuitTypesStages,
                  item => (
                    last(lawsuitTypesStages) === item
                      ? `${ get(item, 'label') }`
                      : `${ get(item, 'label') },\n`
                  )
                )
              ) : '-'
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
