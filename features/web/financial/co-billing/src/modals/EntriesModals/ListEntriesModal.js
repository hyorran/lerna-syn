import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import datagridListEntriesStore from '../../stores/EntriesStores/datagridListEntriesStore'
import formListEntriesFilterStore from '../../stores/EntriesStores/formListEntriesFilterStore'
import DatagridListEntriesContainer from '../../containers/EntriesContainers/DatagridListEntriesContainer'

@inject('formListEntriesFilterStore')
@inject('datagridListEntriesStore')
@observer
class ListEntriesModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      datagridListEntriesStore: {
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
      formListEntriesFilterStore: {
        changeFormControl,
        resetForm
      }
    } = this.props

    const cobillingCustomer = get(item, 'cobillingCustomer', '')
    let title = 'Emissões'
    if (!isEmpty(begin) && !isEmpty(end)) {
      title = `Emissões - De ${ moment(begin).format('L') } à ${ moment(end).format('L') }`
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
        contentComponent={ DatagridListEntriesContainer }
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

ListEntriesModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  begin: PropTypes.string,
  end: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  datagridListEntriesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formListEntriesFilterStore: MobxPropTypes.objectOrObservableObject
}

ListEntriesModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {},
  begin: '',
  end: ''
}

export default withStores({
  formListEntriesFilterStore,
  datagridListEntriesStore
})(ListEntriesModal)
