import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridClientSide from '@syntesis/c-datagrid/src/containers/ClientSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridReinfR2020NfsListStore from '../../../stores/datagridReinfR2020NfsListStore'
import SubComponent from './SubComponent'

import styles from './styles'

@inject('datagridReinfR2020NfsListStore')
@observer
class DatagridR2020NfsListContainer extends Component {
  constructor(props) {
    super(props)
    this.refreshDatagrid = this.refreshDatagrid.bind(this)
  }

  componentDidMount() {
    const {
      initialData,
      didMount,
    } = this.props

    this.refreshDatagrid(initialData)
    didMount()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.initialData, this.props.initialData)) {
      this.refreshDatagrid(this.props.initialData)
    }
  }

  componentWillUnmount() {
    this.props.didMount()
    this.props.datagridReinfR2020NfsListStore.resetDatagrid()
  }

  refreshDatagrid(data) {
    const {
      datagridReinfR2020NfsListStore: {
        setData
      }
    } = this.props

    setData(data)
  }

  render() {
    const {
      classes,
      adjustHeight,
      serviceClassifications,
      datagridReinfR2020NfsListStore: store
    } = this.props

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
          title="Notas Fiscais"
          store={ store }
          searchAutoFocus={ false }
          { ...getDatagrid }
          { ...adjusts }
          loading={ false }
          SubComponent={ props => (
            <SubComponent
              { ...props }
              serviceClassifications={ serviceClassifications }
              adjustHeight={ adjustHeight }
            />
          ) }
        />
      </div>
    )
  }
}

DatagridR2020NfsListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  initialData: PropTypes.arrayOf(PropTypes.object),
  didMount: PropTypes.func,
  adjustHeight: PropTypes.func,
  serviceClassifications: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  datagridReinfR2020NfsListStore: MobxPropTypes.objectOrObservableObject
}

DatagridR2020NfsListContainer.defaultProps = {
  initialData: [],
  didMount: () => {},
  adjustHeight: () => {}
}

export default flow(
  withStyles(styles),
  withStores({
    datagridReinfR2020NfsListStore
  })
)(DatagridR2020NfsListContainer)
