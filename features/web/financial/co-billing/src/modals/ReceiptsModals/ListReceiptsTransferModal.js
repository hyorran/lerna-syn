import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import datagridListReceiptsTransferStore from '../../stores/ReceiptsStore/datagridListReceiptsTransferStore'
import formListReceiptsTransferFilterStore from '../../stores/ReceiptsStore/formListReceiptsTransferFilterStore'
import DatagridListReceiptsTransferContainer from '../../containers/ReceiptsContainers/DatagridListReceiptsTransferContainer'

@inject('formListReceiptsTransferFilterStore')
@inject('datagridListReceiptsTransferStore')
@observer
class ListReceiptsTransferModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      datagridListReceiptsTransferStore: {
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
      onSuccess,
      formListReceiptsTransferFilterStore: {
        changeFormControl
      },
      datagridListReceiptsTransferStore: {
        getDatagrid: {
          loading
        }
      }
    } = this.props

    const cobillingCustomer = get(item, 'cobillingCustomer', '')
    let title = 'Recebimentos'
    if (!isEmpty(cobillingCustomer)) {
      title += ` - ${ cobillingCustomer }`
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
        escape={ !loading }
        modalLoading={ loading }
        contentComponent={ DatagridListReceiptsTransferContainer }
        contentComponentProps={ {
          changeFormControl,
          onSuccess,
          parentItem: item
        } }
        open={ open }
        dialogId={ dialogId }
        title={ title }
        autoClose={ false }
        buttonCancel={ {
          children: 'fechar',
          disabled: loading
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

ListReceiptsTransferModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  begin: PropTypes.string,
  end: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  datagridListReceiptsTransferStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formListReceiptsTransferFilterStore: MobxPropTypes.objectOrObservableObject
}

ListReceiptsTransferModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {},
  begin: '',
  end: ''
}

export default withStores({
  formListReceiptsTransferFilterStore,
  datagridListReceiptsTransferStore
})(ListReceiptsTransferModal)
