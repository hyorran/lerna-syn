import React from 'react'
import sinon from 'sinon'
import Button from '@syntesis/c-buttons/src/components/Button'
import ActiveIcon from '@syntesis/c-icons/src/ActiveIcon'
import { mount, shallow } from 'enzyme'


describe('<Button />', () => {
  it('rendered', () => {
    const wrapper = mount((
      <Button
        wrap
        capitalize
        disabled
        roleStyle="success"
        debounce={ false }
      />
    ))
    expect(wrapper).toMatchSnapshot()
  })
  it('test click event', () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow((
      <Button onClick={ onButtonClick }>Ok!</Button>
    ))
    wrapper.find('Button').simulate('click')
    expect(onButtonClick).toHaveProperty('callCount', 1)
  })

  it('should render children when passed in', () => {
    const wrapper = mount((
      <Button>
        <div className="unique" />
      </Button>
    ))
    expect(wrapper.contains(<div className="unique" />)).toEqual(true)
  })

  it('should render icon at the left side', () => {
    const wrapper = mount((
      <Button iconLeft={ ActiveIcon } />
    ))
    expect(wrapper).toMatchSnapshot()
  })
  it('should render icon at the right side', () => {
    const wrapper = mount((
      <Button iconRight={ ActiveIcon } />
    ))
    expect(wrapper).toMatchSnapshot()
  })
  it('should render loading component and his size', () => {
    const wrapper = mount((
      <Button loading loadingSize={ 10 } />
    ))
    expect(wrapper).toMatchSnapshot()
  })
  it('test debounce', () => {
    const mockCallBack = sinon.spy()
    const wrapper = mount((
      <Button debounceReverse type="submit" onClick={ mockCallBack }>Ok!</Button>
    ))
    wrapper.find('Button').at(1).simulate('click')
    expect(mockCallBack).toHaveProperty('callCount', 1)
    wrapper.unmount()
  })
  it('asCreate && disabled && outlined', () => {
    const wrapper = mount((
      <Button
        disabled
        btnClass="test"
        asCreate
        variant="outlined"
      />
    ))
    expect(wrapper).toMatchSnapshot()
  })
  it('asCreate && disabled && text', () => {
    const wrapper = mount((
      <Button
        disabled
        btnClass="test"
        asCreate
        variant="text"
      />
    ))
    expect(wrapper).toMatchSnapshot()
  })
  it('disable=false asCreate', () => {
    const wrapper = mount((
      <Button
        disabled={ false }
        asCreate
      />
    ))
    expect(wrapper).toMatchSnapshot()
  })
})
