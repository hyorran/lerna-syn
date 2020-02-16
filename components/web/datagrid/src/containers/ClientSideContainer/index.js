import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import filterFP from 'lodash/fp/filter'
import mapFP from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import omitBy from 'lodash/omitBy'
import filter from 'lodash/filter'
import DatagridContainer from '../DatagridContainer'
import { enableAllSearch, removeLastColumnResize } from '../../utils'

class ClientSideContainer extends Component {
  static getDerivedStateFromProps(props, state) {
    let { columns } = state

    if (isEmpty(columns)) {
      columns = filter([
        ...removeLastColumnResize(props.columns),
        enableAllSearch(flow(
          filterFP(column => column.searchable),
          mapFP(column => column.accessor || column.id)
        )(props.columns))
      ], item => !isEmpty(item))
    }

    return {
      ...state,
      columns
    }
  }

  constructor(props) {
    super(props)
    this.onChangeFilterAll = this.onChangeFilterAll.bind(this)
    this.onFilteredChange = this.onFilteredChange.bind(this)
    this.setRef = this.setRef.bind(this)

    this.state = {
      filtered: [],
      filterAll: '',
      columns: [],
      datagridObject: {}
    }
  }

  onFilteredChange(filtered) {
    if (filtered.length > 1 && this.state.filterAll.length) {
      const filterAll = ''
      this.setState(prevState => ({
        ...prevState,
        filtered: filtered.filter(item => item.id !== 'allSearch'),
        filterAll
      }))
    } else {
      this.setState({ filtered })
    }
  }

  onChangeFilterAll(value) {
    const filtered = [{ id: 'allSearch', value }]
    // NOTE: this completely clears any COLUMN filters
    this.setState(prevState => ({
      ...prevState,
      filterAll: value,
      filtered
    }), () => {
      const currentRecords = this.datagrid.getResolvedState().sortedData
      let toSetState = {
        datagridObject: {
          totalRecords: currentRecords.length
        }
      }

      if (currentRecords.length === 0) {
        toSetState = {
          ...toSetState,
          datagridObject: {
            ...toSetState.datagridObject,
            minRows: 3
          }
        }
      }

      this.setState(prevState => ({
        ...prevState,
        ...toSetState
      }))
    })
  }

  setRef(ref) {
    this.datagrid = ref
  }

  render() {
    const {
      filtered,
      columns,
      datagridObject
    } = this.state

    const { data } = this.props

    return (
      <DatagridContainer
        totalRecords={ data.length }
        { ...datagridObject }
        datagridRef={ this.setRef }
        onSearch={ this.onChangeFilterAll }
        columns={ columns }
        filtered={ filtered }
        defaultFilterMethod={ (filtering, row) => row[filtering.id].toString() === filtering.value }
        onFilteredChange={ this.onFilteredChange }
        { ...omitBy(this.props, (_, key) => key === 'columns') }
      />
    )
  }
}

ClientSideContainer.propTypes = {
  data: PropTypes.array
}

ClientSideContainer.defaultProps = {
  data: []
}

export default ClientSideContainer
