import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formExpedientNotesGetPublicationsStore from '../../stores/formExpedientNotesGetPublicationsStore'
import FormGetPublicationsContainer from '../../containers/FormGetPublicationsContainer'

import styles from './styles'

@inject('formExpedientNotesGetPublicationsStore')
@observer
class GetPublicationsModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      formExpedientNotesGetPublicationsStore: {
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
      classes,
      dialogId,
      open,
      item,
      contentComponentProps: {
        integrationName,
        onSuccess
      },
      formExpedientNotesGetPublicationsStore: {
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
        dialogContentProps={ { classes: { root: classes.fixOverflow } } }
        modalLoading={ loading }
        contentComponent={ FormGetPublicationsContainer }
        open={ open }
        dialogId={ dialogId }
        mode={ getFormMode }
        title={ `Buscar notas de expediente - ${ integrationName }` }
        autoClose={ false }
        buttonConfirm={ {
          children: 'Buscar',
          disabled: (!changed || loading || error),
          onClick: () => submit(item, dialogId)
        } }
        onCancel={ this.onCloseModal }
        onSuccess={ onSuccess }
      />
    )
  }
}

GetPublicationsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  item: PropTypes.object,
  contentComponentProps: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesGetPublicationsStore: MobxPropTypes.objectOrObservableObject,
}

GetPublicationsModal.defaultProps = {
  modalProps: {},
  item: {}
}

export default flow(
  withStores({ formExpedientNotesGetPublicationsStore }),
  withStyles(styles)
)(GetPublicationsModal)
