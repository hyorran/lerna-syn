import React from 'react'
import Indicator from '@syntesis/c-indicator/src/components/Indicator'
import formatMoney from '@syntesis/c-functions/src/formatMoney'

const ReceiptsGroupByPlaceIndicator = props => (
  <Indicator
    slug="group_cobilling_receipt_by_cobilling_place"
    format={ value => formatMoney(value) }
    { ...props }
  />
)

export default ReceiptsGroupByPlaceIndicator
