import DatagridServerSideStore from '../../stores/DatagridServerSideStore'

class DatagridJudgementsStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'Lawsuit/Judgements/GetDatagridInput',
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

const store = new DatagridJudgementsStore()
export default store
