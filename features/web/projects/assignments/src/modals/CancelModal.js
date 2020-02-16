import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import isEmpty from 'lodash/isEmpty'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formAssignmentsCancelStore from '../stores/formAssignmentsCancelStore'
import FormCancelContainer from '../containers/FormCancelContainer'

@inject('formAssignmentsCancelStore')
@observer
class CancelModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      formAssignmentsCancelStore: {
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
      formAssignmentsCancelStore: {
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
        contentComponent={ FormCancelContainer }
        contentComponentProps={ {
          onSuccess
        } }
        open={ open }
        dialogId={ dialogId }
        mode={ getFormMode }
        title={ `Cancelar ${ !isEmpty(rawEvent) ? `"${ rawEvent }"` : 'esta atividade' }?` }
        autoClose={ false }
        buttonConfirm={ {
          children: 'confirmar',
          disabled: !changed || loading,
          onClick: () => submit(item, dialogId)
        } }
        onCancel={ this.onCloseModal }
        onSuccess={ onSuccess }
      />
    )
  }
}

CancelModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  formAssignmentsCancelStore: MobxPropTypes.objectOrObservableObject,
}

CancelModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {}
}

export default withStores({ formAssignmentsCancelStore })(CancelModal)
