import size from 'lodash/size'
import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import formatCnpj from '@syntesis/c-functions/src/formatCnpj'
import { momentBackDateFormat, momentFriendlyDateFormat } from '@syntesis/c-pickers/src/utils'
import moment from 'moment/moment'

class DatagridReinfR2010NfsListStore extends DatagridClientSideStore {
  constructor() {
    super({
      columns: [
        {
          Header: 'Nº da NF/Fatura',
          accessor: 'doctoNumber',
          resizable: false,
          sortable: true
        },
        {
          Header: 'Nº de Série da NF/Fatura',
          accessor: 'serialNumber',
          resizable: false,
          sortable: true,
          autoWidth: true
        },
        {
          Header: 'Data de Emissão',
          accessor: 'issueDate',
          Cell: ({ value }) => moment(value, momentBackDateFormat).format(momentFriendlyDateFormat),
          resizable: false,
          sortable: true,
          autoWidth: true
        },
        {
          Header: 'Valor Bruto da NF (R$)',
          accessor: 'grossValue',
          Cell: ({ value }) => formatMoney(value, true),
          resizable: false,
          sortable: true,
          autoWidth: true,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Serviços',
          accessor: 'servicesTypes',
          Cell: ({ value }) => size(value),
          resizable: false,
          sortable: true,
          width: 150,
          style: {
            justifyContent: 'center'
          }
        }
      ]
    })
  }
}

const store = new DatagridReinfR2010NfsListStore()
export default store
