import React from 'react'
import IndicatorGroup from '@syntesis/c-indicator/src/components/IndicatorGroup'
import { mount } from 'enzyme'

describe('<IndicatorGroup />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <IndicatorGroup
        title="test"
      />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
