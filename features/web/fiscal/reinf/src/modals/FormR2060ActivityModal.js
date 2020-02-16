import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import WithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import UnsafeForm from '@syntesis/c-modals/src/containers/UnsafeForm'
import formReinfR2060ActivityStore from '../stores/formReinfR2060ActivityStore'
import FormActivityContainer from '../containers/FormR2060Container/FormR2060ActivityContainer'

@inject('formReinfR2060ActivityStore')
@observer
class FormR2060ActivityModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      formReinfR2060ActivityStore: {
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
      item,
      economicActivities,
      economicActivitiesLoading,
      editOrAddActivity,
      formReinfR2060ActivityStore: {
        changed,
        submit,
        getFormStatus: {
          loading,
          error
        }
      }
    } = this.props

    return (
      <WithToolbar
        { ...this.props }
        dialogProps={ {
          fullWidth: true,
          maxWidth: 'md',
        } }
        modalLoading={ loading }
        contentComponent={ FormActivityContainer }
        contentComponentProps={ {
          economicActivities,
          economicActivitiesLoading,
          item,
          onSuccess: (controls) => {
            editOrAddActivity(controls)
            window.closeDialog(dialogId)
          }
        } }
        open={ open }
        dialogId={ dialogId }
        title={ `${ isEmpty(item) ? 'Adicionar' : 'Editar' } atividade` }
        autoClose={ false }
        buttonConfirm={ {
          children: 'aplicar',
          disabled: !changed || loading,
          onClick: submit
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

FormR2060ActivityModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  economicActivitiesLoading: PropTypes.bool.isRequired,
  economicActivities: PropTypes.array,
  editOrAddActivity: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  formReinfR2060ActivityStore: MobxPropTypes.objectOrObservableObject,
}

FormR2060ActivityModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  economicActivities: [],
  item: {}
}

export default withStores({ formReinfR2060ActivityStore })(FormR2060ActivityModal)
