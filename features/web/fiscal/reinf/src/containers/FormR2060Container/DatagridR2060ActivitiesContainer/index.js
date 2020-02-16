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
import { getEconomicAtivities } from '@syntesis/s-reinf'
import truncate from 'lodash/truncate'
import toString from 'lodash/toString'
import datagridReinfR2060ActivitiesStore from '../../../stores/datagridReinfR2060ActivitiesStore'
import FormR2060ActivityModal from '../../../modals/FormR2060ActivityModal'
import DeleteModal from '../../../modals/DeleteModal'
import SubComponent from './SubComponent'

import styles from './styles'

@inject('datagridReinfR2060ActivitiesStore')
@observer
class DatagridR2060ActivitiesContainer extends Component {
  constructor(props) {
    super(props)
    this.refreshDatagrid = this.refreshDatagrid.bind(this)
    this.getEconomicActivitiesOptions = this.getEconomicActivitiesOptions.bind(this)
    this.editOrAddActivity = this.editOrAddActivity.bind(this)
    this.removeActivity = this.removeActivity.bind(this)

    const { adjustHeight } = props

    this.state = {
      economicActivities: [],
      economicActivitiesLoading: true,
      toolbarButtons: [
        {
          type: 'add',
          modalComponent: FormR2060ActivityModal,
          modalProps: {
            editOrAddActivity: this.editOrAddActivity,
            adjustHeight
            // name: ({ code, title }) => `${ code } - ${ title }`
          }
        },
      ],
      rowActions: [
        {
          type: 'update',
          condition: () => true,
          modalComponent: FormR2060ActivityModal,
          modalProps: {
            editOrAddActivity: this.editOrAddActivity,
            adjustHeight
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
            onSuccess: this.removeActivity,
            name: () => 'atividade'
          }
        }
      ]
    }
  }

  componentDidMount() {
    const { initialData } = this.props
    this.getEconomicActivitiesOptions()

    if (!isEmpty(initialData)) {
      this.refreshDatagrid(initialData)
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.initialData, this.props.initialData)) {
      this.refreshDatagrid(this.props.initialData)
    }
  }

  async getEconomicActivitiesOptions() {
    const { response } = await getEconomicAtivities()

    const economicActivities = map(response, item => ({
      label: `${ item.code } - ${ truncate(item.description, { length: 65 }) }`,
      value: toString(item.id)
    }))

    this.setState(prevState => ({
      ...prevState,
      economicActivities,
      economicActivitiesLoading: false
    }))
  }

  async removeActivity(activity) {
    const {
      onDataChanged,
      adjustHeight,
      datagridReinfR2060ActivitiesStore: {
        removeItem
      }
    } = this.props

    const data = await removeItem(activity)
    onDataChanged(data)
    adjustHeight()
  }

  async editOrAddActivity(activity) {
    const {
      onDataChanged,
      adjustHeight,
      datagridReinfR2060ActivitiesStore: {
        editOrAddItem,
      }
    } = this.props

    const data = await editOrAddItem(activity)
    onDataChanged(data)
    adjustHeight()
  }

  refreshDatagrid(data) {
    const {
      datagridReinfR2060ActivitiesStore: {
        setData
      }
    } = this.props

    setData(data)
  }

  render() {
    const {
      classes,
      adjustHeight,
      datagridReinfR2060ActivitiesStore: store
    } = this.props

    const {
      economicActivities,
      economicActivitiesLoading
    } = this.state

    let {
      toolbarButtons,
      rowActions,
    } = this.state

    toolbarButtons = map(toolbarButtons, btn => ({
      ...btn,
      onClick: store.onExpandedChanged,
      modalProps: {
        ...btn.modalProps,
        economicActivities,
        economicActivitiesLoading,
      }
    }))

    rowActions = map(rowActions, btn => ({
      ...btn,
      onClick: store.onExpandedChanged,
      modalProps: {
        ...btn.modalProps,
        economicActivities,
        economicActivitiesLoading,
      }
    }))

    const { getDatagrid } = store

    let { columns } = getDatagrid
    columns = map(columns, (column) => {
      if (column.accessor === 'fiscalEconomicActivityId') {
        return {
          ...column,
          Cell: ({ value }) => {
            const activity = find(this.state.economicActivities, { value: toString(value) })
            return (
              <Typography noWrap>
                { get(activity, 'label', value) }
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
          title="Atividades"
          store={ store }
          toolbarButtons={ toolbarButtons }
          rowActions={ rowActions }
          searchAutoFocus={ false }
          { ...getDatagrid }
          { ...adjusts }
          columns={ columns }
          loading={ false }
          SubComponent={ props => (
            <SubComponent
              { ...props }
              adjustHeight={ adjustHeight }
              economicActivities={ this.state.economicActivities }
            />
          ) }
        />
      </div>
    )
  }
}

DatagridR2060ActivitiesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  initialData: PropTypes.arrayOf(PropTypes.object),
  adjustHeight: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridReinfR2060ActivitiesStore: MobxPropTypes.objectOrObservableObject,
  onDataChanged: PropTypes.func
}

DatagridR2060ActivitiesContainer.defaultProps = {
  initialData: [],
  adjustHeight: () => {},
  onDataChanged: () => {}
}

export default flow(
  withStyles(styles),
  withStores({
    datagridReinfR2060ActivitiesStore
  })
)(DatagridR2060ActivitiesContainer)
