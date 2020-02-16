import DatagridServerSideStore from '../../stores/DatagridServerSideStore'

class DatagridActobjectsStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'Lawsuit/Actobjects/GetDatagridInput',
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
          autoWidth: true
        },
        {
          Header: 'Título',
          accessor: 'name',
          searchable: true,
          searchOperation: 'contains'
        }
      ]
    })
  }
}

const store = new DatagridActobjectsStore()
export default store
