import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridStore from '../../stores/datagridStore'
import formFilterStore from '../../stores/formFilterStore'
import FormModal from '../../modals/FormModal'
import DeleteModal from '../../modals/DeleteModal'
import FilterModal from '../../modals/FilterModal'

import styles from './styles'

@inject('datagridStore')
@inject('formFilterStore')
@observer
class DatagridContainer extends Component {
  constructor(props) {
    super(props)

    this.refreshDatagrid = this.refreshDatagrid.bind(this)
    this.onActiveRowClick = this.onActiveRowClick.bind(this)
    this.onInactiveRowClick = this.onInactiveRowClick.bind(this)
    this.onFilter = this.onFilter.bind(this)

    this.state = {
      toolbarButtons: [
        {
          type: 'add',
          modalComponent: FormModal,
          modalProps: {
            onSuccess: (dialogId) => {
              window.closeDialog(dialogId)
              this.refreshDatagrid()
            }
          }
        },
        {
          type: 'export'
        }
      ],
      rowActions: [
        {
          type: 'update',
          condition: ({ synsuiteCode }) => !synsuiteCode,
          modalComponent: FormModal,
          modalProps: {
            onSuccess: (dialogId) => {
              window.closeDialog(dialogId)
              this.refreshDatagrid()
            }
          }
        },
        {
          type: 'duplicate',
          condition: () => true,
          modalComponent: FormModal,
          modalProps: {
            createMode: true, // força `mode.create` mesmo se tiver enviando um item
            onSuccess: (dialogId) => {
              window.closeDialog(dialogId)
              this.refreshDatagrid()
            }
          }
        },
        {
          type: 'delete',
          condition: ({ synsuiteCode }) => !synsuiteCode,
          modalComponent: DeleteModal,
          modalProps: {
            onSuccess: this.refreshDatagrid,
            name: ({ code, title }) => `${ code } - ${ title }`,
            fallback: this.refreshDatagrid
          }
        }
      ]
    }
  }

  componentWillUnmount() {
    const {
      datagridStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridStore: {
        onRowClick
      }
    } = this.props

    const {
      index,
      original: {
        id
      }
    } = row

    onRowClick({ index })
    onSelectClickRow({ id })
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  onFilter(filters) {
    const {
      datagridStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  refreshDatagrid() {
    const {
      datagridStore: {
        getDatagridData
      },
      formCallback
    } = this.props

    getDatagridData()
    formCallback()
  }

  render() {
    const {
      feature,
      datagridStore: store,
      formFilterStore: {
        changeFormControl,
        resetForm
      }
    } = this.props

    const {
      toolbarButtons,
      rowActions
    } = this.state

    const { getDatagrid } = store

    return (
      <DatagridServerSide
        multiSelect
        store={ store }
        changeFormControl={ changeFormControl }
        clearFilters={ resetForm }
        onActiveRowClick={ this.onActiveRowClick }
        onInactiveRowClick={ this.onInactiveRowClick }
        toolbarButtons={ toolbarButtons }
        rowActions={ rowActions }
        feature={ feature }
        advancedFilterModalConfig={ {
          modalComponent: FilterModal,
          modalProps: {
            onSuccess: ({ dialogId, controlsAfterValidation }) => {
              this.onFilter(controlsAfterValidation)
              window.closeDialog(dialogId)
            }
          }
        } }
        { ...getDatagrid }
      />
    )
  }
}

DatagridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  formCallback: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formFilterStore: MobxPropTypes.objectOrObservableObject
}

DatagridContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {}
}

export default flow(
  withStyles(styles),
  withStores({
    datagridStore,
    formFilterStore
  })
)(DatagridContainer)
