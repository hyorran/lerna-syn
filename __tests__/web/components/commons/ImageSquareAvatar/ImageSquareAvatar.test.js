import React from 'react'
import ImageSquareAvatar from '@syntesis/c-commons/src/components/ImageSquareAvatar'
import { mount } from 'enzyme'

describe('<ImageSquareAvatar />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <ImageSquareAvatar />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
