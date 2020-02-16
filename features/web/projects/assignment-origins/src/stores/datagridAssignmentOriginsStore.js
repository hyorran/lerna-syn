import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'
import Typography from '@material-ui/core/Typography'
import isEmpty from 'lodash/isEmpty'
// import { create } from 'mobx-persist'
// import get from 'lodash/get'

class DatagridAssignmentOriginsStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'Projects/AssignmentOrigins',
      params: {
        OrderBy: [
          {
            PropertyName: 'code',
            Dir: 'a'
          }
        ]
      },
      columns: [
        {
          Header: 'Código',
          accessor: 'code',
          searchable: true,
          searchOperation: 'contains',
          width: 100
        },
        {
          Header: 'Descrição',
          accessor: 'description',
          Cell: ({ value }) => (<Typography noWrap>{ value }</Typography>),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Módulo',
          accessor: 'module.name',
          Cell: ({ value }) => (!isEmpty(value) ? value : '-'),
          exportValue: ({ value }) => (!isEmpty(value) ? value : '-'),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Ativo',
          accessor: 'active',
          Cell: BoolAsComponent,
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
const store = new DatagridAssignmentOriginsStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridAssignmentOriginsStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
