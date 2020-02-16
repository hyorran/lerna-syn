import size from 'lodash/size'
import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import formatCnpj from '@syntesis/c-functions/src/formatCnpj'

class DatagridReinfR2020Store extends DatagridClientSideStore {
  constructor() {
    super({
      columns: [
        {
          Header: 'CNPJ Tomador',
          accessor: 'serviceTakenInscriptionNumber',
          Cell: ({ value }) => formatCnpj(value),
          resizable: false,
          sortable: true,
          searchable: true
        },
        {
          Header: 'Tomador',
          accessor: 'serviceTakenName',
          resizable: false,
          sortable: true,
          searchable: true
        },
        {
          Header: 'Valor Bruto da NF (R$)',
          accessor: 'serviceTakenTotalGrossRevenue',
          Cell: ({ value }) => formatMoney(value, true),
          resizable: false,
          sortable: true,
          autoWidth: true,
          searchable: false,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Retenção INSS NF Emitidas (R$)',
          accessor: 'serviceTakenTotalRetentionValue',
          Cell: ({ value }) => formatMoney(value, true),
          resizable: false,
          sortable: true,
          searchable: false,
          autoWidth: true,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Notas Fiscais',
          accessor: 'nfsList',
          Cell: ({ value }) => size(value),
          resizable: false,
          sortable: true,
          width: 100,
          style: {
            justifyContent: 'center'
          }
        }
      ]
    })
  }
}

const store = new DatagridReinfR2020Store()
export default store
