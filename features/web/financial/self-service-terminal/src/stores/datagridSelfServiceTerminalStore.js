import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'
// import { create } from 'mobx-persist'
// import get from 'lodash/get'

class DatagridSelfServiceTerminalStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'Financial/FinancialSalePoints',
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
          Header: 'Título',
          accessor: 'title',
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Identificador',
          accessor: 'identifier',
          searchable: true,
          searchOperation: 'contains',
          autoWidth: true
        },
        {
          Header: 'Ativo',
          accessor: 'active',
          Cell: BoolAsComponent,
          sortable: false,
          width: 80,
          style: {
            justifyContent: 'center'
          }
        }
      ]
    })
  }
}

// const hydrate = create({})
const store = new DatagridSelfServiceTerminalStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridSelfServiceTerminalStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
