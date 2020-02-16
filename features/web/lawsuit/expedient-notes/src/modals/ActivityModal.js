import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import isNumber from 'lodash/isNumber'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formExpedientNotesActivityStore from '../stores/formExpedientNotesActivityStore'
import FormActivityContainer from '../containers/FormActivityContainer'

@inject('formExpedientNotesActivityStore')
@observer
class ActivityModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      item,
      formExpedientNotesActivityStore: {
        changed,
        getFormStatus: {
          error
        }
      }
    } = this.props

    const { lawsuitId } = item

    if (isNumber(lawsuitId)) {
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
      formExpedientNotesActivityStore: {
        getFormMode,
        getFormStatus: {
          loading,
          error
        },
        submit,
        changed
      }
    } = this.props

    return (
      <ModalWithToolbar
        { ...this.props }
        modalLoading={ loading }
        contentComponent={ FormActivityContainer }
        contentComponentProps={ {
          onSuccess: () => {
            onSuccess(dialogId)
          }
        } }
        open={ open }
        dialogId={ dialogId }
        mode={ getFormMode }
        title="Gerar atividade"
        autoClose={ false }
        withButtonConfirm={ isNumber(item.lawsuitId) }
        buttonConfirm={ {
          children: 'Salvar novo',
          disabled: (!changed || loading || error),
          onClick: () => submit(item, dialogId)
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

ActivityModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesActivityStore: MobxPropTypes.objectOrObservableObject,
}

ActivityModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {}
}

export default withStores({ formExpedientNotesActivityStore })(ActivityModal)
