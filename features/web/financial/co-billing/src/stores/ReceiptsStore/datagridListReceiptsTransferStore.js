import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import mapFP from 'lodash/fp/map'
import filterFP from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import isNaN from 'lodash/isNaN'
import toNumber from 'lodash/toNumber'
import Typography from '@material-ui/core/Typography'
import formatMoney from '@syntesis/c-functions/src/formatMoney'

class DatagridListReceiptsTransferStore extends DatagridServerSideStore {
  constructor() {
    super({
      initialFetch: false,
      endpoint: 'financial/cobilling/getpagedreceiptstransfertitles',
      columns: [
        {
          Header: 'Local',
          accessor: 'cobillingCompanyPlace',
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
          accessor: 'cobillingClientCompanyPlace',
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
          Header: 'Títulos',
          accessor: 'occurrences',
          sortable: true,
          searchable: true,
          searchOperation: 'equals',
          width: 70,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Conta',
          accessor: 'bankAccount',
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
          Header: 'Local Conta',
          accessor: 'bankAccountCompanyPlace',
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
          Header: 'Total emitido (R$)',
          accessor: 'totalIssued',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 110,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Total recebido (R$)',
          accessor: 'totalAmount',
          Cell: ({ value }) => formatMoney(value, true),
          exportValue: ({ value }) => formatMoney(value, true),
          searchable: false,
          width: 110,
          style: {
            justifyContent: 'flex-end'
          }
        }
      ]
    })
  }

  transformSearchFilter(filtersArr) {
    return flow(
      filterFP((filterObj) => {
        const {
          Value,
          PropertyName
        } = filterObj
        if (PropertyName === 'occurrences') {
          const number = toNumber(Value)
          return !isNaN(number)
        }
        return true
      }),
      mapFP((filterObj) => {
        const {
          Value,
          PropertyName
        } = filterObj
        if (PropertyName === 'occurrences') {
          const number = toNumber(Value)
          return {
            ...filterObj,
            Value: number
          }
        }
        return filterObj
      })
    )(filtersArr)
  }
}

const store = new DatagridListReceiptsTransferStore()
export default store
