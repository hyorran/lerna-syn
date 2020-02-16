import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import moment from 'moment/moment'
import { momentBackDateFormat } from '@syntesis/c-pickers/src/utils'
import find from 'lodash/find'
import reject from 'lodash/reject'
import isEmpty from 'lodash/isEmpty'
import React from 'react'
import Typography from '@material-ui/core/Typography'
// import filterFP from 'lodash/fp/filter'
// import mapFP from 'lodash/fp/map'
import map from 'lodash/map'
// import flow from 'lodash/fp/flow'
import isNaN from 'lodash/isNaN'
import toNumber from 'lodash/toNumber'

class DatagridDocEntriesStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'financial/cobilling/getpageddocentries',
      period: {
        from: {
          apiKey: 'begin',
          value: moment().startOf('month').format(momentBackDateFormat)
        },
        to: {
          apiKey: 'end',
          value: moment().format(momentBackDateFormat)
        }
      },
      params: {
        OrderBy: [
          {
            PropertyName: 'created',
            Dir: 'd'
          }
        ]
      },
      columns: [
        {
          Header: 'Dt. Emissão',
          accessor: 'created',
          Cell: ({ value }) => moment(value).format('L'),
          exportValue: ({ value }) => moment(value).format('L'),
          searchable: false
        },
        {
          Header: 'Local',
          accessor: 'cobillingPlace.description',
          Cell: ({ value }) => (
            !isEmpty(value)
              ? (
                <Typography noWrap>{ value }</Typography>
              ) : '-'
          ),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Cliente',
          accessor: 'cobillingCustomerPlace.description',
          Cell: ({ value }) => (
            !isEmpty(value)
              ? (
                <Typography noWrap>{ value }</Typography>
              ) : '-'
          ),
          searchable: true,
          searchOperation: 'contains'
        },
        {
          Header: 'Nº NFSe',
          accessor: 'invoiceNote.documentNumber',
          width: 100,
          sortable: true,
          searchable: true,
          searchOperation: 'equals',
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Títulos',
          accessor: 'occurrences',
          searchable: false,
          width: 70,
          sortable: false,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Vlr. Total (R$)',
          accessor: 'invoiceValue',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 120,
          style: {
            justifyContent: 'flex-end'
          }
        }
      ]
    })
  }

  transformDataToFilter = (filterValues) => {
    const initialDate = find(filterValues, { PropertyName: 'initialDate' })
    const finalDate = find(filterValues, { PropertyName: 'finalDate' })

    if (initialDate) {
      filterValues = reject(filterValues, { PropertyName: 'initialDate' })
      filterValues.push({
        ...initialDate,
        PropertyName: 'created'
      })
    }

    if (finalDate) {
      filterValues = reject(filterValues, { PropertyName: 'finalDate' })
      filterValues.push({
        ...finalDate,
        Value: `${ finalDate.Value } 23:59:59`,
        PropertyName: 'created',
        Operation: 'LessThanOrEquals'
      })
    }
    return filterValues
  }


  transformSearchFilter(filtersArr) {

    // Quando o atributo NÃO for nullable, utilizar desta forma:
    // return flow(
    //   filterFP((filterObj) => {
    //     const {
    //       Value,
    //       PropertyName
    //     } = filterObj
    //     if (PropertyName === 'invoiceNote.documentNumber') {
    //       const number = toNumber(Value)
    //       return !isNaN(number)
    //     }
    //     return true
    //   }),
    //   mapFP((filterObj) => {
    //     const {
    //       Value,
    //       PropertyName
    //     } = filterObj
    //     if (PropertyName === 'invoiceNote.documentNumber') {
    //       const number = toNumber(Value)
    //       return {
    //         ...filterObj,
    //         Value: number
    //       }
    //     }
    //     return filterObj
    //   })
    // )(filtersArr)

    // Quando o atributo for nullable, utilizar desta forma:
    return map(filtersArr, (filterObj) => {
      const {
        Value,
        PropertyName
      } = filterObj
      if (PropertyName === 'invoiceNote.documentNumber') {
        const number = toNumber(Value)
        return {
          ...filterObj,
          Value: isNaN(number) ? null : number
        }
      }
      return filterObj
    })
  }
}

const store = new DatagridDocEntriesStore()
export default store
