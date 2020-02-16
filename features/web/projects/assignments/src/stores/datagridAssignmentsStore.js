import React from 'react'
import moment from 'moment/moment'
// import { create } from 'mobx-persist'
// import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import PriorityAsComponent from '@syntesis/c-commons/src/components/PriorityAsComponent'
import ProgressAsComponent from '@syntesis/c-commons/src/components/ProgressAsComponent'
import get from 'lodash/get'

class DatagridAssignmentsStore extends DatagridServerSideStore {
  constructor() {
    super({
      // initialFetch: false,
      endpoint: 'Projects/Assignments',
      params: {
        OrderBy: [
          {
            PropertyName: 'finalDate',
            Dir: 'a'
          },
          {
            PropertyName: 'priority',
            Dir: 'd'
          }
        ]
      },
      columns: [
        {
          Header: 'Processo',
          accessor: 'lawsuit.processNumber',
          Cell: ({ value }) => (
            !isEmpty(value)
              ? <Tooltip title={ value } placement="bottom" disableHoverListener={ value.length < 30 }><Typography noWrap>{ value }</Typography></Tooltip>
              : '-'
          ),
          exportValue: ({ value }) => (
            !isEmpty(value)
              ? value
              : '-'
          ),
          searchable: true,
          sortable: true,
          searchOperation: 'contains',
          width: 120,
        },
        {
          Header: 'Atividade',
          accessor: 'assignmentOrigins.description',
          Cell: ({ value }) => (
            !isEmpty(value)
              ? <Tooltip title={ value } placement="bottom" disableHoverListener={ value.length < 30 }><Typography noWrap>{ value }</Typography></Tooltip>
              : '-'
          ),
          searchable: true,
          sortable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Responsável',
          accessor: 'responsible.name',
          Cell: ({ value, original }) =>
            (!isEmpty(get(original, 'responsible.name2'))
              ? <Typography noWrap>{ get(original, 'responsible.name2') }</Typography>
              : <Typography noWrap>{ value }</Typography>
            ),
          searchable: true,
          sortable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Solicitante',
          accessor: 'requestor.name',
          // Cell: ({ value }) => <Typography noWrap>{ value }</Typography>,
          Cell: ({ value, original }) =>
            (!isEmpty(get(original, 'requestor.name2'))
              ? <Typography noWrap>{ get(original, 'requestor.name2') }</Typography>
              : <Typography noWrap>{ value }</Typography>
            ),
          searchable: true,
          sortable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Progresso',
          accessor: 'progress',
          Cell: ({ value }) => <ProgressAsComponent value={ value } />,
          exportValue: ({ value }) => (`${ value }%`),
          searchable: false,
          sortable: true,
          width: 100,
          style: {
            justifyContent: 'center'
          }
        },
        {
          Header: 'Prazo',
          accessor: 'finalDate',
          sortable: true,
          Cell: ({ value }) => (moment(value).isValid() ? (moment(value).format('L')) : '-'),
          exportValue: ({ value }) => (moment(value).isValid() ? (moment(value).format('L')) : '-'),
          width: 100,
        },
        {
          Header: 'PR',
          accessor: 'priority',
          sortable: true,
          Cell: PriorityAsComponent,
          exportValue: ({ value }) => {
            let text = 'Normal'
            switch (value) {
              case 1:
                text = 'Média'
                break
              case 2:
                text = 'Alta'
                break
              default:
                break
            }
            return (text)
          },
          width: 70,
          style: {
            justifyContent: 'center'
          }
        },
      ]
    })
  }
}

// const hydrate = create({})
const store = new DatagridAssignmentsStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridAssignmentsStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
