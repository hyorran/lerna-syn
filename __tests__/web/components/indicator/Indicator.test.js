import React from 'react'
import Indicator from '@syntesis/c-indicator/src/components/Indicator'
import { mount } from 'enzyme'

describe('<Indicator />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <Indicator />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
