import React, { useEffect, useReducer, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import forEach from 'lodash/forEach'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import map from 'lodash/map'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'
import {
  DataTypeProvider,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSummary,
  PagingState,
  SearchState,
  SortingState,
  SummaryState
} from '@devexpress/dx-react-grid'
import {
  ColumnChooser,
  DragDropProvider,
  Grid,
  GroupingPanel,
  PagingPanel,
  SearchPanel,
  Table, TableColumnReordering, TableColumnResizing,
  TableColumnVisibility,
  TableGroupRow,
  TableHeaderRow,
  TableSummaryRow,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui'

import styles from './styles'
import { isEmpty } from 'lodash'


const getRowId = row => row.id
const CurrencyFormatter = ({ value }) => `$${ value }`
const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={ CurrencyFormatter }
    { ...props }
  />
)

// eslint-disable-next-line react/prop-types
const BooleanFormatter = ({ value }) => <BoolAsComponent value={ value } />
const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={ BooleanFormatter }
    { ...props }
  />
)
export const GroupingPanelEmptyMessageComponent = () => (
  <GroupingPanel.EmptyMessage
    getMessage={ () => 'Arraste e solte uma coluna aqui para agrupar os dados.' }
  />
)

const TableContainerComponentBase = props => (
  <Table.Container { ...props } />
)
export const TableContainerComponent = withStyles(styles)(TableContainerComponentBase)

const TableNoDataCellPropsBase = props => (
  <Table.NoDataCell
    { ...props }
    getMessage={ () => 'Nenhuma informação encontrada.' }
  />
)
export const TableNoDataCellComponent = withStyles(styles)(TableNoDataCellPropsBase)

export const PagingPanelLocalizationMessages = props => (
  <PagingPanel.LocalizationMessages
    { ...props }
    showAll="test"
  />
)

const PagingPanelBase = props => (
  <PagingPanel.Container
    { ...props }
  />
)
export const PagingPanelComponent = withStyles(styles)(PagingPanelBase)

const initialState = {
  data: {},
  columns: [],
  rows: []
}
function reducer(state, action) {
  if (action.type === 'setValues') {
    let newValues = null
    forEach(get(action, 'index'), (stateItem) => {
      if (stateItem === 'data') {
        newValues = {
          ...newValues,
          [stateItem]: get(action, 'payload')
        }
      } else if (stateItem === 'rows') {
        newValues = {
          ...newValues,
          [stateItem]: get(action.payload, 'data')
        }
      } else if (stateItem === 'columns') {
        newValues = {
          ...newValues,
          [stateItem]: map(get(action.payload, 'columns'), column => ({
            name: column.accessor,
            title: column.Header,
            width: column.width
          }))
        }
      }
    })
    return {
      ...state,
      ...newValues
    }
  } else if (action.type === 'setAll') {
    return {
      ...state,
      data: action.payload,
      columns: map(get(action.payload, 'columns'), item => ({
        name: item.accessor,
        title: item.Header,
        width: item.width
      })),
      rows: get(action.payload, 'data')
    }
  } else if (action.type === 'setPageSize') {
    return {
      ...state,
      pageSize: action.payload
    }
  }
  return state
}

