import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTextField } from '../TextField'

class SearchInput extends Component {
  render() {
    const {
      inputRef,
      ...props
    } = this.props

    return (
      <input
        ref={ inputRef }
        { ...props }
      />
    );
  }
}

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  inputRef: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

SearchInput.defaultProps = {
  value: ''
}

export default withTextField({
  type: 'search'
})(SearchInput)

export { SearchInput as ComponentWithProps }
