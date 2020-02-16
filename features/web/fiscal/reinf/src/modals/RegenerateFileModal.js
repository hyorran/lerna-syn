import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ModalConfirm from '@syntesis/c-modals/src/containers/Confirm'
import { declineFiles } from '@syntesis/s-reinf'
import { momentFriendlyMonthYearFormat, momentBackMonthYearFormat } from '@syntesis/c-pickers/src/utils'
import moment from 'moment/moment'

class RegenerateFileModal extends Component {
  constructor(props) {
    super(props)
    this.startModalLoading = this.startModalLoading.bind(this)
    this.stopModalLoading = this.stopModalLoading.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.state = {
      modalLoading: false
    }
  }

  onCloseModal() {
    const { dialogId } = this.props
    window.closeDialog(dialogId)
  }

  async onConfirm() {
    const {
      item,
      onSuccess
    } = this.props

    await this.startModalLoading()

    try {
      await declineFiles(item)
      this.onCloseModal()
      onSuccess(item)
    } catch (e) {
      this.stopModalLoading()
      throw e
    }
  }

  startModalLoading() {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        ...prevState,
        modalLoading: true
      }), resolve)
    })
  }

  stopModalLoading() {
    return new Promise((resolve) => {
      this.setState(prevState => ({
        ...prevState,
        modalLoading: false
      }), resolve)
    })
  }

  render() {
    const {
      item: {
        competence
      }
    } = this.props

    const { modalLoading } = this.state

    const competenceFriendly = moment(
      competence,
      momentBackMonthYearFormat
    ).format(momentFriendlyMonthYearFormat)

    const modalTitle = `Desconsiderar arquivos gerados - Competência ${ competenceFriendly }`

    const btnConfirmTitle = 'Desconsiderar arquivos'

    return (
      <ModalConfirm
        { ...this.props }
        dialogProps={ {
          maxWidth: 'md'
        } }
        modalLoading={ modalLoading }
        title={ modalTitle }
        contentText={ `Você realmente deseja desconsiderar os arquivos gerados para a competência ${ competenceFriendly }?` }
        buttonCancel={ {
          children: 'cancelar',
          disabled: modalLoading
        } }
        buttonConfirm={ {
          children: btnConfirmTitle,
          onClick: this.onConfirm,
          disabled: modalLoading
        } }
        onCancel={ this.onCloseModal }
      />
    )
  }
}

RegenerateFileModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
  onSuccess: PropTypes.func,
  item: PropTypes.object
}

RegenerateFileModal.defaultProps = {
  modalProps: {},
  onSuccess: () => {},
  item: {}
}

export default RegenerateFileModal