const ResponsiveGrid = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [currentPage, setCurrentPage] = useState(0)
  const {
    defaultHiddenColumnNames,
    currencyColumns,
    groupSummaryItems,
    grouping,
    tableColumnExtensions,
    totalSummaryItems,
    store,
    columnChooser
  } = props

  const {
    getDatagridData,
    // setParams
  } = store

  const {
    // data,
    rows,
    columns
  } = state

  const [groupingState] = useState(grouping)
  const [tableColumnExtensionsState] = useState(tableColumnExtensions)
  const [totalSummaryItemsState] = useState(totalSummaryItems)
  const [groupSummaryItemsState] = useState(groupSummaryItems)
  const [currencyColumnsState] = useState(currencyColumns)
  const [defaultHiddenColumnNamesState] = useState(defaultHiddenColumnNames)
  const [columnWidth, setColumnsWidth] = useState([])
  const [columnOrder, setColumnOrder] = useState([])

  if (!isEmpty(columns)) {
    if (isEmpty(columnWidth)) {
      setColumnsWidth(map(columns, item => ({
        columnName: item.name,
        width: item.width
      })))
    }
    if (isEmpty(columnOrder)) {
      setColumnOrder(map(columns, item => item.name))
    }
  }
  // const {
  //   pagination
  // } = data

  useEffect(() => {
    const fetchData = async () => {
      await getDatagridData()
      const { getDatagrid } = store
      return dispatch({
        type: 'setValues',
        payload: getDatagrid,
        index: ['data', 'columns', 'rows']
      })
    }
    fetchData()
  }, [])

  // const [pageSize, setPageSize] = useState(10)
  // const changePageSize = (pageSizeCurrent) => {
  //   const { getDatagrid } = store
  //   setParams({
  //     ...getDatagrid.params,
  //     Page: currentPage,
  //     PageSize: pageSizeCurrent
  //   })
  //   const fetchData = async () => {
  //     await getDatagridData()
  //     dispatch({
  //       type: 'setValues',
  //       payload: getDatagrid,
  //       index: ['data', 'rows']
  //     })
  //   }
  //   fetchData()
  //     .then(() => setPageSize(pageSizeCurrent))
  //     .then(() => setCurrentPage(currentPage))
  // }

  // const changeCurrentPage = (pageCurrent) => {
  //   setParams({
  //     ...store.getDatagrid.params,
  //     Page: pageCurrent,
  //     PageSize: pageSize
  //   })
  //   const fetchData = async () => {
  //     dispatch({
  //       type: 'setValues',
  //       payload: store.getDatagrid,
  //       index: ['data', 'rows']
  //     })
  //   }
  //   fetchData()
  // }

  // const changeSearchValue = (searchValue) => {
  //   const { getDatagrid } = store
  //   const newColumns = get(getDatagrid, 'columns')
  //   const newParams = {
  //     Page: 1,
  //     Filter: {
  //       Connector: 'Or',
  //       Values: flow(
  //         filterFP(column => column.searchable),
  //         mapFP(column => ({
  //           PropertyName: column.accessor,
  //           Value: searchValue,
  //           Operation: flow(
  //             lowerCase,
  //             upperFirst,
  //           )(column.searchOperation)
  //         }))
  //       )(newColumns)
  //     }
  //   }
  //   setParams({
  //     ...getDatagrid.params,
  //     ...newParams
  //   })
  //   const fetchData = async () => {
  //     await getDatagridData()
  //     dispatch({
  //       type: 'setValues',
  //       payload: getDatagrid,
  //       index: ['data', 'rows']
  //     })
  //   }
  //   fetchData()
  // }

  const changeColumnOrder = newOrder => setColumnOrder(newOrder)
  const changeColumnWidths = columnWidths => setColumnsWidth(columnWidths)

  return (
    <Paper style={ { position: 'relative' } }>
      <Grid
        rows={ rows }
        columns={ columns }
        getRowId={ getRowId }
      >
        <DragDropProvider />
        <BooleanTypeProvider
          for="active"
        />
        <Toolbar />
        <CurrencyTypeProvider
          for={ currencyColumnsState }
        />
        <SortingState />
        <GroupingState
          defaultGrouping={ groupingState }
        />
        <IntegratedGrouping />
        <SummaryState
          totalItems={ totalSummaryItemsState }
          groupItems={ groupSummaryItemsState }
        />
        <IntegratedSorting />
        <IntegratedSummary />
        <SearchState />
        <SearchPanel
          messages={ {
            searchPlaceholder: 'Procurar'
          } }
        />
        <IntegratedFiltering />
        <PagingState
          defaultCurrentPage={ 0 }
          defaultPageSize={ 20 }
        />
        <IntegratedPaging />
        <Table
          columnExtensions={ tableColumnExtensionsState }
          containerComponent={ TableContainerComponent }
          noDataCellComponent={ TableNoDataCellComponent }
        />
        <TableColumnReordering
          order={ columnOrder }
          onOrderChange={ changeColumnOrder }
        />
        <TableColumnResizing
          columnWidths={ columnWidth }
          onColumnWidthsChange={ changeColumnWidths }
        />
        <TableGroupRow />
        <TableHeaderRow
          showSortingControls
        />
        <TableColumnVisibility
          defaultHiddenColumnNames={ defaultHiddenColumnNamesState }
        />
        <TableSummaryRow />
        <GroupingPanel
          showSortingControls
          emptyMessageComponent={ GroupingPanelEmptyMessageComponent }
        />
        <PagingPanel
          pageSizes={ [5, 10, 15, 20, 0] }
          containerComponent={ PagingPanelComponent }
          messages={ {
            showAll: 'Mostrar Todos',
            rowsPerPage: 'Registros por página.',
            info: ({ from, to, count }) => `${ from }-${ to } de ${ count }`
          } }
        />
        {
          columnChooser ? <ColumnChooser /> : null
        }
      </Grid>
    </Paper>
  )
}

ResponsiveGrid.propTypes = {
  searchable: PropTypes.bool,
  defaultHiddenColumnNames: PropTypes.array,
  currencyColumns: PropTypes.array,
  groupSummaryItems: PropTypes.array,
  grouping: PropTypes.array,
  tableColumnExtensions: PropTypes.array,
  totalSummaryItems: PropTypes.array,
  pageSizes: PropTypes.array,
  store: PropTypes.object.isRequired,
  columnChooser: PropTypes.bool
}
ResponsiveGrid.defaultProps = {
  searchable: true,
  defaultHiddenColumnNames: [],
  currencyColumns: [],
  groupSummaryItems: [],
  grouping: [],
  tableColumnExtensions: [],
  totalSummaryItems: [],
  pageSizes: [5, 10, 15, 0],
  columnChooser: true
}

export default ResponsiveGrid
