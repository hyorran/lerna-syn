import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import get from 'lodash/get'
import compact from 'lodash/compact'
import slice from 'lodash/slice'
import filter from 'lodash/filter'
import isNumber from 'lodash/isNumber'
import { parseInt, split } from 'lodash'
import CashRegisterIcon from '@syntesis/c-icons/src/CashRegisterIcon'
import BankIcon from '@syntesis/c-icons/src/BankIcon'
import { Colors } from '@syntesis/c-styles'
import Tooltip from '@material-ui/core/Tooltip'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'
import { breakStatement } from '@babel/types'

class DatagridStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'financial/bankaccounts',
      columns: [
        {
          Header: 'Código',
          accessor: 'code',
          searchable: true,
          searchOperation: 'contains',
          width: 100
        },
        {
          Header: 'Tipo',
          accessor: 'type',
          sortable: true,
          Cell: ({ value }) => {
            if (value === 1) {
              // caixa
              return (
                <Tooltip placement="left" title="Caixa">
                  <CashRegisterIcon style={ { color: Colors.primary } } />
                </Tooltip>
              )
            }
            // instituição financeira
            return (
              <Tooltip placement="left" title="Instituição Financeira">
                <BankIcon style={ { color: Colors.greenCreate } } />
              </Tooltip>
            )
          },
          width: 70,
          style: {
            justifyContent: 'center'
          }
        },
        {
          Header: 'Título',
          accessor: 'description',
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Instituição Financeira',
          accessor: 'bank.name',
          Cell: ({ value }) => (!isEmpty(value) ? value : '-'),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Agência',
          accessor: 'agency',
          searchable: true,
          searchOperation: 'contains',
          Cell: ({ value, original }) => {
            if (isEmpty(value)) {
              return '-'
            }
            return `${ value }${ !isEmpty(original.agencyCheckDigit) ? `-${ original.agencyCheckDigit }` : '' }`
          },
          width: 80,
          style: {
            justifyContent: 'flex-start'
          }
        },
        {
          Header: 'agencyCheckDigit',
          accessor: 'agencyCheckDigit',
          searchable: true,
          show: false
        },
        {
          Header: 'Conta',
          accessor: 'account',
          searchable: true,
          sortable: false,
          Cell: ({ value, original }) => {
            if (isEmpty(value)) {
              return '-'
            }
            return `${ value }${ !isEmpty(original.accountCheckDigit) ? `-${ original.accountCheckDigit }` : '' }`
          },
          width: 80,
          style: {
            justifyContent: 'flex-start'
          }
        },
        {
          Header: 'accountCheckDigit',
          accessor: 'accountCheckDigit',
          searchable: true,
          show: false
        },
        {
          Header: 'Ativo',
          accessor: 'active',
          searchable: false,
          Cell: BoolAsComponent,
          width: 80,
          style: {
            justifyContent: 'center'
          }
        }
      ]
    })
  }

  transformSearchFilter(filters) {
    let checkDigit = null
    const filtersArray = get(filters, 'Values')
    const adjustedFilter = map(filtersArray, (filterObj) => {
      if (filterObj.PropertyName === 'agency' || filterObj.PropertyName === 'account') {
        const agencyWithCode = split(filterObj.Value, '-')
        if (!Number.isNaN(parseInt(agencyWithCode[0]))) {
          const agency = parseInt(agencyWithCode[0])
          checkDigit = parseInt(agencyWithCode[1]) ?
            parseInt(agencyWithCode[1]) :
            parseInt(filterObj.value)
          return {
            ...filterObj,
            Value: agency
          }
        }
      } else if (filterObj.PropertyName === 'agencyCheckDigit' || filterObj.PropertyName === 'accountCheckDigit') {
        return {
          ...filterObj,
          Value: checkDigit
        }
      }
      return filterObj
    })
    const compactFilter = compact(adjustedFilter)
    if (checkDigit) {
      const cFilter = filter(compactFilter, index => isNumber(index.Value))
      const agencyFilter = slice(cFilter, 0, 2)
      const accountFilter = slice(cFilter, 2, 4)
      return [
        {
          Connector: 'And',
          Values: agencyFilter
        },
        {
          Connector: 'And',
          Values: accountFilter
        }
      ]
    }
    return compactFilter
  }
}

// const hydrate = create({})
const store = new DatagridStore()
// const datagrid = get(store, 'datagrid')
// hydrate('DatagridPaymentMethodStore', store).then((hydratedStore) => {
//   store.initHydratedDatagrid({
//     datagrid,
//     hydratedStore
//   })
// })

export default store
