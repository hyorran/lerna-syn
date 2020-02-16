import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId
    } = this.props

    window.closeDialog(dialogId)
  }

  render() {
    const {
      dialogId,
      open,
      onSuccess,
      datagridContainer: Datagrid,
      datagridContainerProps,
      title
    } = this.props

    return (
      <ModalWithToolbar
        { ...this.props }
        dialogProps={ {
          fullWidth: true,
          maxWidth: 'lg'
        } }
        modalLoading={ false }
        contentComponent={ Datagrid }
        contentComponentProps={ datagridContainerProps }
        open={ open }
        dialogId={ dialogId }
        title={ title }
        autoClose={ false }
        buttonConfirm={ {
          children: 'Confirmar',
          disabled: false,
          onClick: () => onSuccess(dialogId)
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

Modal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  datagridContainer: PropTypes.func.isRequired,
  datagridContainerProps: PropTypes.object
}

Modal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  datagridContainerProps: {}
}

export default Modal
