import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import DocReceiptsFilterModal from '../../../modals/ReceiptsModals/DocReceiptsFilterModal'
import ListDocReceiptsModal from '../../../modals/ReceiptsModals/ListDocReceiptsModal'
import datagridDocReceiptsStore from '../../../stores/ReceiptsStore/datagridDocReceiptsStore'
import formDocReceiptsFilterStore from '../../../stores/ReceiptsStore/formDocReceiptsFilterStore'

import styles from './styles'

@inject('datagridDocReceiptsStore')
@inject('formDocReceiptsFilterStore')
@observer
class DatagridDocReceiptsContainer extends Component {
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
          modalComponent: ListDocReceiptsModal,
          modalProps: {
            onSuccess: (item) => {
              const { onRefresh } = this.props
              this.refreshDatagrid()
              onRefresh(item)
            }
          }
        }
      ]
    }
  }

  componentWillUnmount() {
    const {
      datagridDocReceiptsStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridDocReceiptsStore: {
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
      datagridDocReceiptsStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridDocReceiptsStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  refreshDatagrid() {
    const {
      datagridDocReceiptsStore: {
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
      datagridDocReceiptsStore: store,
      formDocReceiptsFilterStore: {
        resetForm,
        changeFormControl
      }
      // clearFilters,
      // changeFormControl
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
        clearFilters={ resetForm }
        advancedFilterModalConfig={ {
          modalComponent: DocReceiptsFilterModal,
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

DatagridDocReceiptsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  // changeFormControl: PropTypes.func,
  formCallback: PropTypes.func,
  // clearFilters: PropTypes.func,
  onRefresh: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridDocReceiptsStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formDocReceiptsFilterStore: MobxPropTypes.objectOrObservableObject
}

DatagridDocReceiptsContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  onRefresh: () => {},
  // changeFormControl: () => {},
  // clearFilters: () => {}
}

export default flow(
  withStyles(styles),
  withStores({
    datagridDocReceiptsStore,
    formDocReceiptsFilterStore
  })
)(DatagridDocReceiptsContainer)
