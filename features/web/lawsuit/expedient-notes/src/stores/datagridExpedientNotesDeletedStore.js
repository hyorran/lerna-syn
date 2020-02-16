import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import find from 'lodash/find'
import reject from 'lodash/reject'
import moment from 'moment/moment'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'
import Typography from '@material-ui/core/Typography'
// import { create } from 'mobx-persist'

class DatagridExpedientNotesDeletedStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'Lawsuit/LawsuitExpedientNotes/GetDeleted',
      params: {
        OrderBy: [
          {
            PropertyName: 'modified',
            Dir: 'd'
          }
        ]
      },
      columns: [
        {
          Header: 'Nº Processo',
          accessor: 'rawProcessNumber',
          Cell: ({ value }) => (!isEmpty(value) ? value : '-'),
          exportValue: ({ value }) => (!isEmpty(value) ? value : '-'),
          searchable: true,
          searchOperation: 'contains',
          autoWidth: true
        },
        {
          Header: 'Evento',
          accessor: 'rawEvent',
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
          Header: 'Data Exclusão',
          accessor: 'modified',
          Cell: ({ value }) => moment(value).format('L'),
          exportValue: ({ value }) => moment(value).format('L'),
          sortable: false,
          autoWidth: true
        },
        {
          Header: 'Vínculo',
          accessor: 'lawsuitId',
          Cell: BoolAsComponent,
          exportValue: ({ value }) => (isNumber(value) ? 'Sim' : 'Não'),
          sortable: false,
          width: 70,
          style: {
            justifyContent: 'center'
          }
        }
      ]
    })
  }

  transformDataToFilter = (filterValues) => {
    const modified = find(filterValues, { PropertyName: 'modified' })

    if (!isEmpty(modified)) {
      filterValues = reject(filterValues, { PropertyName: 'modified' })
      filterValues.push({
        ...modified,
        Value: `${ modified.Value } 00:00:00`,
        PropertyName: 'modified',
        Operation: 'GreaterThanOrEquals'
      }, {
        ...modified,
        Value: `${ modified.Value } 23:59:59`,
        PropertyName: 'modified',
        Operation: 'LessThanOrEquals'
      })
    }

    return filterValues
  }
}

// const hydrate = create({})
const store = new DatagridExpedientNotesDeletedStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridExpedientNotesDeletedStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
