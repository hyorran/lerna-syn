import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Colors from '@syntesis/c-styles/src/styles/Colors'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Grid from '@material-ui/core/Grid'
import IndicatorGroup from '@syntesis/c-indicator/src/components/IndicatorGroup'
import EmissionsGroupByPlaceIndicator from '../../indicators/EmissionsGroupByPlaceIndicator'
import EmissionsByPlaceIndicator from '../../indicators/EmissionsByPlaceIndicator'
import ReceiptsGroupByPlaceIndicator from '../../indicators/ReceiptsGroupByPlaceIndicator'
import ReceiptsByPlaceIndicator from '../../indicators/ReceiptsByPlaceIndicator'
import EmissionsGroupIndicator from '../../indicators/EmissionsGroupIndicator'
import EmissionsIndicator from '../../indicators/EmissionsIndicator'
import ReceiptsIndicator from '../../indicators/ReceiptsIndicator'
import ReceiptsGroupIndicator from '../../indicators/ReceiptsGroupIndicator'

import styles from './styles'

class IndicatorsContainer extends Component {
  createFilter = (propertyName) => {
    const { dateRange } = this.props
    return [
      {
        propertyName,
        operation: 'GreaterThanOrEquals',
        value: get(dateRange, 'from.value')
      },
      {
        propertyName,
        operation: 'LessThanOrEquals',
        value: get(dateRange, 'to.value')
      },
      ...this.createCobillingPlaceFilter()
    ]
  }

  createCobillingPlaceFilter = () => {
    const { cobillingPlaceId } = this.props
    if (cobillingPlaceId) {
      return [
        {
          propertyName: 'cobillingPlaceId',
          operation: 'Equals',
          value: cobillingPlaceId
        }
      ]
    }
    return []
  }

  render() {
    const {
      // classes,
      cobillingPlaceId
    } = this.props

    const issueFilter = this.createFilter('issueDate')
    const receiptFilter = this.createFilter('receiptDate')

    const indicatorsEmissions = cobillingPlaceId
      ? [
        <EmissionsByPlaceIndicator key="1" manualRefresh={ false } />,
        <EmissionsGroupByPlaceIndicator
          key="2"
          manualRefresh={ false }
          backgroundColor={ Colors.lightBlue }
        />
      ]
      : [
        <EmissionsIndicator key="1" manualRefresh={ false } />,
        <EmissionsGroupIndicator
          key="2"
          manualRefresh={ false }
          backgroundColor={ Colors.lightBlue }
        />
      ]

    const indicatorsReceipts = cobillingPlaceId
      ? [
        <ReceiptsByPlaceIndicator key="1" manualRefresh={ false } />,
        <ReceiptsGroupByPlaceIndicator
          key="2"
          manualRefresh={ false }
          backgroundColor={ Colors.lightBlue }
        />
      ]
      : [
        <ReceiptsIndicator manualRefresh={ false } key="1" />,
        <ReceiptsGroupIndicator
          key="2"
          manualRefresh={ false }
          backgroundColor={ Colors.lightBlue }
        />
      ]

    return (
      <Grid container wrap="wrap">
        <Grid
          item
          xs={ 12 }
          sm={ 12 }
          md={ 6 }
          lg={ 6 }
        >
          <IndicatorGroup
            title="Emitidos no Período"
            filter={ issueFilter }
            divider={ false }
            manualRefresh={ false }
          >
            { indicatorsEmissions }
          </IndicatorGroup>
        </Grid>
        <Grid
          item
          xs={ 12 }
          sm={ 12 }
          md={ 6 }
          lg={ 6 }
        >
          <IndicatorGroup
            title="Recebidos no Período"
            filter={ receiptFilter }
            divider={ false }
            manualRefresh={ false }
          >
            { indicatorsReceipts }
          </IndicatorGroup>
        </Grid>
      </Grid>
    )
  }
}

IndicatorsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dateRange: PropTypes.object.isRequired,
  cobillingPlaceId: PropTypes.number
}

IndicatorsContainer.defaultProps = {
  cobillingPlaceId: null
}

export default withStyles(styles)(IndicatorsContainer)
