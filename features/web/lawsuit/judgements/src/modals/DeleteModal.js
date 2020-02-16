import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeleteItemModal from '@syntesis/c-modals/src/containers/DeleteItem'
import { deleteJudgements } from '@syntesis/s-judgements'

class DeleteModal extends Component {
  constructor(props) {
    super(props)
    this.onConfirm = this.onConfirm.bind(this)

    this.state = {
      loading: false
    }
  }

  async onConfirm() {
    const {
      onSuccess,
      dialogId,
      item: {
        id
      }
    } = this.props

    this.setState(prevState => ({
      ...prevState,
      loading: true
    }))

    try {
      await deleteJudgements({ id })
      window.closeDialog(dialogId)
      onSuccess()
    } catch (e) {
      this.setState(prevState => ({
        ...prevState,
        loading: false
      }))
    }
  }

  render() {
    const {
      dialogId,
      open,
      item,
      modalProps
    } = this.props

    const { loading } = this.state

    const {
      name,
      code
    } = item

    return (
      <DeleteItemModal
        { ...modalProps }
        name={ `${ code } - ${ name }` }
        open={ open }
        dialogId={ dialogId }
        item={ item }
        modalLoading={ loading }
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
  onSuccess: PropTypes.func
}

DeleteModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {}
}

export default DeleteModal
