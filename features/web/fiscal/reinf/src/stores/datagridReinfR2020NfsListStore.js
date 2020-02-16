import size from 'lodash/size'
import moment from 'moment/moment'
import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import { momentBackDateFormat, momentFriendlyDateFormat } from '@syntesis/c-pickers/src/utils'

class DatagridReinfR2020NfsListStore extends DatagridClientSideStore {
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
          resizable: false,
          sortable: true,
          autoWidth: true,
          Cell: ({ value }) => moment(value, momentBackDateFormat).format(momentFriendlyDateFormat)
        },
        {
          Header: 'Valor Bruto da NF (R$)',
          accessor: 'grossValue',
          resizable: false,
          sortable: true,
          autoWidth: true,
          style: {
            justifyContent: 'flex-end'
          },
          Cell: ({ value }) => formatMoney(value, true)
        },
        {
          Header: 'Serviços',
          accessor: 'servicesTypes',
          resizable: false,
          sortable: true,
          width: 150,
          style: {
            justifyContent: 'center'
          },
          Cell: ({ value }) => size(value)
        }
      ]
    })
  }
}

const store = new DatagridReinfR2020NfsListStore()
export default store
