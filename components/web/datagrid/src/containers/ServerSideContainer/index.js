import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import flow from 'lodash/fp/flow'
import mapFP from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import lowerCase from 'lodash/fp/lowerCase'
import upperFirst from 'lodash/fp/upperFirst'
import DatagridContainer from '../DatagridContainer'
import { removeLastColumnResize } from '../../utils'

class ServerSideContainer extends Component {
  static getDerivedStateFromProps(props, state) {
    let { columns } = state
    if (isEmpty(columns)) {
      columns = [
        ...removeLastColumnResize(props.columns)
      ]
    }

    return {
      ...state,
      columns,
    }
  }

  constructor(props) {
    super(props)

    this.onSearch = this.onSearch.bind(this)
    this.onTableChange = this.onTableChange.bind(this)
    this.changeParams = this.changeParams.bind(this)

    this.state = {
      columns: []
    }
  }

  onTableChange(paramsFromDatagrid) {
    const {
      page,
      pageSize,
      sorted
    } = paramsFromDatagrid

    const newParams = {
      Page: page + 1,
      PageSize: pageSize,
      OrderBy: map(sorted, ({ id, desc }) => ({
        PropertyName: id,
        Dir: desc ? 'd' : 'a'
      }))
    }

    this.changeParams(newParams)
  }

  onSearch(value) {
    const {
      columns
    } = this.state

    const {
      store: {
        adjustSearchFilter
      }
    } = this.props

    const newParams = {
      Page: 1,
      Filter: {
        Connector: 'Or',
        Values: flow(
          filter(column => column.searchable),
          mapFP(column => ({
            PropertyName: column.accessor,
            Value: value,
            Operation: flow(
              lowerCase,
              upperFirst,
            )(column.searchOperation)
          }))
        )(columns)
      }
    }

    this.changeParams({
      ...newParams,
      Filter: {
        ...newParams.Filter,
        Values: adjustSearchFilter(newParams.Filter)
      }
    })
  }

  changeParams(newParams = {}) {
    const {
      store: {
        getDatagrid,
        setParams
      }
    } = this.props

    const {
      params,
      initialFetch
    } = getDatagrid

    setParams({
      ...params,
      ...newParams
    }, initialFetch)
  }
  render() {
    const {
      columns
    } = this.state

    const {
      store,
      ...props
    } = this.props

    const {
      pagination: {
        totalPages,
        totalRecords,
        page
      }
    } = store.getDatagrid
    return (
      <DatagridContainer
        manual
        totalRecords={ totalRecords }
        pages={ totalPages }
        onFetchData={ this.onTableChange }
        onSearch={ this.onSearch }
        columns={ columns }
        store={ store }
        { ...props }
        page={ page ? page - 1 : 0 }
      />
    )
  }
}

ServerSideContainer.propTypes = {
  store: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  endpoint: PropTypes.string.isRequired
}

export default ServerSideContainer
