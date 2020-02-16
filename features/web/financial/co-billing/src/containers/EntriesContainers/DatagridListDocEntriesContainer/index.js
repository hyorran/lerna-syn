import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import ListDocEntriesFilterModal from '../../../modals/EntriesModals/ListDocEntriesFilterModal'
import datagridListDocEntriesStore from '../../../stores/EntriesStores/datagridListDocEntriesStore'
import formListDocEntriesFilterStore from '../../../stores/EntriesStores/formListDocEntriesFilterStore'

import styles from './styles'

@inject('datagridListDocEntriesStore')
@inject('formListDocEntriesFilterStore')
@observer
class DatagridListDocEntriesContainer extends Component {
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
        id
      },
      datagridListDocEntriesStore: {
        setParams
      }
    } = this.props

    setParams({
      id
    })
  }

  componentWillUnmount() {
    const {
      datagridListDocEntriesStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridListDocEntriesStore: {
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
      datagridListDocEntriesStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridListDocEntriesStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  refreshDatagrid() {
    const {
      datagridListDocEntriesStore: {
        getDatagridData
      },
      formCallback
    } = this.props

    getDatagridData()
    formCallback()
  }

  render() {
    const {
      datagridListDocEntriesStore: store,
      formListDocEntriesFilterStore: {
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
          modalComponent: ListDocEntriesFilterModal,
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

DatagridListDocEntriesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  begin: PropTypes.string,
  end: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  datagridListDocEntriesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formListDocEntriesFilterStore: MobxPropTypes.objectOrObservableObject
}

DatagridListDocEntriesContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  begin: '',
  end: ''
}

export default flow(
  withStyles(styles),
  withStores({
    datagridListDocEntriesStore,
    formListDocEntriesFilterStore
  })
)(DatagridListDocEntriesContainer)
