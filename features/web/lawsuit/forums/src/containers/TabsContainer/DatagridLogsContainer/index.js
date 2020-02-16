import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import DatagridClientSide from '@syntesis/c-datagrid/src/containers/ClientSideContainer'
import datagridForumsLogsStore from '../../../stores/datagridForumsLogsStore'

import styles from './styles'

@inject('datagridForumsLogsStore')
@observer
class DatagridLogsContainer extends Component {
  constructor(props) {
    super(props)

    this.refreshDatagrid = this.refreshDatagrid.bind(this)
  }

  componentDidMount() {
    this.props.datagridForumsLogsStore.setItem(this.props.item)
    this.props.datagridForumsLogsStore.registerOnRefresh(this.props.onRefresh)
    this.setParams(get(this.props, 'item.id'))
  }

  componentWillUpdate(nextProps) {
    const oldItem = get(this.props, 'item')
    const nextItem = get(nextProps, 'item')
    if (!isEqual(oldItem, nextItem)) {
      this.props.datagridForumsLogsStore.setItem(nextItem)
      this.setParams(nextItem.id)
    }
  }

  setParams(id) {
    const {
      datagridForumsLogsStore: {
        setParams
      }
    } = this.props

    setParams({ id })
  }

  refreshDatagrid() {
    const {
      datagridForumsLogsStore: {
        getDatagridData
      }
    } = this.props

    getDatagridData()
  }

  render() {
    const {
      // classes,
      datagridForumsLogsStore: store
    } = this.props

    const { getDatagrid } = store

    return (
      <DatagridClientSide
        store={ store }
        totalRecords={ get(getDatagrid, 'data', []).length }
        { ...getDatagrid }
      />
    )
  }
}

DatagridLogsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onRefresh: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  datagridForumsLogsStore: MobxPropTypes.objectOrObservableObject
}

export default flow(
  withStyles(styles),
  withStores({ datagridForumsLogsStore })
)(DatagridLogsContainer)
