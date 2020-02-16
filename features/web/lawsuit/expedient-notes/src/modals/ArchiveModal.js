import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import isEmpty from 'lodash/isEmpty'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formExpedientNotesArchiveStore from '../stores/formExpedientNotesArchiveStore'
import FormArchiveContainer from '../containers/FormArchiveContainer'

@inject('formExpedientNotesArchiveStore')
@observer
class ArchiveModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      formExpedientNotesArchiveStore: {
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
      formExpedientNotesArchiveStore: {
        getFormMode,
        getFormStatus: {
          loading,
          error
        },
        submit
      }
    } = this.props

    const { rawEvent } = item

    return (
      <ModalWithToolbar
        { ...this.props }
        modalLoading={ loading }
        contentComponent={ FormArchiveContainer }
        contentComponentProps={ {
          onSuccess
        } }
        open={ open }
        dialogId={ dialogId }
        mode={ getFormMode }
        title={ `Arquivar ${ !isEmpty(rawEvent) ? `"${ rawEvent }"` : 'esta nota de expediente' }?` }
        autoClose={ false }
        buttonConfirm={ {
          children: 'arquivar',
          disabled: false,
          onClick: () => submit(item, dialogId)
        } }
        onCancel={ this.onCloseModal }
        onSuccess={ onSuccess }
      />
    )
  }
}

ArchiveModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesArchiveStore: MobxPropTypes.objectOrObservableObject,
}

ArchiveModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {}
}

export default withStores({ formExpedientNotesArchiveStore })(ArchiveModal)
