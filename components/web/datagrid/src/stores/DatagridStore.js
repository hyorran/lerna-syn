import remove from 'lodash/remove'
import map from 'lodash/map'
import filter from 'lodash/filter'
import filterFP from 'lodash/fp/filter'
import find from 'lodash/find'
import set from 'lodash/set'
import get from 'lodash/get'
import includes from 'lodash/includes'
import replace from 'lodash/replace'
import split from 'lodash/split'
import camelCase from 'lodash/fp/camelCase'
import isFunction from 'lodash/isFunction'
import indexOf from 'lodash/indexOf'
import toString from 'lodash/toString'
import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'
import differenceBy from 'lodash/differenceBy'
import flow from 'lodash/fp/flow'
import uniqBy from 'lodash/fp/uniqBy'
import orderBy from 'lodash/fp/orderBy'
import mapFP from 'lodash/fp/map'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import { persist } from 'mobx-persist'
import { action, computed, observable } from 'mobx'

class DatagridStore {
  constructor(datagrid = {}) {
    this.getDatagridData = this.getDatagridData.bind(this)
    this.initialState = {
      ...this.initialState,
      ...datagrid
    }

    this.resetDatagrid(this.initialState)
  }

  @observable
  fallback = () => {}

  @observable
  error = false

  @observable
  initialState = {}

  keepActiveRowIndex = false

  @persist('object')
  @observable
  datagrid = {}

  @action
  resetDatagrid = (initialState = this.initialState) => {
    const { period } = this.initialState
    let { params } = this.initialState

    if (
      !isEmpty(period) &&
      !isEmpty(period.from) &&
      !isEmpty(period.to)
    ) {
      params = {
        ...params,
        [get(period, 'from.apiKey')]: get(period, 'from.value'),
        [get(period, 'to.apiKey')]: get(period, 'to.value')
      }
    }

    this.datagrid = {
      endpoint: null,
      pagination: {},
      initialFetch: true,
      apiKey: 'id', // passar outra apiKey caso a coluna de referencia do objeto nao seja id
      ...this.datagrid,
      ...initialState,
      columns: map(initialState.columns, column => ({
        ...column,
        searchOperation: column.searchable
          ? (column.searchOperation || 'contains')
          : null
      })),
      data: [],
      expandedRowIndex: {},
      isExpanded: false,
      loading: true,
      params: params || {},
      checkedRows: [],
      activeRowIndex: null
    }
  }

  compareHydrate({ datagrid, hydratedStore }) {
    const originalColumns = get(datagrid, 'columns')
    const hydratedColumns = get(hydratedStore, 'datagrid.columns')

    const screenColumns = map(
      originalColumns,
      (original) => {
        const column = find(hydratedColumns, ({ accessor }) => accessor === original.accessor)
        return {
          ...original,
          filterActive: get(column, 'filterActive'),
          filterFromForm: get(column, 'filterFromForm'),
          show: get(original, 'show', true)
        }
      }
    )

    const filtersWithoutColumns = map(differenceBy(hydratedColumns, screenColumns, 'accessor'), column => ({
      ...column,
      show: false
    }))

    return {
      columns: [
        ...screenColumns,
        ...filtersWithoutColumns
      ]
    }
  }

  @action
  onExpandedChanged = (expandedRows = {}, [index] = []) => {
    const expanded = !!get(expandedRows, index, false)
    this.datagrid = {
      ...this.datagrid,
      expandedRowIndex: {
        [index]: expanded
      },
      isExpanded: expanded
    }
    return { index, expanded }
  }

  @action registerOnRefresh = (onRefresh) => {
    this.onRefresh = onRefresh
  }

  @action registerFallback = (fallback) => {
    this.fallback = fallback
  }

  @action
  onRefresh = () => {}

  @action
  async getDatagridData() {
    // this.error = false
    try {
      this.datagrid = {
        ...this.datagrid,
        activeRowIndex: this.keepActiveRowIndex ? this.datagrid.activeRowIndex : null,
        loading: true,
        // checkedRows: []
      }

      const {
        endpoint,
        params
      } = this.datagrid

      const datagridResponse = await this.service({
        endpoint,
        data: params
      })

      const { totalizers } = datagridResponse
      if (!isEmpty(totalizers)) {
        this.datagrid.columns = map(this.datagrid.columns, (column) => {
          const {
            accessor,
            totalCell
          } = column

          let total = get(totalizers, accessor)
          if (total !== undefined) {

            if (includes(total, ',')) {
              total = formatMoney(replace(total, ',', '.'))
            }

            column = {
              ...column,
              Footer: totalCell ? totalCell(total) : total
            }
          }
          return column
        })
      }

      this.datagrid = {
        ...this.datagrid,
        ...datagridResponse,
        loading: false,
        initialFetch: true
      }
      this.error = false

    } catch (e) {
      this.error = true
      this.datagrid = {
        ...this.datagrid,
        loading: false
      }
      throw e
    }
  }

  @action
  onRowClick = ({ index = null }) => {
    this.datagrid = {
      ...this.getDatagrid,
      activeRowIndex: index
    }
  }

  @action
  onCheckRow = (_, { checked, value }) => {
    const {
      checkedRows
    } = this.datagrid

    if (checked) {
      // add to checked rows (checkbox)
      checkedRows.push(value)
    } else {
      // deselect row (checkbox)
      remove(checkedRows, item => item === value)
    }

    this.datagrid = {
      ...this.getDatagrid,
      checkedRows
    }
  }

