import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridClientSide from '@syntesis/c-datagrid/src/containers/ClientSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridReinfR2010NfsListStore from '../../../stores/datagridReinfR2010NfsListStore'
import SubComponent from './SubComponent'

import styles from './styles'

@inject('datagridReinfR2010NfsListStore')
@observer
class DatagridR2010NfsListContainer extends Component {
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
    this.props.datagridReinfR2010NfsListStore.resetDatagrid()
  }

  refreshDatagrid(data) {
    const {
      datagridReinfR2010NfsListStore: {
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
      datagridReinfR2010NfsListStore: store
    } = this.props

    const { getDatagrid } = store

    // let { columns } = getDatagrid
    // columns = map(columns, (column) => {
    //   if (column.accessor === 'fiscalEconomicActivityId') {
    //     return {
    //       ...column,
    //       Cell: ({ value }) => {
    //         const activity = find(this.state.economicActivities, { value: toString(value) })
    //         return (
    //           <Typography noWrap>
    //             { get(activity, 'label', value) }
    //           </Typography>
    //         )
    //       }
    //     }
    //   }
    //   return column
    // })

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
          // columns={ columns }
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

DatagridR2010NfsListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  initialData: PropTypes.arrayOf(PropTypes.object),
  didMount: PropTypes.func,
  adjustHeight: PropTypes.func,
  serviceClassifications: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  datagridReinfR2010NfsListStore: MobxPropTypes.objectOrObservableObject
}

DatagridR2010NfsListContainer.defaultProps = {
  initialData: [],
  didMount: () => {},
  adjustHeight: () => {}
}

export default flow(
  withStyles(styles),
  withStores({
    datagridReinfR2010NfsListStore
  })
)(DatagridR2010NfsListContainer)
