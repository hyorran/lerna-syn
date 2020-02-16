import InputHelper from './index'

const openInputHelperModal = (props) => {
  window.openDialog({
    component: InputHelper,
    componentProps: props
  })
}

export { openInputHelperModal }
