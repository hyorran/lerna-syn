// import isEmpty from 'lodash/isEmpty'
import DatagridServerSideStore from '../../stores/DatagridServerSideStore'
import get from 'lodash/get'

class DatagridOppositeLawyerStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'Suite/People/GetOppositeLawyer',
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
          // Cell: ({ value }) => (isEmpty(value) ? { value } : '-'),
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
          searchable: true,
          searchOperation: 'contains',
          autoWidth: true
        },
        {
          Header: 'E-mail',
          accessor: 'email',
          searchable: true,
          searchOperation: 'contains',
          autoWidth: true
        }
      ]
    })
  }
}

const store = new DatagridOppositeLawyerStore()
export default store
