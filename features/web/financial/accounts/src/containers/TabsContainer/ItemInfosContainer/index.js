import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import InfoTable from '@syntesis/c-info-table'
import CashRegisterIcon from '@syntesis/c-icons/src/CashRegisterIcon'
import BankIcon from '@syntesis/c-icons/src/BankIcon'
import { Colors } from '@syntesis/c-styles'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import { momentBackDateFormat, momentFriendlyDateFormat } from '@syntesis/c-pickers/src/utils'
import moment from 'moment/moment'

import styles from './styles'

class ItemInfosContainer extends Component {
  render() {
    const {
      classes,
      item: {
        code,
        description,
        type,
        companyPlace,
        bank,
        agency,
        agencyCheckDigit,
        account,
        accountCheckDigit,
        operation,
        post,
        openingBalance,
        signal,
        date,
        accountAccounting,
        accountAttendance,
        active
      }
    } = this.props

    let data = [
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
        ref: 'description',
        columns: [
          {
            value: 'Título',
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
        ref: 'companyPlace',
        columns: [
          {
            value: 'Local',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: get(companyPlace, 'description')
          }
        ]
      },
      {
        ref: 'type',
        columns: [
          {
            value: 'Tipo',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: type === 1
              ? (
                <div className={ classes.centerRow }>
                  <CashRegisterIcon style={ { color: Colors.primary } } />{' Caixa'}
                </div>
              )
              : (
                <div className={ classes.centerRow }>
                  <BankIcon style={ { color: Colors.greenCreate } } />{' Instituição Financeira'}
                </div>
              )
          }
        ]
      },
    ]

    if (type === 1) { // caso for caixa
      data = [
        ...data,
        {
          ref: 'accountAttendance',
          columns: [
            {
              value: 'Caixa Atendimento',
              props: {
                component: 'th',
                scope: 'row'
              }
            },
            {
              value: accountAttendance ? 'Sim' : 'Não'
            }
          ]
        },
      ]
    } else if (type === 2) { // caso for instituição financeira
      data = [
        ...data,
        {
          ref: 'bank',
          columns: [
            {
              value: 'Instituição financeira',
              props: {
                component: 'th',
                scope: 'row'
              }
            },
            {
              value: get(bank, 'name')
            }
          ]
        },
        {
          ref: 'agency',
          columns: [
            {
              value: 'Agência',
              props: {
                component: 'th',
                scope: 'row'
              }
            },
            {
              value: `${ agency }${ agencyCheckDigit ? `-${ agencyCheckDigit }` : '' }`
            }
          ]
        },
        {
          ref: 'account',
          columns: [
            {
              value: 'Conta',
              props: {
                component: 'th',
                scope: 'row'
              }
            },
            {
              value: `${ account }${ accountCheckDigit ? `-${ accountCheckDigit }` : '' }`
            }
          ]
        },
      ]

      if (operation) {
        data = [
          ...data,
          {
            ref: 'operation',
            columns: [
              {
                value: 'Operação',
                props: {
                  component: 'th',
                  scope: 'row'
                }
              },
              {
                value: operation
              }
            ]
          },
        ]
      }

      if (post) {
        data = [
          ...data,
          {
            ref: 'post',
            columns: [
              {
                value: 'Posto da cooperativa',
                props: {
                  component: 'th',
                  scope: 'row'
                }
              },
              {
                value: post
              }
            ]
          },
        ]
      }
    }

    data = [
      ...data,
      {
        ref: 'openingBalance',
        columns: [
          {
            value: 'Saldo inicial',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: formatMoney(openingBalance)
          }
        ]
      },
      {
        ref: 'signal',
        columns: [
          {
            value: 'Sinal',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: signal === '1' ? 'Débito' : 'Crédito'
          }
        ]
      },
      {
        ref: 'date',
        columns: [
          {
            value: 'Data saldo inicial',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: moment(date, momentBackDateFormat).format(momentFriendlyDateFormat)
          }
        ]
      },
      {
        ref: 'accountAccounting',
        columns: [
          {
            value: 'Conta contábil',
            props: {
              component: 'th',
              scope: 'row'
            }
          },
          {
            value: accountAccounting
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
