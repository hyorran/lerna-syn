import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import ListReceiptsFilterModal from '../../../modals/ReceiptsModals/ListReceiptsFilterModal'
import datagridListReceiptsStore from '../../../stores/ReceiptsStore/datagridListReceiptsStore'

import styles from './styles'

@inject('datagridListReceiptsStore')
@observer
class DatagridListReceiptsContainer extends Component {
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
      item: {
        cobillingPlaceId,
        cobillingCustomerPlaceId,
        sumFinCobIds
      },
      datagridListReceiptsStore: {
        setParams
      }
    } = this.props

    setParams({
      cobillingPlaceId,
      cobillingCustomerPlaceId,
      ids: sumFinCobIds
    })
  }

  componentWillUnmount() {
    const {
      datagridListReceiptsStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridListReceiptsStore: {
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
      datagridListReceiptsStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridListReceiptsStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  refreshDatagrid() {
    const {
      datagridListReceiptsStore: {
        getDatagridData
      },
      formCallback
    } = this.props

    getDatagridData()
    formCallback()
  }

  render() {
    const {
      datagridListReceiptsStore: store,
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
          modalComponent: ListReceiptsFilterModal,
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

DatagridListReceiptsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  clearFilters: PropTypes.func,
  changeFormControl: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridListReceiptsStore: MobxPropTypes.objectOrObservableObject
}

DatagridListReceiptsContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  clearFilters: () => {},
  changeFormControl: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridListReceiptsStore })
)(DatagridListReceiptsContainer)
