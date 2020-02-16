import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import first from 'lodash/first'
import replace from 'lodash/replace'
import eachJsonToString from '@syntesis/c-functions/src/eachJsonToString'
import stringifyValue from '@syntesis/c-functions/src/stringifyValue'
import { withStyles } from '@material-ui/core/styles'
import TextArea from '@syntesis/c-inputs/src/components/TextArea'
import Typography from '@material-ui/core/Typography'

import styles from './styles'

const FeedbackDataModalContent = (props) => {
  const {
    classes,
    feedbackData,
    authorizationCode,
    nsu
  } = props

  let json = null

  const firstfeedbackData = first(feedbackData)
  const firstfeedbackDataValue = get(firstfeedbackData, 'value', '')
  const firstfeedbackDataFormatted = firstfeedbackDataValue.replace(/\s+/g, '||')

  try {
    json = JSON.parse(firstfeedbackDataFormatted)
  } catch (e) {
    json = null
  }

  const result = eachJsonToString(json, '||', ' ')
  const formatedAuthorizationCode = stringifyValue(authorizationCode)
  const formatedNsu = stringifyValue(nsu)

  if (result.length > 0) {
    return (
      <div className={ classes.container }>
        <p><b>AuthorizationCode:</b> { formatedAuthorizationCode || '-' }</p>
        <br />

        <p><b>Nsu:</b> { formatedNsu || '-' }</p>
        <br />

        { result }

        <TextArea
          name="feedbackData"
          label="Dados acima em formato JSON:"
          value={ firstfeedbackDataValue }
          disabled
        />
      </div>
    )
  }
  return (
    <div className={ classes.container }>
      <Typography>Não existem dados à serem informados</Typography>
    </div>
  )
}

FeedbackDataModalContent.propTypes = {
  classes: PropTypes.object.isRequired,
  feedbackData: PropTypes.array.isRequired,
  authorizationCode: PropTypes.string,
  nsu: PropTypes.string
}

FeedbackDataModalContent.defaultProps = {
  authorizationCode: '',
  nsu: ''
}

export default withStyles(styles)(FeedbackDataModalContent)
