import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'
import Typography from '@material-ui/core/Typography'
// import { create } from 'mobx-persist'
// import get from 'lodash/get'

class DatagridActtypesStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'Lawsuit/Acttypes',
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
          accessor: 'name',
          Cell: ({ value }) => (<Typography noWrap>{ value }</Typography>),
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
const store = new DatagridActtypesStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridActtypesStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
