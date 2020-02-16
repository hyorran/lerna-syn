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
import datagridReinfR2060ActivityAdjustmentsStore from '../../../../stores/datagridReinfR2060ActivityAdjustmentsStore'
import FormR2060ActivityAdjustmentModal from '../../../../modals/FormR2060ActivityAdjustmentModal'
import DeleteModal from '../../../../modals/DeleteModal'
import SubComponent from './SubComponent'

import styles from './styles'

@inject('datagridReinfR2060ActivityAdjustmentsStore')
@observer
class DatagridR2060ActivityAdjustmentsContainer extends Component {
  constructor(props) {
    super(props)
    this.refreshDatagrid = this.refreshDatagrid.bind(this)
    this.editOrAddAdjustment = this.editOrAddAdjustment.bind(this)
    this.removeAdjustment = this.removeAdjustment.bind(this)

    this.state = {
      toolbarButtons: [
        {
          type: 'add',
          modalComponent: FormR2060ActivityAdjustmentModal,
          modalProps: {
            editOrAddAdjustment: this.editOrAddAdjustment,
            // name: ({ code, title }) => `${ code } - ${ title }`
          }
        },
      ],
      rowActions: [
        {
          type: 'update',
          condition: () => true,
          modalComponent: FormR2060ActivityAdjustmentModal,
          modalProps: {
            editOrAddAdjustment: this.editOrAddAdjustment
            // onSuccess: (item) => {
            //   this.refreshDatagrid()
            // }
            // name: ({ code, title }) => `${ code } - ${ title }`
          }
        },
        {
          type: 'delete',
          condition: () => true,
          modalComponent: DeleteModal,
          modalProps: {
            onSuccess: this.removeAdjustment
          }
        }
      ]
    }
  }

  componentDidMount() {
    const {
      initialData,
      didMount,
      // datagridReinfR2060ActivityAdjustmentsStore: {
      //   resetDatagrid
      // }
    } = this.props

    // resetDatagrid()

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
    this.props.datagridReinfR2060ActivityAdjustmentsStore.resetDatagrid()
  }

  async removeAdjustment(adjustment) {
    const {
      onDataChanged,
      datagridReinfR2060ActivityAdjustmentsStore: {
        removeItem
      }
    } = this.props

    const data = await removeItem(adjustment)
    onDataChanged(data)
  }

  async editOrAddAdjustment(adjustment) {
    const {
      onDataChanged,
      datagridReinfR2060ActivityAdjustmentsStore: {
        editOrAddItem,
      }
    } = this.props

    const data = await editOrAddItem(adjustment)
    onDataChanged(data)
  }

  refreshDatagrid(data) {
    const {
      datagridReinfR2060ActivityAdjustmentsStore: {
        setData
      }
    } = this.props

    setData(data)
  }

  render() {
    const {
      classes,
      viewMode,
      adjustHeight,
      datagridReinfR2060ActivityAdjustmentsStore: store
    } = this.props

    const {
      toolbarButtons,
      rowActions,
    } = this.state

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
          title="Ajustes"
          store={ store }
          toolbarButtons={ viewMode ? [] : toolbarButtons }
          rowActions={ viewMode ? [] : rowActions }
          { ...getDatagrid }
          { ...adjusts }
          // columns={ columns }
          loading={ false }
          SubComponent={ props => (
            <SubComponent
              { ...props }
              adjustHeight={ adjustHeight }
            />
          ) }
        />
      </div>
    )
  }
}

DatagridR2060ActivityAdjustmentsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  initialData: PropTypes.arrayOf(PropTypes.object),
  onDataChanged: PropTypes.func,
  didMount: PropTypes.func,
  viewMode: PropTypes.bool,
  adjustHeight: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridReinfR2060ActivityAdjustmentsStore: MobxPropTypes.objectOrObservableObject
}

DatagridR2060ActivityAdjustmentsContainer.defaultProps = {
  initialData: [],
  onDataChanged: () => {},
  didMount: () => {},
  adjustHeight: () => {},
  viewMode: false
}

export default flow(
  withStyles(styles),
  withStores({
    datagridReinfR2060ActivityAdjustmentsStore
  })
)(DatagridR2060ActivityAdjustmentsContainer)
