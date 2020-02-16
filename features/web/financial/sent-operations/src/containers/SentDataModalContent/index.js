import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import first from 'lodash/first'
import eachJsonToString from '@syntesis/c-functions/src/eachJsonToString'
import { withStyles } from '@material-ui/core/styles'
import TextArea from '@syntesis/c-inputs/src/components/TextArea'
import Typography from '@material-ui/core/Typography'

import styles from './styles'

const SentDataModalContent = (props) => {
  const {
    classes,
    sentData
  } = props

  const firstSentData = first(sentData)

  let json = null
  let formatedJson = null;

  try {
    json = JSON.parse(get(firstSentData, 'value'))
    formatedJson = JSON.stringify(JSON.parse(get(firstSentData, 'value')), null, 4)
  } catch (e) {
    json = null
  }

  const result = eachJsonToString(json)

  if (result.length > 0) {
    return (
      <div className={ classes.container }>
        {
          result
        }
        <TextArea
          name="sentData"
          label="Dados acima em formato JSON:"
          value={ formatedJson }
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

SentDataModalContent.propTypes = {
  classes: PropTypes.object.isRequired,
  sentData: PropTypes.array.isRequired
}

export default withStyles(styles)(SentDataModalContent)
