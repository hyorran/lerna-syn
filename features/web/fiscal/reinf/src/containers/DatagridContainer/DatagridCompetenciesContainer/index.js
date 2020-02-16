import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import toString from 'lodash/toString'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { withStores } from '@syntesis/c-stores-provider'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import datagridReinfCompetenciesStore from '../../../stores/datagridReinfCompetenciesStore'
import RegenerateFileModal from '../../../modals/RegenerateFileModal'
import SubComponent from './SubComponent'

import styles from './styles'

@inject('datagridReinfCompetenciesStore')
@observer
class DatagridCompetenciesContainer extends Component {
  constructor(props) {
    super(props)
    this.refreshDatagrid = this.refreshDatagrid.bind(this)

    this.state = {
      toolbarButtons: [],
      rowActions: [
        {
          type: 'file-disable',
          condition: ({ count }) => toString(count) !== '0',
          modalComponent: RegenerateFileModal,
          modalProps: {
            onSuccess: this.refreshDatagrid
          }
        }
      ]
    }
  }

  componentDidMount() {
    const {
      item: {
        id: companyPlaceId
      },
      datagridReinfCompetenciesStore: {
        setParams
      }
    } = this.props

    setParams({ companyPlaceId })
  }

  componentWillUnmount() {
    const {
      datagridReinfCompetenciesStore: {
        resetDatagrid
      }
    } = this.props
    resetDatagrid()
  }

  refreshDatagrid() {
    const {
      datagridReinfCompetenciesStore: {
        getDatagridData
      },
    } = this.props
    getDatagridData()
  }

  render() {
    const {
      datagridReinfCompetenciesStore: store
    } = this.props

    const {
      toolbarButtons,
      rowActions
    } = this.state

    const { getDatagrid } = store

    return (
      <DatagridServerSide
        store={ store }
        toolbarButtons={ toolbarButtons }
        rowActions={ rowActions }
        SubComponent={ props => <SubComponent { ...props } /> }
        { ...getDatagrid }
      />
    )
  }
}
DatagridCompetenciesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  onRefresh: PropTypes.func,
  item: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  datagridReinfCompetenciesStore: MobxPropTypes.objectOrObservableObject
}

DatagridCompetenciesContainer.defaultProps = {
  onRefresh: () => {},
}

export default flow(
  withStyles(styles),
  withStores({ datagridReinfCompetenciesStore })
)(DatagridCompetenciesContainer)
