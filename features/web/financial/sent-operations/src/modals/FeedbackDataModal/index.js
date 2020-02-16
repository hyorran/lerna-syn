import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@syntesis/c-modals/src/containers/Modal'
import HeaderTitleClose from '@syntesis/c-modals/src/components/HeaderTitleClose'
import FeedbackDataModalContent from '../../containers/FeedbackDataModalContent'

const FeedbackDataModal = (props) => {
  const {
    feedbackData,
    authorizationCode,
    nsu
  } = props

  return (
    <Modal
      { ...props }
      title="Dados recebidos:"
      HeaderComponent={
        headerProps => <HeaderTitleClose { ...headerProps } />
      }
      contentComponent={ FeedbackDataModalContent }
      contentComponentProps={ {
        feedbackData,
        authorizationCode,
        nsu
      } }
    />
  )
}

FeedbackDataModal.propTypes = {
  feedbackData: PropTypes.array.isRequired,
  authorizationCode: PropTypes.string,
  nsu: PropTypes.string
}

FeedbackDataModal.defaultProps = {
  authorizationCode: '',
  nsu: ''
}


export default FeedbackDataModal
