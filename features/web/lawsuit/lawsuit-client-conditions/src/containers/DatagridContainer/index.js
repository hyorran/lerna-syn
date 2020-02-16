import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridLawsuitClientConditionsStore from '../../stores/datagridLawsuitClientConditionsStore'
import FormModal from '../../modals/FormModal'
import DeleteModal from '../../modals/DeleteModal'
import FilterModal from '../../modals/FilterModal'

import styles from './styles'

@inject('datagridLawsuitClientConditionsStore')
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
            contentComponentProps: {
              onSuccess: (dialogId) => {
                window.closeDialog(dialogId)
                this.refreshDatagrid()
              }
            }
          }
        },
        {
          type: 'export',
          filenameRef: 'Condições de Cliente'
        }
      ],
      rowActions: [
        {
          type: 'update',
          condition: () => true,
          modalComponent: FormModal,
          modalProps: {
            contentComponentProps: {
              onSuccess: (dialogId) => {
                window.closeDialog(dialogId)
                this.refreshDatagrid()
              }
            }
          }
        },
        {
          type: 'duplicate',
          condition: () => true,
          modalComponent: FormModal,
          modalProps: {
            contentComponentProps: {
              createMode: true, // força `mode.create` mesmo se tiver enviando um item
              onSuccess: (dialogId) => {
                window.closeDialog(dialogId)
                this.refreshDatagrid()
              }
            }
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
      datagridLawsuitClientConditionsStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridLawsuitClientConditionsStore: {
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
      datagridLawsuitClientConditionsStore: {
        onRowClick
      }
    } = this.props

    onUnselectClickRow()
    onRowClick({ index: null })
  }

  onFilter(filters) {
    const {
      datagridLawsuitClientConditionsStore: {
        setAdvancedFilters
      }
    } = this.props

    const checked = get(filters, 'active.checked', null)
    if (checked !== null) {
      filters = {
        ...filters,
        active: {
          ...filters.active,
          value: checked
        }
      }
    }

    setAdvancedFilters(filters)
  }

  refreshDatagrid() {
    const {
      datagridLawsuitClientConditionsStore: {
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
      datagridLawsuitClientConditionsStore: store,
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
  datagridLawsuitClientConditionsStore: MobxPropTypes.objectOrObservableObject
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
  withStores({ datagridLawsuitClientConditionsStore })
)(DatagridContainer)