  @action
  onToggleCheckedRows = (_, { checked }) => {
    if (!checked) {
      const checkedOnPage = this.checkedRefsOnPage
      const { checkedRows } = this.datagrid

      this.datagrid = {
        ...this.getDatagrid,
        checkedRows: filter(
          checkedRows,
          row => indexOf(checkedOnPage, `${ row }`) === -1
        )
      }

    } else {
      const {
        data,
        apiKey
      } = this.getDatagrid

      this.datagrid = {
        ...this.getDatagrid,
        checkedRows: [
          ...this.getDatagrid.checkedRows,
          ...map(data, item => `${ item[apiKey] }`)
        ]
      }
    }
  }

  adjustExistingPeriod(params) {
    let oldPeriod = {}
    const period = get(this.datagrid, 'period')

    if (!isEmpty(period)) {
      const from = get(period, 'from')
      const to = get(period, 'to')

      const paramFrom = get(params, from.apiKey)
      const paramTo = get(params, to.apiKey)

      if (!isEmpty(paramFrom) && !isEmpty(paramTo)) {
        oldPeriod = {
          period: {
            ...period,
            from: {
              ...from,
              value: paramFrom
            },
            to: {
              ...to,
              value: paramTo
            }
          }
        }
      }
    }

    return oldPeriod
  }

  @action
  setParams = (params, exec = true) => {
    const period = this.adjustExistingPeriod(params)

    this.datagrid = {
      ...this.getDatagrid,
      ...period,
      params: {
        ...this.getDatagrid.params,
        ...params
      }
    }
    if (exec) {
      this.getDatagridData()
    }
  }

  @action
  resetFiltersOnUnmount = () => {
    const connector = get(this.datagrid, 'params.Filter.Connector')
    if (connector === 'Or') {
      this.setParams({
        Filter: {}
      })
    }
  }

  @action
  setAdvancedFilters = (filtersFromForm = {}) => {
    const { columns } = this.datagrid

    if (isFunction(this.transformFiltersFromForm)) {
      filtersFromForm = this.transformFiltersFromForm(filtersFromForm)
    }

    const oldColumns = map(columns, (column, originalOrder) => ({
      ...column,
      originalOrder: column.originalOrder !== undefined ? column.originalOrder : originalOrder,
    }))

    let newColumns = map(filtersFromForm, (filterFromForm, accessor) => {
      const filterChecked = get(filterFromForm, 'checked', null)
      const filterValue = get(filterFromForm, 'value')
      if (filterChecked !== null && filterValue !== null) {
        filterFromForm = {
          ...filterFromForm,
          value: filterChecked
        }
      }

      const column = find(oldColumns, { accessor }) || {}

      let filterActive = false
      if (isBoolean(filterFromForm.checked)) {
        filterActive = true
      } else {
        filterActive = !isEmpty(filterFromForm.value) || filterFromForm.value === 0
      }

      return ({
        accessor,
        show: !isEmpty(column),
        ...column,
        filterFromForm,
        Header: !isEmpty(column) ? column.Header : filterFromForm.label,
        filterOperation: filterFromForm.filterOperation || column.filterOperation || 'contains',
        filterActive
      })
    })

    newColumns = flow(
      uniqBy('accessor'),
      orderBy('originalOrder', 'asc')
    )([
      ...newColumns,
      ...oldColumns
    ])

    this.setFilters(newColumns)
  }

  @action
  removeAdvancedFilter = (advancedFilter) => {
    const { columns } = this.datagrid

    const newColumns = map(columns, (column) => {
      if (column.accessor === advancedFilter.accessor) {
        return ({
          ...column,
          filterFromForm: {},
          filterActive: false,
        })
      }
      return column
    })

    this.setFilters(newColumns)
  }

  @action
  removeAllAdvancedFilters = () => {
    const { columns } = this.datagrid

    const newColumns = map(columns, column => ({
      ...column,
      filterFromForm: {},
      filterActive: false
    }))

    this.setFilters(newColumns)
  }

  setFilters = (newColumns = []) => {
    let filterValues = flow(
      filterFP(column => column.filterActive),
      mapFP(column => ({
        PropertyName: split(column.accessor, '_').join('.'), // faz replace para acessar campos de uma tabela filha
        Value: !isEmpty(get(column, 'filterFromForm.value')) || isBoolean(get(column, 'filterFromForm.value'))
          ? toString(get(column, 'filterFromForm.value'))
          : null,
        Operation: camelCase(column.filterOperation)
      }))
    )(newColumns)

    if (isFunction(this.transformDataToFilter)) {
      filterValues = this.transformDataToFilter(filterValues)
    }

    if (isFunction(this.adjustSearchFilter)) {
      filterValues = this.adjustSearchFilter(filterValues)
    }

    const newParams = {
      Page: 1,
      Filter: isEmpty(filterValues)
        ? {}
        : {
          Connector: 'And',
          Values: filterValues
        }
    }

    const { params } = this.datagrid

    set(this.datagrid, 'columns', newColumns)
    this.setParams({
      ...params,
      ...newParams
    })
  }

  @computed
  get getDatagrid() {
    return this.datagrid
  }

  @computed
  get checkedRowsOnPage() {
    const {
      checkedRows,
      data,
      apiKey
    } = this.datagrid

    return filter(data, row => indexOf(checkedRows, `${ row[apiKey] }`) > -1)
  }

  @computed
  get checkedRefsOnPage() {
    const {
      apiKey
    } = this.datagrid

    return map(
      this.checkedRowsOnPage,
      row => `${ row[apiKey] }`
    )
  }

  @computed
  get checkedAllOnPage() {
    const checkedOnPage = this.checkedRefsOnPage

    if (checkedOnPage.length) {
      if (checkedOnPage.length === this.datagrid.data.length) {
        return true
      }
      return null
    }
    return false
  }

  @computed
  get itemSelected() {
    return find(this.datagrid.data, (_, index) => index === this.datagrid.activeRowIndex)
  }

  @computed
  get hasError() {
    return this.error
  }
}

export default DatagridStore
