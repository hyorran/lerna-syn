import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isNumber from 'lodash/isNumber'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridLawsuitStagesStore from '../../stores/datagridLawsuitStagesStore'
import FormModal from '../../modals/FormModal'
import DeleteModal from '../../modals/DeleteModal'
import FilterModal from '../../modals/FilterModal'

import styles from './styles'

@inject('datagridLawsuitStagesStore')
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
          type: 'export',
          filenameRef: 'Fases Processuais'
        }
      ],
      rowActions: [
        {
          type: 'update',
          condition: () => true,
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
            onSuccess: (dialogId) => {
              window.closeDialog(dialogId)
              this.refreshDatagrid()
            },
            createMode: true // força `mode.create` mesmo se tiver enviando um item
          }
        },
        {
          type: 'delete',
          condition: () => true,
          disabled: ({ synsuiteCode }) => isNumber(synsuiteCode),
          modalComponent: DeleteModal,
          modalProps: {
            onSuccess: this.refreshDatagrid,
            name: ({ code, title }) => `${ code } - ${ title }`
          }
        }
      ]
    }
  }

  componentWillUnmount() {
    const {
      datagridLawsuitStagesStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridLawsuitStagesStore: {
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
      datagridLawsuitStagesStore: {
        onRowClick
      }
    } = this.props

    onUnselectClickRow()
    onRowClick({ index: null })
  }

  onFilter(filters) {
    const {
      datagridLawsuitStagesStore: {
        setAdvancedFilters
      }
    } = this.props

    setAdvancedFilters(filters)
  }

  refreshDatagrid() {
    const {
      datagridLawsuitStagesStore: {
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
      datagridLawsuitStagesStore: store,
      changeFormControl,
      clearFilters
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
        onActiveRowClick={ this.onActiveRowClick }
        onInactiveRowClick={ this.onInactiveRowClick }
        toolbarButtons={ toolbarButtons }
        rowActions={ rowActions }
        feature={ feature }
        clearFilters={ clearFilters }
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
  changeFormControl: PropTypes.func,
  clearFilters: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridLawsuitStagesStore: MobxPropTypes.objectOrObservableObject
}

DatagridContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  formCallback: () => {},
  changeFormControl: () => {},
  clearFilters: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridLawsuitStagesStore })
)(DatagridContainer)
