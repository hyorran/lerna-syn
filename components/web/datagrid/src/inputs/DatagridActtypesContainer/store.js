import DatagridServerSideStore from '../../stores/DatagridServerSideStore'

class DatagridActtypesStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'Lawsuit/Acttypes/GetDatagridInput',
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

const store = new DatagridActtypesStore()
export default store
