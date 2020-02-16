import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '@syntesis/c-modals/src/containers/Modal'
import HelperPage from '../HelperPage'

class SummaryModal extends Component {
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      loading: state.loading !== null ? state.loading : props.loading
    }
  }

  constructor(props) {
    super(props)
    this.stopLoader = this.stopLoader.bind(this)

    this.state = {
      loading: null
    }
  }

  stopLoader() {
    this.setState(prevState => ({
      ...prevState,
      loading: false
    }))
  }

  render() {
    const {
      dialogId,
      open,
      wikiPageId,
      title
    } = this.props

    const { loading } = this.state

    return (
      <Modal
        { ...this.props }
        modalLoading={ loading }
        contentComponentMounted={ (
          <HelperPage
            pageTitle={ title }
            wikiPageId={ wikiPageId }
            stopExternalLoader={ this.stopLoader }
          />
        ) }
        open={ open }
        dialogId={ dialogId }
      />
    )
  }
}

SummaryModal.propTypes = {
  dialogId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  wikiPageId: PropTypes.number,
  loading: PropTypes.bool
}

SummaryModal.defaultProps = {
  wikiPageId: null,
  loading: true
}

export default SummaryModal
