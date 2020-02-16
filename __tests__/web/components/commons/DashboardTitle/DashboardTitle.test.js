import React from 'react'
import DashboardTitle from '@syntesis/c-commons/src/components/DashboardTitle'
import { mount } from 'enzyme'

describe('<DashboardTitle />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <DashboardTitle title="test" />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
