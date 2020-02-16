import React from 'react'
import CardHeightFull from '@syntesis/c-commons/src/components/CardHeightFull'
import { mount } from 'enzyme'


describe('<CardHeightFull />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <CardHeightFull />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
