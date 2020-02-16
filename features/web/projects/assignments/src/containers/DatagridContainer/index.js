import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridAssignmentsStore from '../../stores/datagridAssignmentsStore'
import ForwardModal from '../../modals/ForwardModal'
import CancelModal from '../../modals/CancelModal'
import FilterModal from '../../modals/FilterModal'
import DetailsModal from '../../modals/DetailsModal'

import styles from './styles'

@inject('datagridAssignmentsStore')
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
          type: 'export',
          filenameRef: 'Atividades/Prazos'
        }
      ],
      rowActions: [
        {
          type: 'forward',
          condition: () => true,
          modalComponent: ForwardModal,
          modalProps: {
            contentComponentProps: {
              createMode: true,
              onSuccess: (dialogId) => {
                window.closeDialog(dialogId)
                this.refreshDatagrid()
              }
            }
          }
        },
        {
          type: 'cancel',
          condition: ({ synsuiteCode }) => !synsuiteCode,
          modalComponent: CancelModal,
          modalProps: {
            onSuccess: (dialogId) => {
              window.closeDialog(dialogId)
              this.refreshDatagrid()
            }
          }
        }
      ]
    }
  }

  componentWillUnmount() {
    const {
      datagridAssignmentsStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridAssignmentsStore: {
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
        loading: true,
        onInactiveRowClick: this.onInactiveRowClick,
        // withButtonConfirm: false,
        buttonCancel: {
          children: 'Fechar'
        }
      }
    })
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridAssignmentsStore: {
        onRowClick
      }
    } = this.props

    onUnselectClickRow()
    onRowClick({ index: null })
  }

  onFilter(filters) {
    const {
      datagridAssignmentsStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  refreshDatagrid() {
    const {
      datagridAssignmentsStore: {
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
      datagridAssignmentsStore: store,
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
        onActiveRowClick={ () => {} }
        onInactiveRowClick={ this.onInactiveRowClick }
        onDoubleClick={ this.onActiveRowClick }
        toolbarButtons={ toolbarButtons }
        rowActions={ rowActions }
        feature={ feature }
        clearFilters={ clearFilters }
        changeFormControl={ changeFormControl }
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
  clearFilters: PropTypes.func,
  changeFormControl: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridAssignmentsStore: MobxPropTypes.objectOrObservableObject
}

DatagridContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  clearFilters: () => {},
  changeFormControl: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridAssignmentsStore })
)(DatagridContainer)
