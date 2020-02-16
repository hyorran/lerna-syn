import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@syntesis/c-buttons/src/components/Button'
import SentDataModal from '../../../modals/SentDataModal'
import FeedbackDataModal from '../../../modals/FeedbackDataModal'

import styles from './styles'

class ItemInfosContainer extends Component {
  render() {

    const {
      classes,
      item: {
        sentData,
        feedbackData,
        authorizationCode,
        nsu
      }
    } = this.props

    const jsonSentData = [
      {
        value: sentData
      }
    ]

    const jsonFeedbackData = [
      {
        value: feedbackData
        // value:
        // {
        //   feedbackData,
        //   authorizationCode,
        //   nsu
        // }
      }
    ]

    return (
      <div className={ classes.container }>
        <Button
          wrap
          capitalize
          roleStyle="noMargin"
          onClick={ () => window.openDialog({
              component: SentDataModal,
              componentProps: {
                sentData: jsonSentData,
                modalLoading: false
              }
            })
          }
        >
          Dados enviados
        </Button>

        <br />

        <Button
          wrap
          capitalize
          roleStyle="noMargin"
          onClick={ () => window.openDialog({
            component: FeedbackDataModal,
            componentProps: {
              feedbackData: jsonFeedbackData,
              authorizationCode,
              nsu,
              modalLoading: false
            }
          })
        }
        >
          Dados recebidos
        </Button>
      </div>
    )
  }
}

ItemInfosContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemInfosContainer)
