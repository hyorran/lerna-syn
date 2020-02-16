import React from 'react'
import Indicator from '@syntesis/c-indicator/src/components/Indicator'
import formatMoney from '@syntesis/c-functions/src/formatMoney'

const EmissionsGroupByPlaceIndicator = props => (
  <Indicator
    slug="group_cobilling_issues_by_cobilling_place"
    format={ value => formatMoney(value) }
    { ...props }
  />
)

export default EmissionsGroupByPlaceIndicator
