import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
// import get from 'lodash/get'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'
import Typography from '@material-ui/core/Typography'
// import { create } from 'mobx-persist'

class DatagridExpedientNotesStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'Lawsuit/LawsuitExpedientNotes',
      params: {
        OrderBy: [
          {
            PropertyName: 'id',
            Dir: 'd'
          }
        ]
      },
      columns: [
        {
          Header: 'Nº Processo',
          accessor: 'rawProcessNumber',
          Cell: ({ value }) => (!isEmpty(value) ? value : '-'),
          searchable: true,
          searchOperation: 'contains',
          autoWidth: true
        },
        {
          Header: 'Evento',
          accessor: 'rawEvent',
          Cell: ({ value }) => (!isEmpty(value) ? (<Typography noWrap>{ value }</Typography>) : '-'),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Atividades',
          accessor: 'assignments',
          Cell: ({ value }) => (
            value > 0
              ? `${ value > 1 ? `${ value } atividades` : `${ value } atividade` }`
              : 'Nenhuma'
          ),
          exportValue: ({ value }) => (
            value > 0
              ? `${ value > 1 ? `${ value } atividades` : `${ value } atividade` }`
              : 'Nenhuma'
          ),
          searchable: false,
          sortable: false,
          width: 100
        },
        {
          Header: 'Vínculo',
          accessor: 'lawsuitId',
          Cell: BoolAsComponent,
          exportValue: ({ value }) => (isNumber(value) ? 'Sim' : 'Não'),
          searchable: false,
          sortable: false,
          width: 90,
          style: {
            justifyContent: 'center'
          }
        },
      ]
    })
  }
}

// const hydrate = create({})
const store = new DatagridExpedientNotesStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridExpedientNotesStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
