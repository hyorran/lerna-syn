import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import omitBy from 'lodash/omitBy'
import find from 'lodash/find'
import debounce from 'lodash/debounce'
import flow from 'lodash/fp/flow'
import filterFP from 'lodash/fp/filter'
import uniq from 'lodash/fp/uniq'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import ReactTable from 'react-table'
import { withStyles } from '@material-ui/core/styles'
import Colors from '@syntesis/c-styles/src/styles/Colors'
import CircularLoader from '@syntesis/c-loaders/src/components/Circular'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@syntesis/c-icons/src/WarningIcon'
import ExpandInDatagridIconButton
  from '@syntesis/c-buttons/src/components/IconButton/ExpandInDatagridIconButton'
import ExpandOutDatagridIconButton
  from '@syntesis/c-buttons/src/components/IconButton/ExpandOutDatagridIconButton'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'
import ErrorIcon from '@syntesis/c-icons/src/ErrorIcon'
import PaginationComponent from '../../components/Pagination'
import ToolbarComponent from '../../components/Toolbar'
import RowActionsComponent from '../../components/RowActions'
import SubComponentComponent from '../../components/SubComponent'
import { setColumnsWidth } from '../../utils'

import styles from './styles'

class DatagridContainer extends Component {
  static getDerivedStateFromProps(props, state) {
    const {
      rowActions,
      columns,
      data
    } = props

    let newColumns = [...columns]

    if (!isEmpty(rowActions) && isEmpty(find(newColumns, { id: 'rowActions' }))) {
      newColumns = DatagridContainer.injectRowActions({ columns: newColumns, rowActions, data })
    }
    newColumns = setColumnsWidth(newColumns, props.data)

    return {
      ...state,
      columns: [...newColumns]
    }
  }

  // Insere coluna com ações da linha
  static injectRowActions = ({ columns, rowActions, data }) => {

    /* validação para contar o tamanho da coluna das ações */
    let countActions = 0
    let totalCountActions = 0
    const listTypeActions = []
    const listConditionActions = []
    const listDisabledActions = []

    forEach(rowActions, (rowAction) => {
      forEach(data, (item) => {
        if (!isEmpty(rowAction)) {
          const condition = get(rowAction, 'condition', undefined)
          const disabled = get(rowAction, 'disabled', undefined)
          const type = get(rowAction, 'type')

          if (isFunction(condition)) {
            if (condition(item) && disabled === undefined) {
              if (find(listConditionActions, action => action === condition) === undefined) {
                listConditionActions.push(condition)
                listTypeActions.push(type)
                countActions += 1
              } else if (find(listTypeActions, action => action === type) === undefined) {
                listTypeActions.push(type)
                countActions += 1
              }
            }
          }
          if (isFunction(disabled)) {
            if (find(listDisabledActions, action => action === disabled) === undefined) {
              listDisabledActions.push(disabled)
              listTypeActions.push(type)
              countActions += 1
            } else if (find(listTypeActions, action => action === type) === undefined) {
              listTypeActions.push(type)
              countActions += 1
            }
          }

          if (countActions > totalCountActions) {
            totalCountActions = countActions
          }
        }
      })
    })
    totalCountActions = totalCountActions !== 0 ? totalCountActions : 1

    // const rowWidth = !isEmpty(rowActions) ? (50 * rowActions.length) : 100;
    const rowWidth = !isEmpty(rowActions) ? (50 * totalCountActions) : 100;
    columns.push({
      Header: 'Ações',
      id: 'rowActions',
      resizable: false,
      sortable: false,
      filterable: false,
      width: rowWidth,
      style: {
        justifyContent: 'center'
      },
      Cell({ original }) {
        return <RowActionsComponent actions={ rowActions } item={ original } />
      }
    })
    return columns
  }

  constructor(props) {
    super(props)
    this.onClickRow = this.onClickRow.bind(this)
    this.injectCheckboxColumn = this.injectCheckboxColumn.bind(this)
    this.injectExpanderColumn = this.injectExpanderColumn.bind(this)
    this.changeTd = this.changeTd.bind(this)
    this.changeTh = this.changeTh.bind(this)

    this.state = {
      columns: [],
      pageSizeOptions: sortBy(flow(
        filterFP(option => !!option),
        uniq
      )([5, 10, 20, 25, 50, 100, props.params.PageSize])),
    }
  }

  componentWillUnmount() {
    this.props.store.resetDatagrid()
  }

