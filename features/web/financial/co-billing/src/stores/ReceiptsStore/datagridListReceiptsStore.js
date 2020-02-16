import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment/moment'
import find from 'lodash/find'
import reject from 'lodash/reject'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import get from 'lodash/get'

class DatagridListReceiptsStore extends DatagridServerSideStore {
  constructor() {
    super({
      initialFetch: false,
      endpoint: 'financial/cobilling/getpagedreceiptstitles',
      params: {
        OrderBy: [
          {
            PropertyName: 'receiptDate',
            Dir: 'a'
          }
        ]
      },
      columns: [
        {
          Header: 'Dt. Receb.',
          accessor: 'receiptDate',
          Cell: ({ value }) => (moment(value).isValid() ? moment(value).format('L') : '-'),
          exportValue: ({ value }) => (moment(value).isValid() ? (moment(value).format('L')) : '-'),
          searchable: false,
          width: 120
        },
        {
          Header: 'Cliente',
          accessor: 'financialReceivableTitle.billTitle.client.name',
          Cell: ({ value, original }) =>
            (!isEmpty(get(original, 'financialReceivableTitle.billTitle.client.name2'))
              ? get(original, 'financialReceivableTitle.billTitle.client.name2')
              : value
            ),
          sortable: false,
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Nr. Título',
          accessor: 'financialReceivableTitle.title',
          Cell: ({ value, original }) => (!isEmpty(value) ? `${ value }/${ original.financialReceivableTitle.parcel }` : '-'),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Fatura',
          accessor: 'financialReceivableTitle.billTitle.title',
          Cell: ({ value, original }) => (!isEmpty(value) ? `${ value }/${ original.financialReceivableTitle.billTitle.parcel }` : '-'),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Vlr. Original (R$)',
          accessor: 'amount',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 110,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Vlr. Multa (R$)',
          accessor: 'fineAmount',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 110,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Vlr. Juros (R$)',
          accessor: 'increaseAmount',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 110,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Vlr. Desconto (R$)',
          accessor: 'discountValue',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 110,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Vlr. Total (R$)',
          accessor: 'totalAmount',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 110,
          style: {
            justifyContent: 'flex-end'
          }
        }
      ]
    })
  }

  transformDataToFilter = (filterValues) => {
    const receiptDate = find(filterValues, { PropertyName: 'receiptDate' })

    if (!isEmpty(receiptDate)) {
      filterValues = reject(filterValues, { PropertyName: 'receiptDate' })
      filterValues.push({
        ...receiptDate,
        Value: `${ receiptDate.Value } 00:00:00`,
        PropertyName: 'receiptDate',
        Operation: 'GreaterThanOrEquals'
      }, {
        ...receiptDate,
        Value: `${ receiptDate.Value } 23:59:59`,
        PropertyName: 'receiptDate',
        Operation: 'LessThanOrEquals'
      })
    }

    return filterValues
  }
}

const store = new DatagridListReceiptsStore()
export default store
