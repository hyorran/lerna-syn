import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import formatMoney from '@syntesis/c-functions/src/formatMoney'

class DatagridReinfR2010NfsListServiceStore extends DatagridClientSideStore {
  constructor() {
    super({
      columns: [
        {
          Header: 'Tipo de Serviço',
          accessor: 'fiscalServiceClassificationId',
          resizable: false,
          sortable: true,
          style: {
            justifyContent: 'flex-end'
          }
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
        },
        {
          Header: 'Retenção Destacada (R$)',
          accessor: 'subcontractServicesRetentionValue',
          Cell: ({ value }) => formatMoney(value, true),
          resizable: false,
          sortable: true,
          width: 150,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Valor Adicional (R$)',
          accessor: 'additionalValue',
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

const store = new DatagridReinfR2010NfsListServiceStore()
export default store
