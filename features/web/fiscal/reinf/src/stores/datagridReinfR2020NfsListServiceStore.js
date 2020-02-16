import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import formatMoney from '@syntesis/c-functions/src/formatMoney'

class DatagridReinfR2020NfsListServiceStore extends DatagridClientSideStore {
  constructor() {
    super({
      columns: [
        {
          Header: 'Tipo de Serviço',
          accessor: 'fiscalServiceClassificationId',
          resizable: false,
          sortable: true
        },
        {
          Header: 'Base de Cálculo da Retenção (R$)',
          accessor: 'retentionBaseValue',
          Cell: ({ value }) => formatMoney(value, true),
          resizable: false,
          sortable: true,
          autoWidth: true,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Retenção Apurada (R$)',
          accessor: 'retentionValue',
          Cell: ({ value }) => formatMoney(value, true),
          resizable: false,
          sortable: true,
          width: 150,
          style: {
            justifyContent: 'flex-end'
          }
        }
      ]
    })
  }
}

const store = new DatagridReinfR2020NfsListServiceStore()
export default store
