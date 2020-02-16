import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InfoTable from '@syntesis/c-info-table'
import moment from 'moment/moment'

import styles from './styles'

class ItemInfosContainer extends Component {
  render() {
    const {
      // classes,
      item: {
        title,
        description,
        responsibleName,
        requestorName,
        progress,
        finalDate,
        priority,
      }
    } = this.props

    const data = [
      {
        ref: 'title',
        columns: [
          {
            value: 'Informações',
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
        ref: 'description',
        columns: [
          {
            value: 'Descrição',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: description
          }
        ]
      },
      {
        ref: 'responsibleName',
        columns: [
          {
            value: 'Equipe/Resp.',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: responsibleName
          }
        ]
      },
      {
        ref: 'requestorName',
        columns: [
          {
            value: 'Solicitante',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: requestorName
          }
        ]
      },
      {
        ref: 'progress',
        columns: [
          {
            value: 'Progresso',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: progress.toString().concat('%')
          }
        ]
      },
      {
        ref: 'finalDate',
        columns: [
          {
            value: 'Prazo',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: moment(finalDate).format('L')
          }
        ]
      },
      {
        ref: 'priority',
        columns: [
          {
            value: 'Prioridade',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: priority
          }
        ]
      },
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
