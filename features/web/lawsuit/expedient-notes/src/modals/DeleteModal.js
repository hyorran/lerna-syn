import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import isEmpty from 'lodash/isEmpty'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formExpedientNotesDeleteStore from '../stores/formExpedientNotesDeleteStore'
import FormDeleteContainer from '../containers/FormDeleteContainer'

@inject('formExpedientNotesDeleteStore')
@observer
class DeleteModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      formExpedientNotesDeleteStore: {
        changed,
        getFormStatus: {
          error
        }
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
      onSuccess,
      item,
      formExpedientNotesDeleteStore: {
        getFormMode,
        getFormStatus: {
          loading,
          error
        },
        submit,
        changed
      }
    } = this.props

    const { rawEvent } = item

    return (
      <ModalWithToolbar
        { ...this.props }
        modalLoading={ loading }
        contentComponent={ FormDeleteContainer }
        contentComponentProps={ {
          onSuccess
        } }
        open={ open }
        dialogId={ dialogId }
        mode={ getFormMode }
        title={ `Excluir ${ !isEmpty(rawEvent) ? `"${ rawEvent }"` : 'esta nota de expediente' }?` }
        autoClose={ false }
        buttonConfirm={ {
          children: 'excluir',
          disabled: !changed || loading,
          onClick: () => submit(item, dialogId)
        } }
        onCancel={ this.onCloseModal }
        onSuccess={ onSuccess }
      />
    )
  }
}

DeleteModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesDeleteStore: MobxPropTypes.objectOrObservableObject,
}

DeleteModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {}
}

export default withStores({ formExpedientNotesDeleteStore })(DeleteModal)
