import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridExpedientNotesRevisedStore from '../../stores/datagridExpedientNotesRevisedStore'
import DetailsModal from '../../modals/DetailsModal'
import FilterRevisedModal from '../../modals/FilterRevisedModal'

import styles from './styles'

@inject('datagridExpedientNotesRevisedStore')
@observer
class DatagridRevisedContainer extends Component {
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
      datagridExpedientNotesRevisedStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridExpedientNotesRevisedStore: {
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
      datagridExpedientNotesRevisedStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  onFilter(filters) {
    const {
      datagridExpedientNotesRevisedStore: {
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
      datagridExpedientNotesRevisedStore: {
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
      datagridExpedientNotesRevisedStore: store,
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
          modalComponent: FilterRevisedModal,
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

DatagridRevisedContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  clearFilters: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridExpedientNotesRevisedStore: MobxPropTypes.objectOrObservableObject
}

DatagridRevisedContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  clearFilters: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridExpedientNotesRevisedStore })
)(DatagridRevisedContainer)
