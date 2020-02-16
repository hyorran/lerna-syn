import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeleteItemModal from '@syntesis/c-modals/src/containers/DeleteItem'

class DeleteModal extends Component {
  constructor(props) {
    super(props)
    this.onConfirm = this.onConfirm.bind(this)
  }

  onConfirm() {
    const {
      onSuccess,
      dialogId,
      fallback,
      item
    } = this.props

    try {
      window.closeDialog(dialogId)
      onSuccess(item)
    } catch (e) {
      fallback()
    }
  }

  render() {
    const {
      dialogId,
      open,
      item,
      modalProps
    } = this.props

    return (
      <DeleteItemModal
        { ...modalProps }
        contentText="Confirme para excluir o item."
        open={ open }
        dialogId={ dialogId }
        item={ item }
        buttonConfirm={ {
          onClick: this.onConfirm
        } }
      />
    )
  }
}

DeleteModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  fallback: PropTypes.func
}

DeleteModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  fallback: () => {},
}

export default DeleteModal
