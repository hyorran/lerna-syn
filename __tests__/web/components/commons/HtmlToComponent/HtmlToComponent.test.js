import React from 'react'
import HtmlToComponent from '@syntesis/c-commons/src/components/HtmlToComponent'
import { mount } from 'enzyme'

describe('<HtmlToComponent />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <HtmlToComponent html=" <h2>Html as Component </h2> " />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
