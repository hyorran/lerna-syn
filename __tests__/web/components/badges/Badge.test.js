/* eslint-disable no-undef */
import React from 'react'
import Badge from '@syntesis/c-badges'
import { mount } from 'enzyme'


describe('<Badge />', () => {
  it('rendered', () => {
    expect(Badge).toBeDefined()
    const wrapper = mount((
      <Badge
        content={ 10 }
      >
        <div className="unique" />
      </Badge>
    ))
    expect(wrapper).toMatchSnapshot()
  })
  it('rendered only children', () => {
    const wrapper = mount((
      <Badge invisible content={ 10 }>
        <div className="unique" />
      </Badge>
    ))
    expect(wrapper.contains(<div className="unique" />)).toEqual(true)
  })
})
