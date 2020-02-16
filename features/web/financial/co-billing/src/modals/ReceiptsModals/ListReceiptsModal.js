import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import datagridListReceiptsStore from '../../stores/ReceiptsStore/datagridListReceiptsStore'
import formListReceiptsFilterStore from '../../stores/ReceiptsStore/formListReceiptsFilterStore'
import DatagridListReceiptsContainer from '../../containers/ReceiptsContainers/DatagridListReceiptsContainer'

@inject('formListReceiptsFilterStore')
@inject('datagridListReceiptsStore')
@observer
class ListReceiptsModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      datagridListReceiptsStore: {
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
      begin,
      end,
      formListReceiptsFilterStore: {
        changeFormControl,
        resetForm
      }
    } = this.props

    const cobillingCustomer = get(item, 'cobillingCustomer', '')
    let title = 'Recebimentos'
    if (!isEmpty(begin) && !isEmpty(end)) {
      title = `Recebimentos - De ${ moment(begin).format('L') } à ${ moment(end).format('L') }`
      if (!isEmpty(cobillingCustomer)) {
        title += ` - ${ cobillingCustomer }`
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
        contentComponent={ DatagridListReceiptsContainer }
        contentComponentProps={ {
          begin,
          end,
          changeFormControl,
          clearFilters: resetForm
        } }
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

ListReceiptsModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  begin: PropTypes.string,
  end: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  datagridListReceiptsStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formListReceiptsFilterStore: MobxPropTypes.objectOrObservableObject
}

ListReceiptsModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {},
  begin: '',
  end: ''
}

export default withStores({
  formListReceiptsFilterStore,
  datagridListReceiptsStore
})(ListReceiptsModal)
