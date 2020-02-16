import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formExpedientNotesLinkProcessStore from '../stores/formExpedientNotesLinkProcessStore'
import FormLinkProcessContainer from '../containers/FormLinkProcessContainer'

@inject('formExpedientNotesLinkProcessStore')
@observer
class LinkProcessModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      formExpedientNotesLinkProcessStore: {
        changed
      }
    } = this.props

    if (changed) {
      window.openDialog({
        component: ({ dialogId: unsafeDialogId, open }) => (
          <UnsafeForm
            open={ open }
            dialogId={ unsafeDialogId }
            parentDialog={ dialogId }
          />
        )
      })
    } else {
      window.closeDialog(dialogId)
    }
  }

  render() {
    const {
      dialogId,
      open,
      item,
      onSuccess,
      formExpedientNotesLinkProcessStore: {
        getFormMode,
        getFormStatus: {
          loading
        },
        submit,
        changed
      }
    } = this.props

    return (
      <ModalWithToolbar
        { ...this.props }
        modalLoading={ loading }
        escape
        fullScreen
        contentComponent={ FormLinkProcessContainer }
        contentComponentProps={ {
          item,
          onSuccess: () => {
            onSuccess(dialogId)
          }
        } }
        dialogProps={ {
          fullWidth: true,
          maxWidth: 'lg',
        } }
        open={ open }
        dialogId={ dialogId }
        mode={ getFormMode }
        title="Vincular processo para esta nota de expediente"
        autoClose={ false }
        buttonConfirm={ {
          children: 'Vincular',
          disabled: !changed || loading,
          onClick: () => submit(item, dialogId)
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

LinkProcessModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  item: PropTypes.object,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesLinkProcessStore: MobxPropTypes.objectOrObservableObject,
}

LinkProcessModal.defaultProps = {
  modalProps: {},
  item: {},
  onSuccess: () => {}
}

export default withStores({ formExpedientNotesLinkProcessStore })(LinkProcessModal)
