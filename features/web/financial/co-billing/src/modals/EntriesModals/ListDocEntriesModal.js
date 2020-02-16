import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider/src'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import datagridListDocEntriesStore from '../../stores/EntriesStores/datagridListDocEntriesStore'
import DatagridListDocEntriesContainer from '../../containers/EntriesContainers/DatagridListDocEntriesContainer'

@inject('datagridListDocEntriesStore')
@observer
class ListDocEntriesModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      datagridListDocEntriesStore: {
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
      end
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
        contentComponent={ DatagridListDocEntriesContainer }
        contentComponentProps={ {
          begin,
          end
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

ListDocEntriesModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  begin: PropTypes.string,
  end: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  datagridListDocEntriesStore: MobxPropTypes.objectOrObservableObject
}

ListDocEntriesModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {},
  begin: '',
  end: ''
}

export default withStores({
  datagridListDocEntriesStore
})(ListDocEntriesModal)
