import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import ConfirmModal from '../ConfirmModal'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formEntriesIssueInvoiceStore from '../../../stores/EntriesStores/formEntriesIssueInvoiceStore'
import FormContainer from '../../../containers/EntriesContainers/FormEntriesIssueInvoiceContainer'

@inject('formEntriesIssueInvoiceStore')
@observer
class FormEntriesIssueInvoiceModal extends Component {
  constructor(props) {
    super(props)
    this.onIssueInvoice = this.onIssueInvoice.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.saveForm = this.saveForm.bind(this)
    this.startModalLoading = this.startModalLoading.bind(this)
    this.stopModalLoading = this.stopModalLoading.bind(this)

    this.state = {
      modalLoading: true
    }
  }

  onIssueInvoice() {
    const {
      dialogId
    } = this.props

    window.openDialog({
      component: ({ dialogId: unsafeDialogId, open }) => (
        <UnsafeForm
          open={ open }
          dialogId={ unsafeDialogId }
          parentDialog={ dialogId }
        />
      )
    })
  }

  onCloseModal() {
    const {
      dialogId,
    } = this.props

    window.closeDialog(dialogId)
  }

  startModalLoading() {
    this.setState(prevState => ({
      ...prevState,
      modalLoading: true
    }))
  }

  stopModalLoading() {
    this.setState(prevState => ({
      ...prevState,
      modalLoading: false
    }))
  }

  async saveForm() {
    const {
      formEntriesIssueInvoiceStore: {
        submit
      }
    } = this.props

    try {
      await submit()
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      dialogId,
      open,
      onSuccess,
      formEntriesIssueInvoiceStore: {
        submit,
        getFormMode,
        getFormStatus: {
          loading: formLoading
        }
      }
    } = this.props

    const { modalLoading } = this.state

    const loading = formLoading || modalLoading

    return (
      <ModalWithToolbar
        { ...this.props }
        modalLoading={ loading }
        contentComponent={ FormContainer }
        contentComponentProps={ {
          startModalLoading: this.startModalLoading,
          stopModalLoading: this.stopModalLoading,
          loading,
          onSuccess: () => {
            window.closeDialog(dialogId)
            onSuccess()
          }
        } }
        open={ open }
        dialogId={ dialogId }
        mode={ getFormMode }
        title="Emitir Nota Fiscal de Serviço"
        autoClose={ false }
        escape={ !loading }
        buttonConfirm={ {
          children: 'Emitir Nota',
          disabled: (
            loading
          ),
          onClick: () => {
            window.openDialog({
              component: ConfirmModal,
              componentProps: {
                onSuccess: submit
              }
            })
          }
        } }
        buttonCancel={ {
          children: 'Cancelar',
          disabled: loading
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

FormEntriesIssueInvoiceModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  formEntriesIssueInvoiceStore: MobxPropTypes.objectOrObservableObject,
}

FormEntriesIssueInvoiceModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {}
}

export default withStores({ formEntriesIssueInvoiceStore })(FormEntriesIssueInvoiceModal)
