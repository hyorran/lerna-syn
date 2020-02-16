import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import isEmpty from 'lodash/isEmpty'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import moment from 'moment/moment'
import Typography from '@material-ui/core/Typography'
import { momentBackDateFormat } from '@syntesis/c-pickers/src/utils'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

class DatagridEntriesStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'financial/cobilling/getpagedentries',
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
            PropertyName: 'cobillingPlace',
            Dir: 'a'
          }
        ]
      },
      columns: [
        {
          Header: 'Local',
          accessor: 'cobillingPlace',
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
          accessor: 'cobillingCustomer',
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
          Header: 'Títulos',
          accessor: 'occurrences',
          searchable: false,
          width: 70,
          sortable: false,
          style: {
            justifyContent: 'flex-end'
          },
          getFooterProps: () => ({
            style: {
              fontWeight: Fonts.fontWeight.bold,
              textAlign: 'end'
            }
          })
        },
        {
          Header: 'Vlr. Total (R$)',
          accessor: 'totalValue',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 120,
          style: {
            justifyContent: 'flex-end'
          },
          getFooterProps: () => ({
            style: {
              fontWeight: Fonts.fontWeight.bold,
              textAlign: 'end'
            }
          })
        }
      ]
    })
  }
}

const store = new DatagridEntriesStore()
export default store
