import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import datagridListDocReceiptsStore from '../../stores/ReceiptsStore/datagridListDocReceiptsStore'
// import formListReceiptsFilterStore from '../../stores/ReceiptsStore/formListReceiptsFilterStore'
import DatagridListDocReceiptsContainer from '../../containers/ReceiptsContainers/DatagridListDocReceiptsContainer'

// @inject('formListReceiptsFilterStore')
@inject('datagridListDocReceiptsStore')
@observer
class ListDocReceiptsModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      datagridListDocReceiptsStore: {
        resetDatagrid
      }
    } = this.props

    window.closeDialog(dialogId)
    resetDatagrid()
  }

  render() {
    const {
      item,
      dialogId,
      open,
      // formListReceiptsFilterStore: {
      //   changeFormControl,
      //   resetForm
      // }
    } = this.props

    const origin = get(item, 'originBankAccount.description', '')
    const destiny = get(item, 'destinyBankAccount.description', '')
    let title = 'Títulos da auditoria'
    if (!isEmpty(origin)) {
      title += ` - ${ origin }`
      if (!isEmpty(destiny)) {
        title += ` -> ${ destiny }`
      }
    }

    return (
      <ModalWithToolbar
        { ...this.props }
        dialogProps={ {
          fullWidth: true,
          maxWidth: 'lg'
        } }
        item={ item }
        withButtonConfirm={ false }
        modalLoading={ false }
        contentComponent={ DatagridListDocReceiptsContainer }
        // contentComponentProps={ {
        //   changeFormControl,
        //   clearFilters: resetForm
        // } }
        open={ open }
        dialogId={ dialogId }
        title={ title }
        autoClose={ false }
        buttonCancel={ {
          children: 'fechar'
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

ListDocReceiptsModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  begin: PropTypes.string,
  end: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  datagridListDocReceiptsStore: MobxPropTypes.objectOrObservableObject
  // eslint-disable-next-line react/require-default-props
  // formListReceiptsFilterStore: MobxPropTypes.objectOrObservableObject
}

ListDocReceiptsModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {},
  begin: '',
  end: ''
}

export default withStores({
  // formListReceiptsFilterStore,
  datagridListDocReceiptsStore
})(ListDocReceiptsModal)
