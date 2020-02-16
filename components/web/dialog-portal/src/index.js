import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import { inject, observer, PropTypes } from 'mobx-react'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import { withJssThemeProvider } from '@syntesis/c-styles/src/themes'
import { withStores } from '@syntesis/c-stores-provider'
import dialogPortalStore from './stores/dialogPortalStore'

@inject('dialogPortalStore')
@observer
class DialogPortal extends Component {
  constructor(props) {
    super(props)
    const {
      dialogPortalStore: {
        openDialog,
        closeDialog
      }
    } = props

    window.openDialog = openDialog
    window.closeDialog = closeDialog
  }

  render() {
    const {
      dialogPortalStore: {
        getDialogs
      }
    } = this.props

    const dialogs = map(
      getDialogs,
      ({ component: Dialog, open, componentProps = {} }, dialogId) => (
        <Dialog
          key={ dialogId }
          dialogId={ dialogId }
          open={ open }
          { ...componentProps }
        />
      )
    )

    const node = document.getElementById('react-dialog-portal')
    return createPortal(dialogs, node)
  }
}

DialogPortal.propTypes = {
  // eslint-disable-next-line react/require-default-props
  dialogPortalStore: PropTypes.objectOrObservableObject
}

export default flow(
  withStores({ dialogPortalStore }),
  withJssThemeProvider()
)(DialogPortal)
