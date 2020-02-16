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
        registeredName,
        reserveTransferSystemParticipant,
        centralBankCode,
        identifierBrazilianPaymentSystem,
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
            value: 'Nome',
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
        ref: 'registeredName',
        columns: [
          {
            value: 'Nome extenso',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: registeredName
          }
        ]
      },
      {
        ref: 'reserveTransferSystemParticipant',
        columns: [
          {
            value: 'Participante STR',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: reserveTransferSystemParticipant ? 'Sim' : 'Não'
          }
        ]
      },
      {
        ref: 'centralBankCode',
        columns: [
          {
            value: 'Código Banco Central',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: centralBankCode
          }
        ]
      },
      {
        ref: 'identifierBrazilianPaymentSystem',
        columns: [
          {
            value: 'Identificador do participante (ISPB)',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: identifierBrazilianPaymentSystem
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
