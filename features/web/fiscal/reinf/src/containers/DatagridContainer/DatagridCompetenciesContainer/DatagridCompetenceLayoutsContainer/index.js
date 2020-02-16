import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridClientSide from '@syntesis/c-datagrid/src/containers/ClientSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import { getReinfFilesLayouts } from '@syntesis/s-reinf'
import datagridCompetenceLayoutsStore from '../../../../stores/datagridCompetenceLayoutsStore'
import datagridReinfCompetenciesStore from '../../../../stores/datagridReinfCompetenciesStore'

import SubComponent from './SubComponent'

import styles from './styles'

@inject('datagridCompetenceLayoutsStore')
@inject('datagridReinfCompetenciesStore')
@observer
class DatagridCompetenceLayoutsContainer extends Component {
  constructor(props) {
    super(props)
    this.initDatagrid = this.initDatagrid.bind(this)
    // this.refreshDatagrid = this.refreshDatagrid.bind(this)

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const {
      datagridReinfCompetenciesStore: {
        getDatagrid: {
          expandedRowIndex
        }
      }
    } = this.props

    if (!isEmpty(expandedRowIndex)) {
      this.initDatagrid()
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.item, this.props.item)) {
      this.initDatagrid()
    }
  }

  async initDatagrid() {
    const {
      item: {
        companyPlaceId,
        competence
      }
    } = this.props
    const { response } = await getReinfFilesLayouts({ companyPlaceId, competence })
    this.refreshDatagrid(response)
  }

  refreshDatagrid(data) {
    const {
      datagridCompetenceLayoutsStore: {
        setData
      }
    } = this.props

    setData(data)
    this.setState(prevState => ({
      ...prevState,
      loading: false
    }))
  }

  render() {
    const {
      classes,
      datagridCompetenceLayoutsStore: store
    } = this.props

    const { loading } = this.state

    const { getDatagrid } = store

    let adjusts = {}
    if (isEmpty(getDatagrid.data)) {
      adjusts = {
        ...adjusts,
        minRows: 3
      }
    }

    return (
      <div className={ classes.container }>
        <DatagridClientSide
          store={ store }
          { ...getDatagrid }
          { ...adjusts }
          loading={ loading }
          SubComponent={ SubComponent }
        />
      </div>
    )
  }
}

DatagridCompetenceLayoutsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  datagridCompetenceLayoutsStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  datagridReinfCompetenciesStore: MobxPropTypes.objectOrObservableObject
}

export default flow(
  withStyles(styles),
  withStores({
    datagridCompetenceLayoutsStore,
    datagridReinfCompetenciesStore
  })
)(DatagridCompetenceLayoutsContainer)
