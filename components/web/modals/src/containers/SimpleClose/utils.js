import SimpleClose from './index'

const openSimpleCloseModal = (props) => {
  window.openDialog({
    component: SimpleClose,
    componentProps: props
  })
}

export { openSimpleCloseModal }
