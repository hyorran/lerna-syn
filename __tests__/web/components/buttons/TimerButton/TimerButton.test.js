import React from 'react'
import TimerButton from '@syntesis/c-buttons/src/components/TimerButton'
import { mount } from 'enzyme'

describe('<TimerButton />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <TimerButton />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
