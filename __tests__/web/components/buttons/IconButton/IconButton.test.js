import React from 'react'
import IconButton from '@syntesis/c-buttons/src/components/IconButton/IconButton'
import ActiveIcon from '@syntesis/c-icons/src/ActiveIcon'
import { mount, shallow } from 'enzyme'
import { spy } from 'sinon'

describe('<IconButton />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <IconButton />
    ))
    expect(wrapper).toMatchSnapshot()
  })
  it('test click event', () => {
    const onButtonClick = spy()
    const wrapper = shallow((
      <IconButton debounce={ false } onClick={ onButtonClick }>Ok!</IconButton>
    ))

    wrapper.find('IconButton').simulate('click')
    expect(onButtonClick).toHaveProperty('callCount', 1)
  })
  it('test tooltip rendered', () => {
    const wrapper = mount((
      <IconButton tooltip="test" />
    ))
    expect(wrapper).toMatchSnapshot()
  })
  it('test debounce', () => {
    const onButtonClick = spy()
    const wrapper = shallow((
      <IconButton onClick={ onButtonClick } debounceReverse>Ok!</IconButton>
    ))

    wrapper.find('IconButton').simulate('click')
    expect(onButtonClick).toHaveProperty('callCount', 1)
  })
  it('asCreate top size="none" onTable withOpacity', () => {
    const wrapper = mount((
      <IconButton
        asCreate
        btnClass="test"
        placement="top"
        size="none"
        onTable
        withOpacity
        roleStyle="success"
        shadow
        asLight
      >
        <ActiveIcon />
      </IconButton>
    ))
    expect(wrapper).toMatchSnapshot()
  })
  it('debounce reverse', () => {
    const onButtonClick = spy()
    const wrapper = mount((
      <IconButton debounceReverse onClick={ onButtonClick }>Ok!</IconButton>
    ))
    wrapper.find('IconButton').at(1).simulate('click')
    expect(onButtonClick).toHaveProperty('callCount', 1)
    wrapper.unmount()
  })
  it('without debounce', () => {
    const wrapper = mount((
      <IconButton debounce={ 0 } />
    ))
    expect(wrapper).toBeDefined()
  })
})
