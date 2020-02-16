import DatagridServerSideStore from '../../stores/DatagridServerSideStore'
import get from 'lodash/get'

class DatagridPeopleStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'Suite/People',
      params: {
        OrderBy: [
          {
            PropertyName: 'name',
            Dir: 'a'
          }
        ]
      },
      columns: [
        {
          Header: 'Nome',
          accessor: 'name',
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'CPF/CNPJ',
          accessor: 'txId',
          Cell: (_ref) => {
            const { original } = _ref
            const value = get(original, 'txIdFormated', '')
            return value
          },
          searchable: true,
          searchOperation: 'contains',
          autoWidth: true
        },
        {
          Header: 'Telefone',
          accessor: 'phone',
          searchable: false,
          autoWidth: true
        },
        {
          Header: 'E-mail',
          accessor: 'email',
          searchable: false,
          autoWidth: true
        }
      ]
    })
  }
}

const store = new DatagridPeopleStore()
export default store
