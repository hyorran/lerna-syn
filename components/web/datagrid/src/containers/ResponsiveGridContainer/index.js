import React, { Component, Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import ResponsiveGrid from '../../components/ResponsiveGrid'

class ResponsiveGridBase extends Component {
  render() {
    const {
      printAble,
      ...otherProps
    } = this.props
    return (
      <ResponsiveGrid { ...otherProps } />
    )
  }
}

ResponsiveGridBase.propTypes = {
  printAble: PropTypes.bool
}

ResponsiveGridBase.defaultProps = {
  printAble: false
}

function ResponsiveGridContainer(props) {
  const componentRef = useRef()
  return (
    <Fragment>
      <ResponsiveGridBase ref={ componentRef } { ...props } />
    </Fragment>
  )
}

export default ResponsiveGridContainer
