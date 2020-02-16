import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '../../containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridActtypesStore from './store'

import styles from './styles'

@inject('datagridActtypesStore')
@observer
class DatagridActtypesContainer extends Component {
  constructor(props) {
    super(props)

    this.refreshDatagrid = this.refreshDatagrid.bind(this)
    this.onActiveRowClick = this.onActiveRowClick.bind(this)
    this.onInactiveRowClick = this.onInactiveRowClick.bind(this)
  }

  componentWillUnmount() {
    const {
      datagridActtypesStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridActtypesStore: {
        onRowClick
      }
    } = this.props

    const {
      index,
      original
    } = row

    onRowClick({ index })
    onSelectClickRow(original)
  }

  onInactiveRowClick(row) {
    const {
      onUnselectClickRow,
      datagridActtypesStore: {
        onRowClick
      }
    } = this.props

    const { original } = row

    onRowClick({ index: null })
    onUnselectClickRow(original)
  }

  refreshDatagrid() {
    const {
      datagridActtypesStore: {
        getDatagridData
      },
      formCallback
    } = this.props

    getDatagridData()
    formCallback()
  }

  render() {
    const {
      datagridActtypesStore: store,
      dialogId,
      onDblClick
    } = this.props

    const { getDatagrid } = store

    return (
      <DatagridServerSide
        // multiSelect
        onDoubleClick={
          () => onDblClick(dialogId)
        }
        store={ store }
        onActiveRowClick={ this.onActiveRowClick }
        onInactiveRowClick={ this.onInactiveRowClick }
        { ...getDatagrid }
      />
    )
  }
}

DatagridActtypesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  onDblClick: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridActtypesStore: MobxPropTypes.objectOrObservableObject
}

DatagridActtypesContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  onDblClick: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridActtypesStore })
)(DatagridActtypesContainer)
