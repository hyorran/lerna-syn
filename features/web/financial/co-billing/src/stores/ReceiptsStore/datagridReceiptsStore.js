import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import isEmpty from 'lodash/isEmpty'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import moment from 'moment/moment'
import Typography from '@material-ui/core/Typography'
import { momentBackDateFormat } from '@syntesis/c-pickers/src/utils'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

class DatagridReceiptsStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'financial/cobilling/getpagedreceipts',
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
          searchOperation: 'contains',
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
          Header: 'Vlr. Original (R$)',
          accessor: 'originalAmount',
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
        },
        {
          Header: 'Vlr. Multa (R$)',
          accessor: 'totalFineAmount',
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
        },
        {
          Header: 'Vlr. Juros (R$)',
          accessor: 'totalIncreaseAmount',
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
        },
        {
          Header: 'Vlr. Desconto (R$)',
          accessor: 'totalDiscounts',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 110,
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

  // transformDataToFilter = (filterValues) => {
  //   const initialDate = find(filterValues, { PropertyName: 'initialDate' })
  //   const finalDate = find(filterValues, { PropertyName: 'finalDate' })
  //
  //   if (initialDate) {
  //     filterValues = reject(filterValues, { PropertyName: 'initialDate' })
  //     filterValues.push({
  //       ...initialDate,
  //       PropertyName: 'receiptDate'
  //     })
  //   }
  //
  //   if (finalDate) {
  //     filterValues = reject(filterValues, { PropertyName: 'finalDate' })
  //     filterValues.push({
  //       ...finalDate,
  //       PropertyName: 'receiptDate'
  //     })
  //   }
  //
  //   return filterValues
  // }
}

const store = new DatagridReceiptsStore()
export default store
