import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@syntesis/c-modals/src/containers/Modal'
import HeaderTitleClose from '@syntesis/c-modals/src/components/HeaderTitleClose'
import SentDataModalContent from '../../containers/SentDataModalContent'

const SentDataModal = (props) => {
  const {
    sentData
  } = props

  return (
    <Modal
      { ...props }
      title="Dados enviados:"
      HeaderComponent={
        headerProps => <HeaderTitleClose { ...headerProps } />
      }
      contentComponent={ SentDataModalContent }
      contentComponentProps={ {
        sentData
      } }
    />
  )
}

SentDataModal.propTypes = {
  sentData: PropTypes.array.isRequired
}

export default SentDataModal
