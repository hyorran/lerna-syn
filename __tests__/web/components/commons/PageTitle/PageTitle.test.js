import React from 'react'
import PageTitle from '@syntesis/c-commons/src/components/PageTitle'
import { mount } from 'enzyme'

describe('<PageTitle />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <PageTitle title="title" subtitle="subtitle" />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
