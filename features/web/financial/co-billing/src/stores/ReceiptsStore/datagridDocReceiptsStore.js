import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import moment from 'moment/moment'
import Typography from '@material-ui/core/Typography'
import { momentBackDateFormat } from '@syntesis/c-pickers/src/utils'
import find from 'lodash/find'
import reject from 'lodash/reject'

class DatagridDocReceiptsStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'financial/cobilling/getpageddocreceipts',
      period: {
        from: {
          apiKey: 'begin',
          value: moment().startOf('month').format(momentBackDateFormat)
        },
        to: {
          apiKey: 'end',
          value: moment().format(momentBackDateFormat)
        }
      },
      params: {
        OrderBy: [
          {
            PropertyName: 'transferDate',
            Dir: 'd'
          }
        ]
      },
      columns: [
        {
          Header: 'Dt. Transferência',
          accessor: 'transferDate',
          Cell: ({ value }) => (moment(value).isValid() ? moment(value).format('L') : '-'),
          exportValue: ({ value }) => (moment(value).isValid() ? (moment(value).format('L')) : '-'),
          searchable: false
        },
        {
          Header: 'Local',
          accessor: 'cobillingPlace.description',
          Cell: ({ value }) => (
            !isEmpty(value)
              ? (
                <Typography noWrap>{ value }</Typography>
              ) : '-'
          ),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Local de origem',
          accessor: 'originCompanyPlace.description',
          Cell: ({ value }) => (
            !isEmpty(value)
              ? (
                <Typography noWrap>{ value }</Typography>
              ) : '-'
          ),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Conta origem',
          accessor: 'originBankAccount.description',
          Cell: ({ value }) => (
            !isEmpty(value)
              ? (
                <Typography noWrap>{ value }</Typography>
              ) : '-'
          ),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Cliente',
          accessor: 'destinyCompanyPlace.description',
          Cell: ({ value }) => (
            !isEmpty(value)
              ? (
                <Typography noWrap>{ value }</Typography>
              ) : '-'
          ),
          searchable: true,
          searchOperation: 'contains',
        },
        {
          Header: 'Conta destino',
          accessor: 'destinyBankAccount.description',
          Cell: ({ value }) => (
            !isEmpty(value)
              ? (
                <Typography noWrap>{ value }</Typography>
              ) : '-'
          ),
          searchable: true,
          searchOperation: 'contains',
        },
        {
          Header: 'Títulos',
          accessor: 'occurrences',
          Cell: ({ value }) => (isNumber(value) ? value : '-'),
          searchable: false,
          sortable: false,
          width: 70,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Valor (R$)',
          accessor: 'value',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 120,
          style: {
            justifyContent: 'flex-end'
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
        PropertyName: 'transferDate'
      })
    }

    if (finalDate) {
      filterValues = reject(filterValues, { PropertyName: 'finalDate' })
      filterValues.push({
        ...finalDate,
        Value: `${ finalDate.Value } 23:59:59`,
        PropertyName: 'transferDate',
        Operation: 'LessThanOrEquals'
      })
    }
    return filterValues
  }
}

const store = new DatagridDocReceiptsStore()
export default store
