import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import { momentFriendlyMonthYearFormat } from '@syntesis/c-pickers/src/utils'
import moment from 'moment/moment'

class DatagridCompetenciesContainerStore extends DatagridServerSideStore {
  constructor() {
    super({
      initialFetch: false,
      endpoint: 'fiscal/reinf/getreinffilescompetences',
      params: {
        OrderBy: [
          {
            PropertyName: 'competence',
            Dir: 'a'
          }
        ]
      },
      columns: [
        {
          Header: 'Competência',
          accessor: 'competence',
          Cell: ({ value }) => moment(value).format(momentFriendlyMonthYearFormat)
        }
      ]
    })
  }
  keepActiveRowIndex = true
}

const store = new DatagridCompetenciesContainerStore()

export default store
