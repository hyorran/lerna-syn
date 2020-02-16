import React from 'react'
import PropTypes from 'prop-types'
import HtmlToReactParser from 'html-to-react/lib/parser'

const HtmlToComponent = (props) => {
  const { parse } = new HtmlToReactParser()
  return (
    <div className={ props.containerClass }>
      { parse(props.html) }
    </div>
  )
}

HtmlToComponent.propTypes = {
  /** Transform an HTML into a React.Component */
  html: PropTypes.string.isRequired,
  /** Component's material css class. */
  containerClass: PropTypes.string
}

HtmlToComponent.defaultProps = {
  containerClass: null
}

export default HtmlToComponent
export { HtmlToComponent as ComponentWithProps }
