import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withTextField } from '../TextField'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

class HiddenInput extends Component {
  render() {
    const inputProps = { ...this.props }
    delete inputProps.inputRef

    return (
      <input
        { ...inputProps }
        ref={ this.props.inputRef }
      />
    );
  }
}

HiddenInput.propTypes = {
  /** - */
  name: PropTypes.string.isRequired,
  /** Input component's reference */
  inputRef: PropTypes.func.isRequired,
  /** - */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ])
}

HiddenInput.defaultProps = {
  value: ''
}

export default flow(
  withTextField({ type: 'hidden' }),
  withStyles(styles)
)(HiddenInput)
export { HiddenInput as ComponentWithProps }
