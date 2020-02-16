import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isNumber from 'lodash/isNumber'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import DetailsContainer from '../containers/DetailsContainer'
import LinkProcessModal from './LinkProcessModal'
import ActivityModal from './ActivityModal'

class DetailsModal extends Component {
  constructor(props) {
    super(props)

    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      onInactiveRowClick
    } = this.props

    onInactiveRowClick()
    window.closeDialog(dialogId)
  }

  render() {
    const {
      dialogId,
      open,
      item,
      onSuccess,
      withButtonConfirm
    } = this.props

    const { lawsuitId } = item

    let buttonText = 'Vincular'
    let action = null

    if (isNumber(lawsuitId)) {
      buttonText = 'Gerar atividade'
      action = () => {
        window.openDialog({
          component: ActivityModal,
          componentProps: {
            createMode: true,
            item,
            onSuccess: (_dialogId) => {
              window.closeDialog(_dialogId)
              onSuccess(dialogId)
            }
          }
        })
      }
    } else {
      action = () => {
        window.openDialog({
          component: LinkProcessModal,
          componentProps: {
            item,
            onSuccess: (_dialogId) => {
              window.closeDialog(_dialogId)
              onSuccess(dialogId)
            }
          }
        })
      }
    }

    return (
      <ModalWithToolbar
        { ...this.props }
        modalLoading={ false }
        contentComponent={ DetailsContainer }
        contentComponentProps={ {
          item
        } }
        open={ open }
        title="Detalhes da nota de expediente"
        dialogId={ dialogId }
        autoClose={ false }
        withButtonConfirm={ withButtonConfirm }
        buttonConfirm={ {
          children: buttonText,
          disabled: false,
          onClick: action
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

DetailsModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onInactiveRowClick: PropTypes.func,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  fallback: PropTypes.func,
  withButtonConfirm: PropTypes.bool
}

DetailsModal.defaultProps = {
  modalProps: {},
  onInactiveRowClick: () => {},
  onSuccess: () => {},
  item: {},
  fallback: () => {},
  withButtonConfirm: true
}

export default DetailsModal
