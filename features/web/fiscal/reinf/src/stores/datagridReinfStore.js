import React from 'react'
// import get from 'lodash/get'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import Typography from '@material-ui/core/Typography'
// import DatagridCompetenciesContainer from '../containers/DatagridCompetenciesContainer'

// import { create } from 'mobx-persist'

class DatagridReinfStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'suite/companiesplaces/gettoreinf',
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
          filterOperation: 'contains',
          width: 100,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Local',
          accessor: 'description',
          // eslint-disable-next-line react/prop-types
          Cell: ({ value }) => (
            <Typography noWrap>{ value }</Typography>
          ),
          // exportValue: ({ value }) => camelCase(value),
          searchable: true,
          searchOperation: 'contains',
          filterOperation: 'contains'
        }
      ]
    })
  }
  keepActiveRowIndex = true
}

// const hydrate = create({})
const store = new DatagridReinfStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridReinfStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
