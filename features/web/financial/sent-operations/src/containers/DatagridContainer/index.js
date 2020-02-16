import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridSentOperationsStore from '../../stores/datagridSentOperationsStore'
import FilterModal from '../../modals/FilterModal'

import styles from './styles'

@inject('datagridSentOperationsStore')
@observer
class DatagridContainer extends Component {
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
      // rowActions: [
      //   {
      //     type: 'file-transmit',
      //     condition: () => true,
      //     onClick: (item) => {
      //       // this.transmitFile({ id: item.id })
      //       console.warn('onSelectClickRow', item)
      //     }
      //   }
      // ]
    }
  }
  //
  // componentDidMount() {
  //   const {
  //     onSelectClickRow
  //   } = this.props
  // }

  componentWillUnmount() {
    const {
      datagridSentOperationsStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridSentOperationsStore: {
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

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridSentOperationsStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  onFilter(filters) {
    const {
      datagridSentOperationsStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  refreshDatagrid() {
    const {
      datagridSentOperationsStore: {
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
      datagridSentOperationsStore: store,
      changeFormControl,
      clearFilters
    } = this.props

    const {
      toolbarButtons,
      rowActions
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
        rowActions={ rowActions }
        feature={ feature }
        clearFilters={ clearFilters }
        advancedFilterModalConfig={ {
          modalComponent: FilterModal,
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

DatagridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  changeFormControl: PropTypes.func,
  clearFilters: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridSentOperationsStore: MobxPropTypes.objectOrObservableObject
}

DatagridContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  changeFormControl: () => {},
  clearFilters: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridSentOperationsStore })
)(DatagridContainer)
