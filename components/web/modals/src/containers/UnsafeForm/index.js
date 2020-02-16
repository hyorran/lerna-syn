import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Confirm from '../Confirm'

const UnsafeForm = (props) => {
  const {
    dialogId,
    parentDialog
  } = props

  return (
    <Confirm
      title="Deseja descartar as útimas alterações?"
      contentText="Existem modificações que não foram salvas. Você realmente deseja descartar essas alterações?"
      onCancel={ () => window.closeDialog(dialogId) }
      buttonConfirm={ {
        children: 'descartar alterações',
        onClick: () => {
          if (!isEmpty(parentDialog)) {
            window.closeDialog(parentDialog)
          }
          window.closeDialog(dialogId)
        }
      } }
      { ...props }
    />
  )
}

UnsafeForm.propTypes = {
  dialogId: PropTypes.string.isRequired,
  parentDialog: PropTypes.string
}

UnsafeForm.defaultProps = {
  parentDialog: null
}

export default UnsafeForm