  onClickRow(rowInfo, isActive) {
    const {
      disableInactiveRow,
      onActiveRowClick,
      onInactiveRowClick
    } = this.props

    if (isActive && !disableInactiveRow && isFunction(onInactiveRowClick)) {
      onInactiveRowClick(rowInfo)
    } else if (isFunction(onActiveRowClick)) {
      onActiveRowClick(rowInfo)
    }
  }

  injectCheckboxColumn(columns) {
    const {
      store: {
        onCheckRow,
        onToggleCheckedRows,
        checkedAllOnPage,
        getDatagrid: {
          checkedRows,
          apiKey,
          totalizers
        }
      }
    } = this.props

    const multiSelectColumn = {
      Header: (
        <Checkbox
          light
          checked={ !!checkedAllOnPage }
          indeterminate={ checkedAllOnPage === null }
          name="datagrid-multiSelect"
          onChange={ onToggleCheckedRows }
        />
      ),
      id: 'multiSelect',
      resizable: false,
      sortable: false,
      filterable: false,
      width: 50,
      style: {
        justifyContent: 'center',
        padding: 0
      },
      headerStyle: {
        padding: 0
      },
      getFooterProps: () => ({
        style: {
          padding: [7, 5],
          fontWeight: Fonts.fontWeight.bold,
          textAlign: 'center'
        }
      }),
      // eslint-disable-next-line react/prop-types
      Cell({ original }) {
        const apiRef = `${ original[apiKey] }`
        const isChecked = !isEmpty(find(
          checkedRows,
          item => item === apiRef
        ))

        return (
          <Checkbox
            color="primary"
            name={ `multiSelect-${ apiRef }` }
            onChange={ onCheckRow }
            checked={ isChecked }
            value={ apiRef }
          />
        )
      },
      Footer: !isEmpty(totalizers)
        ? 'Total'
        : undefined
    }
    return [
      multiSelectColumn,
      ...columns
    ]
  }

  injectExpanderColumn(columns) {
    const expanderColumn = {
      // Header: 'Expand',
      expander: true,
      width: 30,
      Expander: ({ isExpanded }) => {
        const IconButtonComponent = isExpanded
          ? ExpandOutDatagridIconButton
          : ExpandInDatagridIconButton

        return (
          <IconButtonComponent
            onTable
            disableRipple
            debounceReverse
            onClick={ () => {} }
          />
        )
      },
      style: {
        cursor: 'pointer',
        fontSize: 25,
        padding: '0',
        justifyContent: 'center',
        textAlign: 'center',
        userSelect: 'none'
      },
      id: 'expander',
      resizable: false,
      sortable: false,
      filterable: false,
      headerStyle: {
        padding: 0
      }
    }

    return [
      expanderColumn,
      ...columns
    ]
  }

