import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import size from 'lodash/size'

class DatagridReinfR2060ActivitiesStore extends DatagridClientSideStore {
  constructor() {
    super({
      columns: [
        {
          Header: 'Código da Atividade',
          accessor: 'fiscalEconomicActivityId',
          resizable: false,
          sortable: true
        },
        {
          Header: 'Valor da Receita (R$)',
          accessor: 'grossRevenueActivity',
          resizable: false,
          sortable: true,
          width: 150,
          style: {
            justifyContent: 'flex-end'
          },
          Cell: ({ value }) => formatMoney(value, true)
        },
        {
          Header: 'Vlr. Reduções (R$)',
          accessor: 'excludedGrossRevenue',
          resizable: false,
          sortable: true,
          width: 150,
          style: {
            justifyContent: 'flex-end'
          },
          Cell: ({ value }) => formatMoney(value, true)
        },
        {
          Header: 'Vlr. Adições (R$)',
          accessor: 'aditionalGrossRevenue',
          resizable: false,
          sortable: true,
          width: 150,
          style: {
            justifyContent: 'flex-end'
          },
          Cell: ({ value }) => formatMoney(value, true)
        },
        {
          Header: 'Ajustes',
          accessor: 'adjustments',
          resizable: false,
          sortable: true,
          width: 80,
          style: {
            justifyContent: 'center'
          },
          Cell: ({ value }) => size(value)
        }
      ]
    })
  }
}

const store = new DatagridReinfR2060ActivitiesStore()
export default store
