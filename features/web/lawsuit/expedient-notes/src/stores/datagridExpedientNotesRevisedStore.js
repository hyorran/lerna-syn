import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
// import get from 'lodash/get'
import moment from 'moment/moment'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'
import Typography from '@material-ui/core/Typography'
// import { create } from 'mobx-persist'

class DatagridExpedientNotesRevisedStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'Lawsuit/LawsuitExpedientNotes/GetRevised',
      params: {
        OrderBy: [
          {
            PropertyName: 'revisedDate',
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
          autoWidth: true
        },
        {
          Header: 'Data Rev.',
          accessor: 'revisedDate',
          Cell: ({ value }) => moment(value).format('L'),
          exportValue: ({ value }) => moment(value).format('L'),
          searchable: false,
          sortable: true,
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
const store = new DatagridExpedientNotesRevisedStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridExpedientNotesRevisedStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
