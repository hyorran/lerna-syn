import size from 'lodash/size'
import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import formatCnpj from '@syntesis/c-functions/src/formatCnpj'
// import formatLabelCpfCnpj from '@syntesis/c-functions/src/formatLabelCpfCnpj'

class DatagridReinfR2010Store extends DatagridClientSideStore {
  constructor() {
    super({
      columns: [
        // {
        //   Header: 'Tipo de Inscrição',
        //   accessor: 'serviceTakenInscriptionType',
        //   resizable: false,
        //   sortable: true,
        //   Cell: ({ value }) => formatLabelCpfCnpj(value)
        // },
        // {
        //   Header: 'Nº de Inscrição',
        //   accessor: 'serviceTakenInscriptionNumber',
        //   resizable: false,
        //   sortable: true,
        //   searchable: true,
        //   Cell: ({ value }) => formatCnpj(value)
        // },
        {
          Header: 'CNPJ Prestador',
          accessor: 'serviceProviderCnpj',
          Cell: ({ value }) => formatCnpj(value),
          resizable: false,
          sortable: true,
          searchable: true
        },
        {
          Header: 'Prestador',
          accessor: 'serviceProviderName',
          resizable: false,
          sortable: true
        },
        {
          Header: 'Valor Bruto da NF (R$)',
          accessor: 'serviceProviderTotalGrossRevenue',
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
          Header: 'Retenção NF Emitidas (R$)',
          accessor: 'serviceProviderTotalRetentionValue',
          Cell: ({ value }) => formatMoney(value, true),
          resizable: false,
          sortable: true,
          searchable: false,
          width: 150,
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

const store = new DatagridReinfR2010Store()
export default store
