import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import find from 'lodash/find'
import get from 'lodash/get'
import toString from 'lodash/toString'
import { withStyles } from '@material-ui/core/styles'
import { withStores } from '@syntesis/c-stores-provider'
import Typography from '@material-ui/core/Typography'
import Colors from '@syntesis/c-styles/src/styles/Colors'
import DatagridClientSide from '@syntesis/c-datagrid/src/containers/ClientSideContainer'
import SubComponent from './SubComponent'
import datagridReinfR2020NfsListServiceStore from '../../../../stores/datagridReinfR2020NfsListServiceStore'

import styles from './styles'

@inject('datagridReinfR2020NfsListServiceStore')
@observer
class DatagridR2020NfsListServicesContainer extends Component {
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
    this.props.datagridReinfR2020NfsListServiceStore.resetDatagrid()
  }

  refreshDatagrid(data) {
    const {
      datagridReinfR2020NfsListServiceStore: {
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
      datagridReinfR2020NfsListServiceStore: store
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
            if (isEmpty(item)) {
              return (
                <Typography noWrap style={ { color: Colors.error.main } }>
                  Tipo de serviço inválido. <small>(Revise-a e tente novamente)</small>
                </Typography>
              )
            }
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

DatagridR2020NfsListServicesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  initialData: PropTypes.arrayOf(PropTypes.object),
  didMount: PropTypes.func,
  adjustHeight: PropTypes.func,
  serviceClassifications: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  datagridReinfR2020NfsListServiceStore: MobxPropTypes.objectOrObservableObject
}

DatagridR2020NfsListServicesContainer.defaultProps = {
  initialData: [],
  didMount: () => {},
  adjustHeight: () => {}
}

export default flow(
  withStyles(styles),
  withStores({
    datagridReinfR2020NfsListServiceStore
  })
)(DatagridR2020NfsListServicesContainer)
