import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import flow from 'lodash/fp/flow'
import findFP from 'lodash/fp/find'
import getFP from 'lodash/fp/get'
import get from 'lodash/get'
import toString from 'lodash/toString'
import moment from 'moment/moment'
import { momentBackMonthYearFormat, momentFriendlyMonthYearFormat } from '@syntesis/c-pickers/src/utils'
import getReinfAdjustTypes from '@syntesis/c-functions/src/getReinfAdjustTypes'

class DatagridReinfR2060ActivityAdjustmentsStore extends DatagridClientSideStore {
  constructor() {
    super({
      columns: [
        {
          Header: 'Tipo',
          accessor: 'adjustType',
          resizable: false,
          sortable: true,
          width: 90,
          style: {
            justifyContent: 'center'
          },
          Cell: ({ value }) => (toString(value) === '0' ? 'Redução' : 'Acréscimo')
        },
        {
          Header: 'Código do Ajuste',
          accessor: 'adjustCode',
          resizable: false,
          sortable: false,
          Cell: ({ value }) => flow(
            findFP(item => toString(get(item, 'value')) === toString(value)),
            getFP('label')
          )(getReinfAdjustTypes) || getReinfAdjustTypes
        },
        {
          Header: 'Valor (R$)',
          accessor: 'adjust',
          resizable: false,
          sortable: true,
          width: 180,
          style: {
            justifyContent: 'flex-end'
          },
          Cell: ({ value }) => formatMoney(value, true)
        },
        {
          Header: 'Data',
          accessor: 'adjustDate',
          resizable: false,
          sortable: true,
          width: 100,
          style: {
            justifyContent: 'flex-end'
          },
          Cell: ({ value }) => moment(
            value,
            momentBackMonthYearFormat
          ).format(momentFriendlyMonthYearFormat)
        }
      ]
    })
  }
}

const store = new DatagridReinfR2060ActivityAdjustmentsStore()
export default store
