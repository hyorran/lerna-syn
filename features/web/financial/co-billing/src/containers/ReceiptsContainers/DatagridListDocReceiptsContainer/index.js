import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import ReceiptsListFilterModal from '../../../modals/ReceiptsModals/ListReceiptsFilterModal'
import datagridListDocReceiptsStore from '../../../stores/ReceiptsStore/datagridListDocReceiptsStore'

import styles from './styles'

@inject('datagridListDocReceiptsStore')
@observer
class DatagridListDocReceiptsContainer extends Component {
  constructor(props) {
    super(props)

    this.refreshDatagrid = this.refreshDatagrid.bind(this)
    this.onActiveRowClick = this.onActiveRowClick.bind(this)
    this.onInactiveRowClick = this.onInactiveRowClick.bind(this)
    this.onFilter = this.onFilter.bind(this)

    this.state = {
      toolbarButtons: [
        {
          type: 'export'
        }
      ]
    }
  }

  componentDidMount() {
    const {
      item: { id },
      datagridListDocReceiptsStore: {
        setParams
      }
    } = this.props

    setParams({ id })
  }

  componentWillUnmount() {
    const {
      datagridListDocReceiptsStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridListDocReceiptsStore: {
        onRowClick
      }
    } = this.props

    const {
      index,
      original: {
        id
      }
    } = row

    onRowClick({ index })
    onSelectClickRow({ id })
  }

  onFilter(filters) {
    const {
      datagridListDocReceiptsStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridListDocReceiptsStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  refreshDatagrid() {
    const {
      datagridListDocReceiptsStore: {
        getDatagridData
      },
      formCallback
    } = this.props

    getDatagridData()
    formCallback()
  }

  render() {
    const {
      datagridListDocReceiptsStore: store,
      clearFilters,
      changeFormControl
    } = this.props

    const {
      toolbarButtons
    } = this.state

    const { getDatagrid } = store

    return (
      <DatagridServerSide
        multiSelect
        store={ store }
        changeFormControl={ changeFormControl }
        onActiveRowClick={ this.onActiveRowClick }
        onInactiveRowClick={ this.onInactiveRowClick }
        toolbarButtons={ toolbarButtons }
        clearFilters={ clearFilters }
        advancedFilterModalConfig={ {
          modalComponent: ReceiptsListFilterModal,
          modalProps: {
            onSuccess: ({ dialogId, controlsAfterValidation }) => {
              this.onFilter(controlsAfterValidation)
              window.closeDialog(dialogId)
            }
          }
        } }
        { ...getDatagrid }
      />
    )
  }
}

DatagridListDocReceiptsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  clearFilters: PropTypes.func,
  changeFormControl: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridListDocReceiptsStore: MobxPropTypes.objectOrObservableObject
}

DatagridListDocReceiptsContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  clearFilters: () => {},
  changeFormControl: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridListDocReceiptsStore })
)(DatagridListDocReceiptsContainer)
