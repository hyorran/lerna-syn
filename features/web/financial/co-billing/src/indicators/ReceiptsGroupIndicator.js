import React from 'react'
import Indicator from '@syntesis/c-indicator/src/components/Indicator'
import formatMoney from '@syntesis/c-functions/src/formatMoney'

const ReceiptsGroupIndicator = props => (
  <Indicator
    slug="group_cobilling_receipt"
    format={ value => formatMoney(value) }
    { ...props }
  />
)

export default ReceiptsGroupIndicator
