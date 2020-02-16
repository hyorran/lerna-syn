import React from 'react'
import Chip from '@syntesis/c-commons/src/components/Chip'
import { mount } from 'enzyme'

describe('<Chip />', () => {
  it('rendred', () => {
    const wrapper = mount((
      <Chip label="teste" />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
