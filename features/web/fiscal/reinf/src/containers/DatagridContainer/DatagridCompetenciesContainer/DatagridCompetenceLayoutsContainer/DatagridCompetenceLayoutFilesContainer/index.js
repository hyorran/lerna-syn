import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/src/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import {
  downloadFileById,
  downloadReceiptById,
  transmitFileById,
  reopenClosedCompetence,
  cancelFileEventSent,
  checkReopenStatus,
  checkCloseStatus
} from '@syntesis/s-reinf'
import datagridCompetenceLayoutFilesStore from '../../../../../stores/datagridCompetenceLayoutFilesStore'
import datagridCompetenceLayoutsStore from '../../../../../stores/datagridCompetenceLayoutsStore'
import ConfirmModal from '../../../../../modals/ConfirmModal'

import styles from './styles'

@inject('datagridCompetenceLayoutFilesStore')
@inject('datagridCompetenceLayoutsStore')
@observer
class DatagridCompetenceLayoutFilesContainer extends Component {
  constructor(props) {
    super(props)

    this.refreshDatagrid = this.refreshDatagrid.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
    this.downloadReceipt = this.downloadReceipt.bind(this)
    this.transmitFile = this.transmitFile.bind(this)
    this.reopenCompetence = this.reopenCompetence.bind(this)
    this.deleteFileEvent = this.deleteFileEvent.bind(this)
    this.checkReopenStatus = this.checkReopenStatus.bind(this)
    this.checkCloseStatus = this.checkCloseStatus.bind(this)

    let isReopened = false
    if (
      props.item.layout.value !== 0 &&
      props.item.layout.value !== 8 &&
      props.item.layout.value !== 9 &&
      props.item.layout.value !== 13
    ) {
      new Promise((resolve) => {
        const result = this.checkReopenStatus(props.item.companyPlaceId, props.item.competence)
        resolve(result)
      }).then(
        (result) => { isReopened = result },
        error => console.error(error)
      )
    }

    this.state = {
      rowActions: [
        {
          type: 'file-download',
          condition: ({ fileStatus }) => (fileStatus === 1 || fileStatus === 2),
          onClick: item => this.downloadFile(item)
        },
        {
          type: 'file-transmit',
          condition: ({ fileStatus }) => fileStatus === 1,
          onClick: item => this.transmitFile(item)
        },
        {
          type: 'receipt',
          condition: ({ fileStatus }) => fileStatus === 2,
          onClick: item => this.downloadReceipt(item)
        },
        {
          type: 'update-status',
          condition: ({ fileLayout, fileStatus }) => fileLayout === 9 && fileStatus === 4,
          onClick: item => this.checkCloseStatus(item)
        },
        {
          type: 'reopen-competence',
          condition: ({ fileLayout, fileStatus }) => fileLayout === 9 && fileStatus === 2,
          onClick: (item) => {
            window.openDialog({
              component: ConfirmModal,
              componentProps: {
                title: 'Reabrir esta competência?',
                message: 'Você realmente deseja reabrir esta competência?',
                onSuccess: this.reopenCompetence,
                item
              }
            })
          }
        },
        {
          type: 'cancel',
          condition: ({ fileStatus }) => isReopened && fileStatus === 2,
          onClick: (item) => {
            window.openDialog({
              component: ConfirmModal,
              componentProps: {
                title: 'Deletar arquivo do evento?',
                message: 'Você realmente deseja excluir o arquivo deste evento?',
                onSuccess: this.deleteFileEvent,
                item
              }
            })
          }
        }
      ]
    }
  }

  componentDidMount() {
    const {
      item: {
        competence,
        companyPlaceId,
        layout: {
          value: fileLayout
        }
      },
      datagridCompetenceLayoutFilesStore: {
        setParams
      },
      datagridCompetenceLayoutsStore: {
        getDatagrid: {
          expandedRowIndex
        }
      }
    } = this.props

    if (
      !isEmpty(competence)
      && isNumber(companyPlaceId)
      && isNumber(fileLayout)
      && !isEmpty(expandedRowIndex)
    ) {
      setParams({
        companyPlaceId,
        competence,
        fileLayout
      })
    }
  }

  componentDidUpdate(prevProps) {
    const {
      item: {
        competence,
        companyPlaceId,
        layout: {
          value: fileLayout
        }
      },
      datagridCompetenceLayoutFilesStore: {
        setParams
      }
    } = this.props

    if (
      !isEqual(competence, prevProps.item.competence)
      && !isEqual(companyPlaceId, prevProps.item.companyPlaceId)
      && !isEqual(fileLayout, prevProps.item.layout.value)
    ) {
      setParams({
        companyPlaceId,
        competence,
        fileLayout
      })
    }
  }

  downloadFile({ id: fileId }) {
    try {
      downloadFileById({ fileId })
    } catch (e) {
      throw e
    }
  }

  downloadReceipt({ id: fileId }) {
    try {
      downloadReceiptById({ fileId })
    } catch (e) {
      throw e
    }
  }

  async transmitFile({ id: fiscalReinfFileId }) {
    try {
      await transmitFileById({ fiscalReinfFileId })
    } catch (e) {
      throw e
    }
  }

  async reopenCompetence({ companyPlaceId, competence }) {
    try {
      const result = await reopenClosedCompetence({ companyPlaceId, competence })
      if (result.success) {
        this.refreshDatagrid()
      }
    } catch (e) {
      throw e
    }
  }

  async deleteFileEvent({
    companyPlaceId,
    competence,
    id: fileId,
    fileLayout
  }) {
    try {
      const result = await cancelFileEventSent({
        companyPlaceId,
        competence,
        fileId,
        fileLayout
      })

      if (result.success) {
        this.refreshDatagrid()
      }
    } catch (e) {
      throw e
    }
  }

  async checkReopenStatus(companyPlaceId, competence) {
    try {
      const { response } = await checkReopenStatus({ companyPlaceId, competence })
      return response
    } catch (e) {
      throw e
    }
  }

  async checkCloseStatus({ companyPlaceId, competence }) {
    try {
      this.props.datagridCompetenceLayoutFilesStore.datagrid.loading = true
      await checkCloseStatus({ companyPlaceId, competence })
    } catch (e) {
      throw e
    } finally {
      this.props.datagridCompetenceLayoutFilesStore.datagrid.loading = false
      this.refreshDatagrid()
    }
  }

  refreshDatagrid() {
    const {
      datagridCompetenceLayoutFilesStore: {
        getDatagridData
      }
    } = this.props

    getDatagridData()
  }

  render() {
    const {
      datagridCompetenceLayoutFilesStore: store,
    } = this.props

    const { rowActions } = this.state

    const { getDatagrid } = store

    return (
      <DatagridServerSide
        store={ store }
        rowActions={ rowActions }
        { ...getDatagrid }
      />
    )
  }
}

DatagridCompetenceLayoutFilesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  datagridCompetenceLayoutFilesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  datagridCompetenceLayoutsStore: MobxPropTypes.objectOrObservableObject
}

export default flow(
  withStyles(styles),
  withStores({
    datagridCompetenceLayoutFilesStore,
    datagridCompetenceLayoutsStore
  })
)(DatagridCompetenceLayoutFilesContainer)
