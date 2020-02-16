import React from 'react'
import Typography from '@material-ui/core/Typography'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'

class DatagridFinancialInstitutionsStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'Financial/Banks',
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
          width: 100,
          style: {
            justifyContent: 'left'
          }
        },
        {
          Header: 'Nome',
          accessor: 'name',
          searchable: true,
          searchOperation: 'contains',
          Cell: ({ value }) => <Typography noWrap>{ value }</Typography>,
          style: {
            justifyContent: 'left'
          }
        },
        {
          Header: 'Nome extenso',
          accessor: 'registeredName',
          searchable: true,
          searchOperation: 'contains',
          Cell: ({ value }) => <Typography noWrap>{ value }</Typography>,
          style: {
            justifyContent: 'left'
          }
        },
        {
          Header: 'Cód. Banco Central',
          accessor: 'centralBankCode',
          searchable: true,
          searchOperation: 'contains',
          autoWidth: true,
          Cell: ({ value }) => (value ? <Typography noWrap>{ value }</Typography> : '-'),
          style: {
            justifyContent: 'left'
          }
        },
        {
          Header: 'Ativo',
          accessor: 'active',
          Cell: BoolAsComponent,
          // sortable: false,
          width: 70,
          style: {
            justifyContent: 'center'
          }
        }
      ]
    })
  }
}

const store = new DatagridFinancialInstitutionsStore()

export default store
