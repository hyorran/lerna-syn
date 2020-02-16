import React from 'react'
import map from 'lodash/map'
import upperCase from 'lodash/upperCase'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import Typography from '@material-ui/core/Typography'
// import { create } from 'mobx-persist'
// import get from 'lodash/get'

class DatagridPaymentMethodStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'Financial/PaymentForms',
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
          searchOperation: 'contains',
          autoWidth: true
        },
        {
          Header: 'Descrição',
          accessor: 'description',
          Cell: ({ value }) => (<Typography noWrap>{ value }</Typography>),
          sortable: false
        }
      ]
    })
  }

  // transformSearchFilter(filtersArr) {
  //   return map(filtersArr, (filterObj) => {
  //     if (filterObj.PropertyName === 'title') {
  //       return {
  //         ...filterObj,
  //         Value: upperCase(filterObj.Value)
  //       }
  //     }
  //     return filterObj
  //   })
  // }
}

// const hydrate = create({})
const store = new DatagridPaymentMethodStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridPaymentMethodStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
