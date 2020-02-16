import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridReinfStore from '../../stores/datagridReinfStore'
import GenerateFileModal from '../../modals/GenerateFileModal'
import DatagridCompetenciesContainer from './DatagridCompetenciesContainer'

import styles from './styles'

@inject('datagridReinfStore')
@observer
class DatagridContainer extends Component {
  constructor(props) {
    super(props)
    this.refreshDatagrid = this.refreshDatagrid.bind(this)

    this.state = {
      rowActions: [
        {
          type: 'file-upload',
          condition: ({ synsuiteCode }) => !synsuiteCode,
          modalComponent: GenerateFileModal,
          modalProps: {
            onSuccess: (item) => {
              const { onRefresh } = this.props
              this.refreshDatagrid()
              onRefresh(item)
            }
            // name: ({ code, title }) => `${ code } - ${ title }`
          }
        }
      ]
    }
  }

  refreshDatagrid() {
    const {
      datagridReinfStore: {
        getDatagridData
      }
    } = this.props

    getDatagridData()
  }

  render() {
    const {
      feature,
      datagridReinfStore: store,
    } = this.props

    const { rowActions } = this.state

    const { getDatagrid } = store

    return (
      <DatagridServerSide
        store={ store }
        rowActions={ rowActions }
        feature={ feature }
        onExpandedChanged={ this.onExpandedChanged }
        SubComponent={ DatagridCompetenciesContainer }
        { ...getDatagrid }
      />
    )
  }
}

DatagridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  onRefresh: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridReinfStore: MobxPropTypes.objectOrObservableObject
}

DatagridContainer.defaultProps = {
  onRefresh: () => {}
}

export default flow(
  withStyles(styles),
  withStores({
    datagridReinfStore,
  })
)(DatagridContainer)
