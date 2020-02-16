import React from 'react'
import IndicatorChildren from '@syntesis/c-indicator/src/components/IndicatorChildren'
import { mount } from 'enzyme'

describe('<IndicatorChildren />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <IndicatorChildren />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
