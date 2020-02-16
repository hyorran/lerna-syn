import React from 'react'
import PropTypes from 'prop-types'
import Confirm from '@syntesis/c-modals/src/containers/Confirm'

const ConfirmModal = (props) => {
  const {
    dialogId,
    onSuccess,
    title,
    message,
    item
  } = props

  let { buttonConfirm } = props

  buttonConfirm = {
    children: 'Sim',
    ...buttonConfirm,
    onClick: () => {
      window.closeDialog(dialogId)
      onSuccess(item)
    },
  }
  return (
    <Confirm
      title={ title }
      contentText={ message }
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
  title: PropTypes.string,
  message: PropTypes.string,
  buttonConfirm: PropTypes.object
}

ConfirmModal.defaultProps = {
  name: '',
  item: {},
  onSuccess: () => {},
  title: 'Realizar ação?',
  message: 'Você realmente deseja executar esta ação?',
  buttonConfirm: {}
}

export default ConfirmModal
