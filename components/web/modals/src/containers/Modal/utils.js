import Modal from './index'

const openSimpleModal = (props) => {
  window.openDialog({
    component: Modal,
    componentProps: props
  })
}

export { openSimpleModal }
