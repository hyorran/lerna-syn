import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import EntriesFilterModal from '../../../modals/EntriesModals/EntriesFilterModal'
import ListEntriesModal from '../../../modals/EntriesModals/ListEntriesModal'
import FormEntriesIssueInvoiceModal from '../../../modals/EntriesModals/FormEntriesIssueInvoiceModal'
import datagridEntriesStore from '../../../stores/EntriesStores/datagridEntriesStore'
import formEntriesFilterStore from '../../../stores/EntriesStores/formEntriesFilterStore'
import { getVerifyCobillingPlaceParameters } from '@syntesis/s-cobilling'

import styles from './styles'

@inject('datagridEntriesStore')
@inject('formEntriesFilterStore')
@observer
class DatagridEntriesContainer extends Component {
  constructor(props) {
    super(props)

    this.refreshDatagrid = this.refreshDatagrid.bind(this)
    this.onActiveRowClick = this.onActiveRowClick.bind(this)
    this.onInactiveRowClick = this.onInactiveRowClick.bind(this)
    this.onFilter = this.onFilter.bind(this)
    this.verifyCobillingPlaceParameters = this.verifyCobillingPlaceParameters.bind(this)
    this.executeOnClick = this.executeOnClick.bind(this)

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
          modalComponent: ListEntriesModal,
          modalProps: {
            onSuccess: (item) => {
              const { onRefresh } = this.props
              this.refreshDatagrid()
              onRefresh(item)
            }
          }
        },
        {
          type: 'cash',
          onClick: item => this.executeOnClick(item),
          condition: () => true,
          disabled: ({ cobillingPlaceId, cobillingCustomerPlaceId }) => (
            cobillingPlaceId === cobillingCustomerPlaceId
          ),
          tooltip: ({ cobillingPlaceId, cobillingCustomerPlaceId }) => (
            cobillingPlaceId === cobillingCustomerPlaceId ? ' Impossível faturar quando o local e cliente são o mesmo' : undefined
          )
        }
      ]
    }
  }

  componentWillUnmount() {
    const {
      datagridEntriesStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridEntriesStore: {
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
      datagridEntriesStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridEntriesStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  async verifyCobillingPlaceParameters({ cobillingPlaceId }) {
    try {
      const { response } = await getVerifyCobillingPlaceParameters({ cobillingPlaceId })
      return response
    } catch (e) {
      return []
    }
  }

  async executeOnClick(item) {

    const { isCobillingPlace } = await this.verifyCobillingPlaceParameters(item)

    if (isCobillingPlace) {
      window.openDialog({
        component: FormEntriesIssueInvoiceModal,
        componentProps: {
          item,
          onSuccess: () => {
            this.refreshDatagrid()
          }
        }
      })
    } else {
      window.snackbar.warn('Parâmetros do Co-Billing não configurados!', { persist: false })
    }
  }

  refreshDatagrid() {
    const {
      datagridEntriesStore: {
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
      lastUpdated,
      datagridEntriesStore: store,
      formEntriesFilterStore: {
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
        lastUpdated={ lastUpdated }
        advancedFilterModalConfig={ {
          modalComponent: EntriesFilterModal,
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

DatagridEntriesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  onRefresh: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridEntriesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formEntriesFilterStore: MobxPropTypes.objectOrObservableObject
}

DatagridEntriesContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  onRefresh: () => {}
}

export default flow(
  withStyles(styles),
  withStores({
    datagridEntriesStore,
    formEntriesFilterStore
  })
)(DatagridEntriesContainer)
