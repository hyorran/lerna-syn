import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import WithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formReinfR2060ActivityAdjustmentsStore from '../stores/formReinfR2060ActivityAdjustmentsStore'
import FormR2060ActivityAdjustmentsContainer from '../containers/FormR2060Container/FormR2060ActivityContainer/FormR2060ActivityAdjustmentsContainer'

@inject('formReinfR2060ActivityAdjustmentsStore')
@observer
class FormR2060ActivityAdjustmentModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      formReinfR2060ActivityAdjustmentsStore: {
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
      editOrAddAdjustment,
      formReinfR2060ActivityAdjustmentsStore: {
        // validateForm,
        // changeOriginal,
        submit,
        changed,
        getFormStatus: {
          loading,
          error
        }
      }
    } = this.props

    return (
      <WithToolbar
        { ...this.props }
        modalLoading={ loading }
        contentComponent={ FormR2060ActivityAdjustmentsContainer }
        contentComponentProps={ {
          item,
          onSuccess: (controls) => {
            editOrAddAdjustment(controls)
            window.closeDialog(dialogId)
          }
        } }
        open={ open }
        dialogId={ dialogId }
        title={ `${ isEmpty(item) ? 'Adicionar' : 'Editar' } serviço` }
        autoClose={ false }
        buttonConfirm={ {
          children: 'Aplicar',
          disabled: !changed || loading,
          onClick: submit
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

FormR2060ActivityAdjustmentModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  editOrAddAdjustment: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  formReinfR2060ActivityAdjustmentsStore: MobxPropTypes.objectOrObservableObject,
}

FormR2060ActivityAdjustmentModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {}
}

export default withStores({ formReinfR2060ActivityAdjustmentsStore })(FormR2060ActivityAdjustmentModal)
