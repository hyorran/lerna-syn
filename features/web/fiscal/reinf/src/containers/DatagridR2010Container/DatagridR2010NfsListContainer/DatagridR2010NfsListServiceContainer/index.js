import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import find from 'lodash/find'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridClientSide from '@syntesis/c-datagrid/src/containers/ClientSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridReinfR2010NfsListServiceStore from '../../../../stores/datagridReinfR2010NfsListServiceStore'
import SubComponent from './SubComponent'

import styles from './styles'
import toString from 'lodash/toString'

@inject('datagridReinfR2010NfsListServiceStore')
@observer
class DatagridR2010NfsListServicesContainer extends Component {
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
    this.props.datagridReinfR2010NfsListServiceStore.resetDatagrid()
  }

  refreshDatagrid(data) {
    const {
      datagridReinfR2010NfsListServiceStore: {
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
      datagridReinfR2010NfsListServiceStore: store
    } = this.props

    const { getDatagrid } = store

    let { columns } = getDatagrid
    columns = map(columns, (column) => {
      if (column.accessor === 'fiscalServiceClassificationId') {
        return {
          ...column,
          Cell: ({ value }) => {
            const item = find(
              serviceClassifications,
              service => toString(service.value) === toString(value),
            )
            return (
              <Typography noWrap>
                { get(item, 'label', value) }
              </Typography>
            )
          }
        }
      }
      return column
    })

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
          title="Serviços"
          store={ store }
          searchAutoFocus={ false }
          { ...getDatagrid }
          { ...adjusts }
          columns={ columns }
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

DatagridR2010NfsListServicesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  initialData: PropTypes.arrayOf(PropTypes.object),
  didMount: PropTypes.func,
  adjustHeight: PropTypes.func,
  serviceClassifications: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  datagridReinfR2010NfsListServiceStore: MobxPropTypes.objectOrObservableObject
}

DatagridR2010NfsListServicesContainer.defaultProps = {
  initialData: [],
  didMount: () => {},
  adjustHeight: () => {}
}

export default flow(
  withStyles(styles),
  withStores({
    datagridReinfR2010NfsListServiceStore
  })
)(DatagridR2010NfsListServicesContainer)
