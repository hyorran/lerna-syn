import React from 'react'
import BoolAsComponent from '@syntesis/c-commons/src/components/BoolAsComponent'
import { mount } from 'enzyme'

describe('<BoolAsComponent />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <BoolAsComponent />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
