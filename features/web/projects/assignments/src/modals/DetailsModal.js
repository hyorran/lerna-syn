import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import ModalWithToolbar from '@syntesis/c-modals/src/containers/WithToolbar'
import DetailsContainer from '../containers/DetailsContainer'
import getLocationUrl from '@syntesis/c-functions/src/getLocationUrl'

@observer
class DetailsModal extends Component {
  constructor(props) {
    super(props)

    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onCloseModal() {
    const {
      dialogId,
      onInactiveRowClick
    } = this.props

    onInactiveRowClick()
    window.closeDialog(dialogId)
  }

  render() {
    const {
      dialogId,
      open,
      item
    } = this.props

    return (
      <ModalWithToolbar
        { ...this.props }
        modalLoading={ false }
        contentComponent={ DetailsContainer }
        contentComponentProps={ {
          item
        } }
        open={ open }
        title="Detalhes da atividade"
        dialogId={ dialogId }
        autoClose={ false }
        buttonConfirm={ {
          children: 'Visualizar',
          onClick: () => window.open(`${ getLocationUrl() }/assignments/assignment_panel/${ item.id }`)
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

DetailsModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onInactiveRowClick: PropTypes.func,
  onSuccess: PropTypes.func,
  item: PropTypes.object,
  loading: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formAssignmentDetailsStore: MobxPropTypes.objectOrObservableObject,
}

DetailsModal.defaultProps = {
  modalProps: {},
  onInactiveRowClick: () => {},
  onSuccess: () => {},
  item: {},
  loading: false
}

export default DetailsModal
