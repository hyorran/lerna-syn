import Logs from './index'

const openHistoryItemModal = (props) => {
  window.openDialog({
    component: Logs,
    componentProps: props
  })
}

export { openHistoryItemModal }
