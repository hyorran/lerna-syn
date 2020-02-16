import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import Confirm from '@syntesis/c-modals/src/containers/Confirm'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formExpedientNotesFilterDeletedStore from '../stores/formExpedientNotesFilterDeletedStore'
import FormFilterDeletedContainer from '../containers/FormFilterDeletedContainer'

@inject('formExpedientNotesFilterDeletedStore')
@observer
class FormDeletedModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      formExpedientNotesFilterDeletedStore: {
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
      formExpedientNotesFilterDeletedStore: {
        validateForm,
        changeOriginal,
        getFormStatus: {
          loading,
          error
        }
      }
    } = this.props

    return (
      <Confirm
        { ...this.props }
        modalLoading={ loading }
        contentText="Preencha os campos que você deseja filtrar."
        contentComponent={ FormFilterDeletedContainer }
        open={ open }
        dialogId={ dialogId }
        title="Filtro avançado"
        autoClose={ false }
        buttonConfirm={ {
          children: 'aplicar',
          disabled: loading || error,
          onClick: () => {
            const {
              controlsAfterValidation,
              hasInvalidControls
            } = validateForm()

            if (!hasInvalidControls) {
              onSuccess({ dialogId, controlsAfterValidation })
              changeOriginal(controlsAfterValidation)
            }
          }
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

FormDeletedModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesFilterDeletedStore: MobxPropTypes.objectOrObservableObject,
}

FormDeletedModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {}
}

export default withStores({ formExpedientNotesFilterDeletedStore })(FormDeletedModal)
