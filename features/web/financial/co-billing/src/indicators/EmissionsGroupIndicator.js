import React from 'react'
import Indicator from '@syntesis/c-indicator/src/components/Indicator'
import formatMoney from '@syntesis/c-functions/src/formatMoney'

const EmissionsIndicatorByPlace = props => (
  <Indicator
    slug="group_cobilling_issues"
    format={ value => formatMoney(value) }
    { ...props }
  />
)

export default EmissionsIndicatorByPlace
