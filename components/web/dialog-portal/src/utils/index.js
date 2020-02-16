import isFunction from 'lodash/isFunction'
import { createElement } from 'react'

/*
* posibilita criar modal instantaneamente quando algo é clicado
* ou passa reto o click caso nao tenha um modalComponent setado
* */
const createDynamicModal = (configs) => {
  const {
    modalComponent,
    modalProps = {},
    onClick = () => {}
  } = configs

  if (isFunction(modalComponent)) {
    window.openDialog({
      component: ({ open, dialogId }) => createElement(modalComponent, {
        ...modalProps,
        open,
        dialogId
      })
    })
  }
  onClick()
}

const closeDynamicModal = (props) => {
  const {
    autoClose,
    dialogId,
    onCancel
  } = props

  if (autoClose) {
    window.closeDialog(dialogId)
  }
  if (isFunction(onCancel)) {
    onCancel()
  }
}

export {
  createDynamicModal,
  closeDynamicModal
}
