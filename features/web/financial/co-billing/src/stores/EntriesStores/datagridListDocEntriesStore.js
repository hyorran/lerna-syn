import isEmpty from 'lodash/isEmpty'
import isNull from 'lodash/isNull'
import moment from 'moment/moment'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import find from 'lodash/find'
import reject from 'lodash/reject'
import get from 'lodash/get'

class DatagridListDocEntriesStore extends DatagridServerSideStore {
  constructor() {
    super({
      initialFetch: false,
      endpoint: 'financial/cobilling/getpageddocentriestitles',
      params: {
        OrderBy: [
          {
            PropertyName: 'issueDate',
            Dir: 'a'
          }
        ],
      },
      columns: [
        {
          Header: 'Dt. Emissão',
          accessor: 'issueDate',
          Cell: ({ value }) => (moment(value).isValid() ? (moment(value).format('L')) : '-'),
          exportValue: ({ value }) => (moment(value).isValid() ? (moment(value).format('L')) : '-'),
          searchable: false,
          width: 120
        },
        {
          Header: 'Cliente',
          accessor: 'billTitle.client.name',
          Cell: ({ value, original }) =>
            (!isEmpty(get(original, 'billTitle.client.name2'))
              ? get(original, 'billTitle.client.name2')
              : value
            ),
          sortable: false,
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Título',
          accessor: 'title',
          Cell: ({ value, original }) => (!isEmpty(value) ? `${ value }/${ original.parcel }` : '-'),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Fatura',
          accessor: 'billTitle.title',
          Cell: ({ value, original }) => (!isEmpty(value) ? `${ value }/${ original.billTitle.parcel }` : '-'),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Tipo de Cobrança',
          accessor: 'billTitle.financialCollectionType.title',
          Cell: ({ value }) => (!isEmpty(value) ? value : '-'),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Vlr. Total (R$)',
          accessor: 'titleAmount',
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
    const issueDate = find(filterValues, { PropertyName: 'issueDate' })

    if (!isEmpty(issueDate)) {
      filterValues = reject(filterValues, { PropertyName: 'issueDate' })
      filterValues.push({
        ...issueDate,
        Value: `${ issueDate.Value } 00:00:00`,
        PropertyName: 'issueDate',
        Operation: 'GreaterThanOrEquals'
      }, {
        ...issueDate,
        Value: `${ issueDate.Value } 23:59:59`,
        PropertyName: 'issueDate',
        Operation: 'LessThanOrEquals'
      })
    }

    return filterValues
  }
}

const store = new DatagridListDocEntriesStore()
export default store
