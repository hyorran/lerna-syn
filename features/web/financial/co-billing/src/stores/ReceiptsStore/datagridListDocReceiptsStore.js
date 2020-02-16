import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment/moment'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import get from 'lodash/get'

class DatagridListDocReceiptsStore extends DatagridServerSideStore {
  constructor() {
    super({
      initialFetch: false,
      endpoint: 'financial/cobilling/getpageddocreceiptstitles',
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
}

const store = new DatagridListDocReceiptsStore()
export default store
