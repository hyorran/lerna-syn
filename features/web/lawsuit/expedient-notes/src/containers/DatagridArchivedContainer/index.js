import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridExpedientNotesArchivedStore from '../../stores/datagridExpedientNotesArchivedStore'
import DetailsModal from '../../modals/DetailsModal'
import FilterArchivedModal from '../../modals/FilterArchivedModal'

import styles from './styles'

@inject('datagridExpedientNotesArchivedStore')
@observer
class DatagridArchivedContainer extends Component {
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

  componentWillUnmount() {
    const {
      datagridExpedientNotesArchivedStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridExpedientNotesArchivedStore: {
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

    window.openDialog({
      component: DetailsModal,
      componentProps: {
        item: get(row, 'original'),
        withButtonConfirm: false,
        onInactiveRowClick: this.onInactiveRowClick
      }
    })
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridExpedientNotesArchivedStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  onFilter(filters) {
    const {
      datagridExpedientNotesArchivedStore: {
        setAdvancedFilters
      }
    } = this.props

    const checked = get(filters, 'lawsuitId.checked', null)
    if (checked !== null) {
      filters = {
        ...filters,
        lawsuitId: {
          ...filters.lawsuitId,
          value: null,
          filterOperation: checked ? 'NotEquals' : 'Equals'
        }
      }
    }

    setAdvancedFilters(filters)
  }

  refreshDatagrid() {
    const {
      datagridExpedientNotesArchivedStore: {
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
      datagridExpedientNotesArchivedStore: store,
      changeFormControl,
      clearFilters
    } = this.props

    const { toolbarButtons } = this.state

    const { getDatagrid } = store

    return (
      <DatagridServerSide
        multiSelect
        store={ store }
        changeFormControl={ changeFormControl }
        onActiveRowClick={ () => {} }
        onInactiveRowClick={ this.onInactiveRowClick }
        onDoubleClick={ this.onActiveRowClick }
        toolbarButtons={ toolbarButtons }
        feature={ feature }
        clearFilters={ clearFilters }
        advancedFilterModalConfig={ {
          modalComponent: FilterArchivedModal,
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

DatagridArchivedContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  clearFilters: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridExpedientNotesArchivedStore: MobxPropTypes.objectOrObservableObject
}

DatagridArchivedContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  clearFilters: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridExpedientNotesArchivedStore })
)(DatagridArchivedContainer)
