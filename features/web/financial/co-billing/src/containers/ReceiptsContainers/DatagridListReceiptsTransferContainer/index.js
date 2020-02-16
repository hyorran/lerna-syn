import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import FormReceiptsTransferModal from '../../../modals/ReceiptsModals/FormReceiptsTransferModal'
import datagridListReceiptsTransferStore from '../../../stores/ReceiptsStore/datagridListReceiptsTransferStore'

import styles from './styles'

@inject('datagridListReceiptsTransferStore')
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
      ],
      rowActions: [
        {
          type: 'cash-receipt',
          condition: () => true,
          disabled: ({ cobillingCompanyPlaceId, bankAccountCompanyPlaceId }) => (
            cobillingCompanyPlaceId === bankAccountCompanyPlaceId
          ),
          tooltip: ({ cobillingCompanyPlaceId, bankAccountCompanyPlaceId }) => (
            cobillingCompanyPlaceId === bankAccountCompanyPlaceId ? ' Impossível faturar quando o local co-billing  e local da conta são o mesmo' : undefined
          ),
          modalComponent: FormReceiptsTransferModal,
          modalProps: {
            parentItem: this.props.parentItem,
            onSuccess: (dialogId) => {
              window.closeDialog(dialogId)
              this.refreshDatagrid()
              props.onSuccess()
            }
          }
        }
      ]
    }
  }

  componentDidMount() {
    const {
      // item: {
      //   cobillingPlaceId,
      //   cobillingCustomerPlaceId
      // },
      parentItem: {
        sumFinCobIds
      },
      datagridListReceiptsTransferStore: {
        setParams
      },
    } = this.props

    setParams({
      // cobillingPlaceId,
      // cobillingCustomerPlaceId,
      ids: sumFinCobIds
    })
  }

  componentWillUnmount() {
    const {
      datagridListReceiptsTransferStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridListReceiptsTransferStore: {
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
      datagridListReceiptsTransferStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridListReceiptsTransferStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  refreshDatagrid() {
    const {
      datagridListReceiptsTransferStore: {
        getDatagridData
      },
      formCallback
    } = this.props

    getDatagridData()
    formCallback()
  }

  render() {
    const { datagridListReceiptsTransferStore: store } = this.props

    const {
      toolbarButtons,
      rowActions
    } = this.state

    const { getDatagrid } = store

    return (
      <DatagridServerSide
        multiSelect
        store={ store }
        onActiveRowClick={ this.onActiveRowClick }
        onInactiveRowClick={ this.onInactiveRowClick }
        toolbarButtons={ toolbarButtons }
        rowActions={ rowActions }
        { ...getDatagrid }
      />
    )
  }
}

DatagridListReceiptsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  parentItem: PropTypes.object,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  clearFilters: PropTypes.func,
  changeFormControl: PropTypes.func,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridListReceiptsTransferStore: MobxPropTypes.objectOrObservableObject
}

DatagridListReceiptsContainer.defaultProps = {
  parentItem: {},
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  clearFilters: () => {},
  changeFormControl: () => {},
  onSuccess: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridListReceiptsTransferStore })
)(DatagridListReceiptsContainer)
