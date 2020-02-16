import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import DocEntriesFilterModal from '../../../modals/EntriesModals/DocEntriesFilterModal'
import ListDocEntriesModal from '../../../modals/EntriesModals/ListDocEntriesModal'
import datagridDocEntriesStore from '../../../stores/EntriesStores/datagridDocEntriesStore'
import formDocEntriesFilterStore from '../../../stores/EntriesStores/formDocEntriesFilterStore'

import styles from './styles'

@inject('datagridDocEntriesStore')
@inject('formDocEntriesFilterStore')
@observer
class DatagridDocEntriesContainer extends Component {
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
          modalComponent: ListDocEntriesModal,
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
      datagridDocEntriesStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridDocEntriesStore: {
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
      datagridDocEntriesStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridDocEntriesStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  refreshDatagrid() {
    const {
      datagridDocEntriesStore: {
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
      datagridDocEntriesStore: store,
      formDocEntriesFilterStore: {
        resetForm,
        changeFormControl
      }
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
          modalComponent: DocEntriesFilterModal,
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

DatagridDocEntriesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  onRefresh: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridDocEntriesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formDocEntriesFilterStore: MobxPropTypes.objectOrObservableObject
}

DatagridDocEntriesContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  onRefresh: () => {}
}

export default flow(
  withStyles(styles),
  withStores({
    datagridDocEntriesStore,
    formDocEntriesFilterStore
  })
)(DatagridDocEntriesContainer)
