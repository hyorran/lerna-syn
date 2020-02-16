import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import ReceiptsFilterModal from '../../../modals/ReceiptsModals/ReceiptsFilterModal'
import ListReceiptsModal from '../../../modals/ReceiptsModals/ListReceiptsModal'
import ListReceiptsTransferModal from '../../../modals/ReceiptsModals/ListReceiptsTransferModal'
import datagridReceiptsStore from '../../../stores/ReceiptsStore/datagridReceiptsStore'
// import GenerateInvoiceModal from '../../modals/GenerateInvoiceModal'

import styles from './styles'

@inject('datagridReceiptsStore')
@observer
class DatagridReceiptsContainer extends Component {
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
      ],
      rowActions: [
        {
          type: 'list',
          condition: ({ synsuiteCode }) => !synsuiteCode,
          modalComponent: ListReceiptsModal,
          modalProps: {
            onSuccess: (item) => {
              const { onRefresh } = this.props
              this.refreshDatagrid()
              onRefresh(item)
            }
          }
        },
        {
          type: 'list-receipt',
          condition: ({ synsuiteCode }) => !synsuiteCode,
          modalComponent: ListReceiptsTransferModal,
          modalProps: {
            onSuccess: () => {
              this.refreshDatagrid()
            }
          }
        }
      ]
    }
  }

  componentWillUnmount() {
    const {
      datagridReceiptsStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridReceiptsStore: {
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
      datagridReceiptsStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridReceiptsStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  refreshDatagrid() {
    const {
      datagridReceiptsStore: {
        getDatagridData
      },
      formCallback
    } = this.props

    getDatagridData()
    formCallback()
  }

  render() {
    const {
      feature,
      datagridReceiptsStore: store,
      clearFilters,
      lastUpdated,
      changeFormControl
    } = this.props

    const { getDatagrid } = store

    const { toolbarButtons } = this.state

    const rowActions = map(this.state.rowActions, (rowAction) => {
      if (rowAction.type === 'list') {
        return {
          ...rowAction,
          modalProps: {
            ...rowAction.modalProps,
            begin: get(getDatagrid, 'params.begin'),
            end: get(getDatagrid, 'params.end')
          }
        }
      }
      if (rowAction.type === 'cash') {
        return {
          ...rowAction,
          modalProps: {
            ...rowAction.modalProps,
            begin: get(getDatagrid, 'params.begin'),
            end: get(getDatagrid, 'params.end')
          }
        }
      }
      return rowAction
    })

    return (
      <DatagridServerSide
        multiSelect
        store={ store }
        changeFormControl={ changeFormControl }
        onActiveRowClick={ this.onActiveRowClick }
        onInactiveRowClick={ this.onInactiveRowClick }
        toolbarButtons={ toolbarButtons }
        rowActions={ rowActions }
        feature={ feature }
        clearFilters={ clearFilters }
        lastUpdated={ lastUpdated }
        advancedFilterModalConfig={ {
          modalComponent: ReceiptsFilterModal,
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

DatagridReceiptsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  changeFormControl: PropTypes.func,
  formCallback: PropTypes.func,
  clearFilters: PropTypes.func,
  onRefresh: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridReceiptsStore: MobxPropTypes.objectOrObservableObject,
  lastUpdated: PropTypes.string.isRequired
}

DatagridReceiptsContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  onRefresh: () => {},
  changeFormControl: () => {},
  clearFilters: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridReceiptsStore })
)(DatagridReceiptsContainer)
