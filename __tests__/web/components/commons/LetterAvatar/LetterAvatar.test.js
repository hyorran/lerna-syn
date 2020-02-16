import React from 'react'
import LetterAvatar from '@syntesis/c-commons/src/components/LetterAvatar'
import { mount } from 'enzyme'

describe('<LetterAvatar />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <LetterAvatar />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