  applyFlexCell() {
    return {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }

  changeTd(state, rowInfo, column) {
    const {
      onActiveRowClick,
      onDoubleClick,
      store: {
        getDatagrid: {
          activeRowIndex
        }
      }
    } = this.props

    let tdProps = {
      style: {
        ...this.applyFlexCell()
      }
    }

    let active = false
    if (rowInfo && rowInfo.row) {
      if (activeRowIndex === rowInfo.index) {
        active = true
        tdProps = {
          ...tdProps,
          style: {
            ...tdProps.style,
            background: Colors.lightBlue,
            color: Colors.text,
          }
        }
      }
    }

    // Não dispara eventos da linha caso seja na coluna rowActions ou checkboxes
    if (
      column.id !== 'rowActions' &&
      column.id !== 'multiSelect' &&
      column.id !== 'expander'
    ) {
      if (rowInfo && rowInfo.row) {
        const onLastClick = debounce(
          ({ fromSingle }) => {
            if (onDoubleClick) {
              if (fromSingle) {
                this.onClickRow(rowInfo, active)
              } else {
                if (!active) {
                  this.onClickRow(rowInfo, false)
                }
                onDoubleClick(rowInfo)
              }
            } else {
              this.onClickRow(rowInfo, active)
            }
          },
          200
        )

        tdProps = {
          ...tdProps,
          style: {
            ...tdProps.style,
            cursor: isFunction(onActiveRowClick) ? 'pointer' : 'normal'
          },
          onClick: () => onLastClick({ fromSingle: true }),
          onDoubleClick: () => onLastClick({ fromSingle: false })
        }
      }
    }

    return tdProps
  }

  changeTh(...configs) {
    const { getTheadThProps } = this.props
    let merge = {}
    if (isFunction(getTheadThProps)) {
      merge = getTheadThProps(...configs)
    }
    return {
      ...merge,
      style: {
        ...get(merge, 'style', {}),
        ...this.applyFlexCell(),
        justifyContent: 'center'
      }
    }
  }

  renderPagination(props) {
    const {
      pageSize,
      totalRecords
    } = props

    if (totalRecords > pageSize) {
      return <PaginationComponent { ...omitBy(props, (_, key) => key === 'classes') } />
    }
    return null
  }

  render() {
    const {
      classes,
      datagridRef,
      data,
      onSearch,
      advancedFilterModalConfig,
      params: {
        PageSize: pageSize,
        OrderBy: orderBy
      },
      totalRecords,
      filterable,
      noDataText,
      errorText1,
      errorText2,
      toolbarButtons,
      multiSelect,
      feature,
      clearFilters,
      changeFormControl,
      lastUpdated,
      SubComponent,
      SubComponentProps,
      customOptions,
      endpoint,
      searchLabel,
      searchInputComponent,
      searchAutoFocus,
      title,
      store: {
        onExpandedChanged,
        removeAllAdvancedFilters,
        removeAdvancedFilter,
        checkedRowsOnPage,
        getDatagridData,
        getDatagrid: datagrid,
        setParams,
        hasError,
      }
    } = this.props

    let { columns } = this.state
    const { pageSizeOptions } = this.state
    const originalColumns = { ...columns }
    const {
      expandedRowIndex,
      isExpanded,
      loading
    } = datagrid

    let DatagridSubComponent
    if (SubComponent) {
      columns = this.injectExpanderColumn(columns)
      DatagridSubComponent = props => (
        <SubComponentComponent { ...{ ...props, ...SubComponentProps } }>
          { SubComponent }
        </SubComponentComponent>
      )
    }

    if (multiSelect) {
      columns = this.injectCheckboxColumn(columns)
    }

    const totalText = (
      <div className={ classes.totalRecords }>
        Total: <b>{ totalRecords }</b> registro{ totalRecords > 1 ? 's' : null }
      </div>
    )

    if (multiSelect) {
      const totalChecked = checkedRowsOnPage.length
      const plural = totalChecked > 1 ? 's' : ''
      const labelChecked = totalChecked
        ? `${ totalChecked } registro${ plural } selecionado${ plural } nesta página`
        : ''

      columns = [{
        Header: labelChecked,
        headerStyle: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: totalChecked ? 5 : 0,
          backgroundColor: Colors.secondary,
          color: Colors.white,
          height: totalChecked ? 'auto' : 0,
          transition: 'all 0.05s linear'
        },
        columns
      }]
    }

    const sorting = {}
    if (!isEmpty(orderBy)) {
      sorting.defaultSorted = map(orderBy, ({ PropertyName, Dir }) => ({
        id: PropertyName,
        desc: Dir === 'd'
      }))
    }

    const searchableKeys = filter(originalColumns, column => column.searchable)
    const activatedFilters = filter(originalColumns, column => column.filterActive)

    let emptyText = !loading
      ? (
        <Typography component="p" noWrap={ false }>
          { noDataText }
        </Typography>
      )
      : ''

    if (hasError) {
      emptyText = (
        <div className={ classes.errorTextContainer }>
          <ErrorIcon color="secondary" />
          <div>
            <Typography component="p" color="secondary" noWrap={ false }>
              { errorText1 }
            </Typography>
            <Typography component="p" color="secondary" noWrap={ false }>
              { errorText2 }
            </Typography>
          </div>
        </div>
      )
    }

    return (
      <div className={ classes.container }>
        {
          !isEmpty(title)
            ? <Typography color={ isExpanded ? 'primary' : undefined } >{ title }</Typography>
            : null
        }
        <ToolbarComponent
          endpoint={ endpoint }
          getDatagridData={ getDatagridData }
          customOptions={ customOptions }
          multiSelect={ multiSelect }
          searchableKeys={ searchableKeys }
          activatedFilters={ activatedFilters }
          onSearch={ onSearch }
          searchInputComponent={ searchInputComponent }
          searchLabel={ searchLabel }
          searchAutoFocus={ searchAutoFocus }
          period={ datagrid.period }
          onChangePeriod={ newPeriod => setParams(newPeriod) }
          onRemoveAdvancedFilter={ (advancedFilter) => {
            removeAdvancedFilter(advancedFilter)
            changeFormControl(advancedFilter.accessor, {
              ...advancedFilter.filterFromForm,
              checked: null,
              value: ''
            }, true)
          } }
          buttons={ toolbarButtons }
          checkedRows={ checkedRowsOnPage }
          datagridColumns={ datagrid.columns }
          feature={ feature }
          advancedFilterModalConfig={ advancedFilterModalConfig }
          clearFilters={ () => {
            clearFilters()
            removeAllAdvancedFilters()
          } }
        />

        <div className={ classes.tableContainer }>
          <ReactTable
            ref={ datagridRef }
            minRows={ Math.min(data.length || 5, pageSize) }
            { ...this.props }
            { ...sorting }
            className={ [classes.container, '-striped -highlight'].join(' ') }
            columns={ columns }
            data={ data }
            defaultPageSize={ pageSize }
            noDataText={ emptyText }
            pageSizeOptions={ pageSizeOptions }
            ofText="de"
            pageText="Página"
            totalText={ totalText }
            PaginationComponent={ this.renderPagination }
            rowsText="por página"
            getTrProps={ this.changeTr }
            getTdProps={ this.changeTd }
            getTheadThProps={ this.changeTh }
            filterable={ filterable }
            expanded={ expandedRowIndex }
            onExpandedChange={ (...params) => {
              const response = onExpandedChanged(...params)
              this.props.onExpandedChanged(response)
            } }
            SubComponent={ DatagridSubComponent }
            loadingText={ <CircularLoader visible={ this.props.loading } delay={ false } /> }
          />
        </div>

        {
          !isEmpty(lastUpdated)
            ? (
              <div className={ classes.lastUpdated }>
                <Chip
                  label={ lastUpdated }
                  // variant="outlined"
                  classes={ {
                    root: classes.chip
                  } }
                  avatar={
                    <Avatar className={ classes.avatarUpdated }>
                      <WarningIcon />
                    </Avatar>
                  }
                />
              </div>
            )
            : null
        }
      </div>
    )
  }
}

DatagridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  datagridRef: PropTypes.func,
  endpoint: PropTypes.string,
  onSearch: PropTypes.func,
  clearFilters: PropTypes.func,
  changeFormControl: PropTypes.func,
  onDoubleClick: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  totalRecords: PropTypes.number,
  onActiveRowClick: PropTypes.func,
  onInactiveRowClick: PropTypes.func,
  filterable: PropTypes.bool,
  advancedFilterModalConfig: PropTypes.object,
  noDataText: PropTypes.string,
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
  feature: PropTypes.object,
  multiSelect: PropTypes.bool,
  checkedRows: PropTypes.arrayOf(PropTypes.string),
  activeRowIndex: PropTypes.number,
  toolbarButtons: PropTypes.array,
  disableInactiveRow: PropTypes.bool,
  lastUpdated: PropTypes.string,
  SubComponent: PropTypes.func,
  SubComponentProps: PropTypes.object,
  onExpandedChanged: PropTypes.func,
  rowActions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    condition: PropTypes.func.isRequired,
  })),
  params: PropTypes.shape({
    PageSize: PropTypes.number,
    OrderBy: PropTypes.array
  }),
  customOptions: PropTypes.array,
  searchLabel: PropTypes.string,
  searchInputComponent: PropTypes.func,
  getTheadThProps: PropTypes.func,
  searchAutoFocus: PropTypes.bool,
  title: PropTypes.string
}

DatagridContainer.defaultProps = {
  datagridRef: () => {},
  onSearch: () => {},
  endpoint: null,
  onActiveRowClick: null,
  onDoubleClick: null,
  onInactiveRowClick: null,
  clearFilters: () => {},
  changeFormControl: () => {},
  getTheadThProps: null,
  filterable: false,
  advancedFilterModalConfig: {},
  totalRecords: 0,
  noDataText: 'Nenhuma informação encontrada.',
  errorText1: 'Detectamos uma falha ao carregar os dados.',
  errorText2: 'Por favor tente novamente mais tarde.',
  feature: {},
  multiSelect: false,
  checkedRows: [],
  activeRowIndex: null,
  rowActions: [],
  toolbarButtons: [],
  disableInactiveRow: false,
  lastUpdated: null,
  SubComponent: null,
  SubComponentProps: {},
  onExpandedChanged: () => {},
  params: {
    PageSize: 10,
    OrderBy: []
  },
  customOptions: [],
  searchLabel: undefined,
  searchInputComponent: undefined,
  searchAutoFocus: true,
  title: null
}

export default withStyles(styles)(DatagridContainer)
