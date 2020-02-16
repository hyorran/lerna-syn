import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import isEmpty from 'lodash/isEmpty'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import formExpedientNotesReviewStore from '../stores/formExpedientNotesReviewStore'
import FormReviewContainer from '../containers/FormReviewContainer'

@inject('formExpedientNotesReviewStore')
@observer
class ReviewModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const { dialogId } = this.props
    window.closeDialog(dialogId)
  }

  render() {
    const {
      dialogId,
      open,
      onSuccess,
      item,
      formExpedientNotesReviewStore: {
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
        contentComponent={ FormReviewContainer }
        contentComponentProps={ {
          onSuccess
        } }
        open={ open }
        dialogId={ dialogId }
        mode={ getFormMode }
        title={ `Revisar ${ !isEmpty(rawEvent) ? `"${ rawEvent }"` : 'esta nota de expediente' }?` }
        autoClose={ false }
        buttonConfirm={ {
          children: 'Revisar',
          disabled: false,
          onClick: () => submit(item, dialogId)
        } }
        onCancel={ this.onCloseModal }
        onSuccess={ onSuccess }
      />
    )
  }
}

ReviewModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesReviewStore: MobxPropTypes.objectOrObservableObject,
}

ReviewModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {}
}

export default withStores({ formExpedientNotesReviewStore })(ReviewModal)
