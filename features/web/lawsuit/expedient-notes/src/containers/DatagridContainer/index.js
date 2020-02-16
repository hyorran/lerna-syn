import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import { hasPublicationIntegrationLawsuitExpedientNotes } from '@syntesis/s-lawsuit-expedient-notes'
import datagridExpedientNotesStore from '../../stores/datagridExpedientNotesStore'
import FormModal from '../../modals/FormModal'
import DetailsModal from '../../modals/DetailsModal'
import GetPublicationsModal from '../../modals/GetPublicationsModal'
import ReviewModal from '../../modals/ReviewModal'
import ActivityModal from '../../modals/ActivityModal'
import ArchiveModal from '../../modals/ArchiveModal'
import DeleteModal from '../../modals/DeleteModal'
import FilterModal from '../../modals/FilterModal'

import styles from './styles'

@inject('datagridExpedientNotesStore')
@observer
class DatagridContainer extends Component {
  constructor(props) {
    super(props)

    this.refreshDatagrid = this.refreshDatagrid.bind(this)
    this.onActiveRowClick = this.onActiveRowClick.bind(this)
    this.onActiveRowDoubleClick = this.onActiveRowDoubleClick.bind(this)
    this.onInactiveRowClick = this.onInactiveRowClick.bind(this)
    this.verifyHasPublicationIntegration = this.verifyHasPublicationIntegration.bind(this)
    this.onFilter = this.onFilter.bind(this)

    this.mounted = true

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
          type: 'export'
        }
      ],
      rowActions: [
        {
          type: 'review',
          condition: ({ synsuiteCode }) => !synsuiteCode,
          modalComponent: ReviewModal,
          modalProps: {
            createMode: true,
            onSuccess: (dialogId) => {
              window.closeDialog(dialogId)
              this.refreshDatagrid()
            }
          }
        },
        {
          type: 'activity',
          condition: ({ synsuiteCode }) => !synsuiteCode,
          modalComponent: ActivityModal,
          modalProps: {
            createMode: true,
            onSuccess: (dialogId) => {
              window.closeDialog(dialogId)
              this.refreshDatagrid()
            }
          }
        },
        {
          type: 'archive',
          condition: ({ synsuiteCode, assignments }) => !synsuiteCode && assignments === 0,
          modalComponent: ArchiveModal,
          modalProps: {
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
            onSuccess: (dialogId) => {
              window.closeDialog(dialogId)
              this.refreshDatagrid()
            },
            name: ({ code, title }) => `${ code } - ${ title }`
          }
        }
      ]
    }
  }

  componentDidMount() {
    if (this.mounted) {
      this.verifyHasPublicationIntegration()
    }
  }

  componentWillUnmount() {
    this.mounted = false

    const {
      datagridExpedientNotesStore: {
        resetFiltersOnUnmount
      }
    } = this.props

    resetFiltersOnUnmount()
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridExpedientNotesStore: {
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

  onActiveRowDoubleClick(row) {
    window.openDialog({
      component: DetailsModal,
      componentProps: {
        item: get(row, 'original'),
        onSuccess: (dialogId) => {
          window.closeDialog(dialogId)
          this.refreshDatagrid()
        },
        onInactiveRowClick: this.onInactiveRowClick
      }
    })
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridExpedientNotesStore: {
        onRowClick
      }
    } = this.props

    onRowClick({ index: null })
    onUnselectClickRow()
  }

  onFilter(filters) {
    const {
      datagridExpedientNotesStore: {
        setAdvancedFilters
      }
    } = this.props

    const checked = get(filters, 'lawsuitId.checked', null)
    if (checked !== null) {
      filters = {
        ...filters,
        lawsuitId: {
          ...filters.lawsuitId,
          value: null,
          filterOperation: checked ? 'NotEquals' : 'Equals'
        }
      }
    }

    setAdvancedFilters(filters)
  }

  refreshDatagrid() {
    const {
      datagridExpedientNotesStore: {
        getDatagridData
      },
      formCallback
    } = this.props

    getDatagridData()
    formCallback()
  }

  async verifyHasPublicationIntegration() {
    try {
      const body = await hasPublicationIntegrationLawsuitExpedientNotes()

      const exists = get(body, 'response.exists', false)

      if (exists) {
        const download = {
          type: 'download',
          modalComponent: GetPublicationsModal,
          modalProps: {
            contentComponentProps: {
              onSuccess: (dialogId) => {
                window.closeDialog(dialogId)
                this.refreshDatagrid()
              },
              integrationName: get(body, 'response.integration', 'Integração')
            }
          }
        }

        this.setState(prevState => ({
          ...prevState,
          toolbarButtons: [
            ...prevState.toolbarButtons,
            download
          ]
        }))
      }
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      feature,
      datagridExpedientNotesStore: store,
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
        onDoubleClick={ this.onActiveRowDoubleClick }
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
  datagridExpedientNotesStore: MobxPropTypes.objectOrObservableObject
}

DatagridContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
  changeFormControl: () => {},
  formCallback: () => {},
  clearFilters: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ datagridExpedientNotesStore })
)(DatagridContainer)
