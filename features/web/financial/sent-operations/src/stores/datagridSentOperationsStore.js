import React from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment/moment'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import CardBrand from '@syntesis/c-card-brand'
import Typography from '@material-ui/core/Typography'
import Colors from '@syntesis/c-styles/src/styles/Colors'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import find from 'lodash/find'
import reject from 'lodash/reject'

class DatagridSentOperationsStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'synpaygw/sentoperations',
      params: {
        OrderBy: [
          {
            PropertyName: 'created',
            Dir: 'd'
          }
        ]
      },
      columns: [
        {
          Header: 'Data',
          accessor: 'created',
          Cell: ({ value }) => moment(value).format('L'),
          exportValue: ({ value }) => moment(value).format('L'),
          // searchable: false,
          sortable: true,
          width: 85
        },
        {
          Header: 'Identificador',
          accessor: 'orderId',
          searchable: true,
          searchOperation: 'contains',
          width: 118
        },
        {
          Header: 'Nsu',
          accessor: 'feedbackData.nsu',
          Cell: ({ value }) => (!isEmpty(value) ? value : '-'),
          exportValue: ({ value }) => (!isEmpty(value) ? value : '-'),
          // searchable: true,
          sortable: false,
          searchOperation: 'contains',
          autoWidth: true
        },
        {
          Header: 'Cód. Autorização',
          accessor: 'feedbackData.authorizationCode',
          Cell: ({ value }) => (!isEmpty(value) ? value : '-'),
          exportValue: ({ value }) => (!isEmpty(value) ? value : '-'),
          // searchable: true,
          sortable: false,
          searchOperation: 'contains',
          autoWidth: true
        },
        {
          Header: 'Modalidade',
          accessor: 'isCredit',
          Cell: ({ value }) => (value ? 'Crédito' : 'Débito'),
          exportValue: ({ value }) => (value ? 'Crédito' : 'Débito'),
          // searchable: true,
        },
        {
          Header: 'Nº Parcelas',
          accessor: 'installments',
          Cell: ({ value }) => (value != null ? `${ value }x` : '-'),
          exportValue: ({ value }) => (value != null ? `${ value }x` : '-'),
          // searchable: true,
          width: 112
        },
        {
          Header: 'Valor Total (R$)',
          accessor: 'total',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchOperation: 'contains',
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Tipo de Operação',
          accessor: 'operationTypeId',
          Cell: ({ value }) => {
            const typographyStyle = {
              fontWeight: 'bold'
            }
            switch (value) {
              case 1:
                typographyStyle.color = Colors.primary
                return <Typography style={ typographyStyle }>Pagamento</Typography>
              case 2:
                typographyStyle.color = Colors.secondary
                return <Typography style={ typographyStyle }>Cancelamento</Typography>
              default:
                return '-'
            }
          },
          exportValue: ({ value }) => {
            switch (value) {
              case 1:
                return ('Pagamento')
              case 2:
                return ('Cancelamento')
              default:
                return '-'
            }
          },
          searchOperation: 'contains'
        },
        {
          Header: 'Situação',
          accessor: 'status',
          Cell: ({ value }) => {
            const typographyStyle = {
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 13
            }
            const divStyle = {
              paddingTop: 2,
              paddingBottom: 1,
              width: '100%',
              textAlign: 'center',
              borderRadius: 5
            }
            switch (value) {
              case 0:
                divStyle.backgroundColor = Colors.warning.main
                return (
                  <div style={ divStyle }>
                    <Typography style={ typographyStyle }>
                      Aguardando
                    </Typography>
                  </div>
                )
              case 1:
                divStyle.backgroundColor = Colors.success.main
                return (
                  <div style={ divStyle }>
                    <Typography style={ typographyStyle }>
                      Autorizado
                    </Typography>
                  </div>
                )
              case 2:
                divStyle.backgroundColor = Colors.error.main
                return (
                  <div style={ divStyle }>
                    <Typography style={ typographyStyle }>
                      Negado
                    </Typography>
                  </div>
                )
              default:
                return ''
            }
          },
          exportValue: ({ value }) => {
            switch (value) {
              case 0:
                return ('Aguardando')
              case 1:
                return ('Autorizado')
              case 2:
                return ('Negado')
              default:
                return '-'
            }
          },
          // searchable: true,
          sortable: true,
          style: {
            justifyContent: 'center'
          }
        },
        {
          Header: 'Cartão',
          accessor: 'cardSettings',
          // eslint-disable-next-line react/prop-types
          Cell: ({ value }) => {
            const brandId = get(value, 'brandId')
            return <CardBrand brandId={ brandId } />
          },
          exportValue: ({ value }) => {
            const brandId = get(value, 'brandId')
            switch (brandId) {
              case 1:
                return ('Visa')
              case 2:
                return ('Mastercard')
              case 3:
                return ('Amex')
              case 4:
                return ('Elo')
              case 5:
                return ('Aura')
              case 6:
                return ('Diners')
              case 7:
                return ('Discover')
              case 8:
                return ('Jcb')
              case 11:
                return ('Hipercard')
              case 12:
                return ('Banricompras')
              case 13:
                return ('Banricard')
              default:
                return '-'
            }
          },
          // searchable: false,
          sortable: false,
          width: 100,
          style: {
            justifyContent: 'center'
          }
        }
      ]
    })
  }

  transformDataToFilter = (filterValues) => {
    const initialDate = find(filterValues, { PropertyName: 'initialDate' })
    const finalDate = find(filterValues, { PropertyName: 'finalDate' })

    if (initialDate) {
      filterValues = reject(filterValues, { PropertyName: 'initialDate' })
      filterValues.push({
        ...initialDate,
        PropertyName: 'created'
      })
    }

    if (finalDate) {
      filterValues = reject(filterValues, { PropertyName: 'finalDate' })
      filterValues.push({
        ...finalDate,
        Value: `${ finalDate.Value } 23:59:59`,
        PropertyName: 'created',
        Operation: 'LessThanOrEquals'
      })
    }
    return filterValues
  }
}

const store = new DatagridSentOperationsStore()
export default store
