import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formDecisionsStore from '../stores/formDecisionsStore'
import FormContainer from '../containers/FormContainer'

@inject('formDecisionsStore')
@observer
class FormModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      formDecisionsStore: {
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
      onSuccess,
      item,
      formDecisionsStore: {
        getFormMode,
        getFormStatus: {
          loading
        },
        submit,
        changed
      }
    } = this.props

    const modalTitle = getFormMode.create
      ? 'Cadastrar nova decisão'
      : ({ name }) => `Editando "${ name }"`

    const btnConfirmTitle = getFormMode.create
      ? 'salvar novo'
      : 'salvar edição'

    return (
      <ModalWithToolbar
        { ...this.props }
        modalLoading={ loading }
        contentComponent={ FormContainer }
        open={ open }
        dialogId={ dialogId }
        mode={ getFormMode }
        title={ modalTitle }
        autoClose={ false }
        buttonConfirm={ {
          children: btnConfirmTitle,
          disabled: !changed || loading,
          onClick: () => submit(item, dialogId)
        } }
        onCancel={ this.onCloseModal }
        onSuccess={ onSuccess }
      />
    )
  }
}

FormModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  formDecisionsStore: MobxPropTypes.objectOrObservableObject,
}

FormModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {}
}

export default withStores({ formDecisionsStore })(FormModal)
