import React from 'react'
import HelperPage from '@syntesis/c-commons/src/components/HelperPage'
import { mount } from 'enzyme'

describe('<HelperPage />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <HelperPage />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
