import React from 'react'
import PriorityAsComponent from '@syntesis/c-commons/src/components/PriorityAsComponent'
import { mount } from 'enzyme'

describe('<PriorityAsComponent />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <PriorityAsComponent value={ 1 } />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
