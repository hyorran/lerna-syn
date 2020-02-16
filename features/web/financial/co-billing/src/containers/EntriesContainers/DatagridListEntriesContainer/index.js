import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import ListEntriesFilterModal from '../../../modals/EntriesModals/ListEntriesFilterModal'
import datagridListEntriesStore from '../../../stores/EntriesStores/datagridListEntriesStore'
import formListEntriesFilterStore from '../../../stores/EntriesStores/formListEntriesFilterStore'

import styles from './styles'

@inject('datagridListEntriesStore')
@inject('formListEntriesFilterStore')
@observer
class DatagridListEntriesContainer extends Component {
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
      datagridListEntriesStore: {
        setParams
      },
      // begin,
      // end
    } = this.props

    setParams({
      cobillingPlaceId,
      cobillingCustomerPlaceId,
      ids: sumFinCobIds
      // begin,
      // end
    })

  }

  componentWillUnmount() {
    const {
      datagridListEntriesStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridListEntriesStore: {
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
      datagridListEntriesStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridListEntriesStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  refreshDatagrid() {
    const {
      datagridListEntriesStore: {
        getDatagridData
      },
      formCallback
    } = this.props

    getDatagridData()
    formCallback()
  }

  render() {
    const {
      datagridListEntriesStore: store,
      formListEntriesFilterStore: {
        resetForm,
        changeFormControl
      }
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
        clearFilters={ resetForm }
        advancedFilterModalConfig={ {
          modalComponent: ListEntriesFilterModal,
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

DatagridListEntriesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  begin: PropTypes.string,
  end: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  datagridListEntriesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formListEntriesFilterStore: MobxPropTypes.objectOrObservableObject
}

DatagridListEntriesContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  begin: '',
  end: ''
}

export default flow(
  withStyles(styles),
  withStores({
    datagridListEntriesStore,
    formListEntriesFilterStore
  })
)(DatagridListEntriesContainer)
