import React from 'react'
import ProgressAsComponent from '@syntesis/c-commons/src/components/ProgressAsComponent'
import { mount } from 'enzyme'

describe('<ProgressAsComponent />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <ProgressAsComponent value={ 50 } />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
