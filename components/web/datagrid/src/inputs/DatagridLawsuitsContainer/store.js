import DatagridServerSideStore from '../../stores/DatagridServerSideStore'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment/moment'

class DatagridLawsuitsStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'Lawsuit/Lawsuits',
      params: {
        OrderBy: [
          {
            PropertyName: 'id',
            Dir: 'd'
          }
        ]
      },
      columns: [
        {
          Header: 'Número Originário',
          accessor: 'processNumber',
          Cell: ({ value }) => (!isEmpty(value) ? value : '-'),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Número Atual',
          accessor: 'actualProcessNumber',
          Cell: ({ value }) => (!isEmpty(value) ? value : '-'),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Entrada',
          accessor: 'entry',
          Cell: ({ value }) => (moment(value).isValid() ? moment(value).format('L') : '-'),
          searchable: false,
          searchOperation: 'equals',
          width: 150
        }
      ]
    })
  }
}

const store = new DatagridLawsuitsStore()
export default store
