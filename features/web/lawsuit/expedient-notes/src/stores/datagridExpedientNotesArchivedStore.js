import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import moment from 'moment/moment'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'
import Typography from '@material-ui/core/Typography'
// import get from 'lodash/get'
// import { create } from 'mobx-persist'

class DatagridExpedientNotesArchivedStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'Lawsuit/LawsuitExpedientNotes/GetArchived',
      params: {
        OrderBy: [
          {
            PropertyName: 'filedDate',
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
          Header: 'Data Arquiv.',
          accessor: 'filedDate',
          Cell: ({ value }) => moment(value).format('L'),
          exportValue: ({ value }) => moment(value).format('L'),
          sortable: true,
          searchOperation: 'equals',
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
}

// const hydrate = create({})
const store = new DatagridExpedientNotesArchivedStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridExpedientNotesArchivedStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
