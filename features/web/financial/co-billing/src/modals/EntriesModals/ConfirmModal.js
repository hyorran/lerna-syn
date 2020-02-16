import React from 'react'
import PropTypes from 'prop-types'
import Confirm from '@syntesis/c-modals/src/containers/Confirm'

const ConfirmModal = (props) => {
  const {
    dialogId,
    onSuccess
  } = props

  let { buttonConfirm } = props

  buttonConfirm = {
    children: 'Sim',
    ...buttonConfirm,
    onClick: () => {
      window.closeDialog(dialogId)
      onSuccess()
    },
  }
  return (
    <Confirm
      title="Emitir Nota Fiscal de Serviço?"
      contentText="Você realmente deseja emitir a Nota Fiscal de Serviço?"
      { ...props }
      buttonCancel={ {
        children: 'Não'
      } }
      buttonConfirm={ buttonConfirm }
    />
  )
}

ConfirmModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  item: PropTypes.object,
  onSuccess: PropTypes.func,
  buttonConfirm: PropTypes.object
}

ConfirmModal.defaultProps = {
  name: '',
  item: {},
  onSuccess: () => {},
  buttonConfirm: {}
}

export default ConfirmModal
