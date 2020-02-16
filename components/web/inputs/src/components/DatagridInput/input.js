import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import InputBase from '@material-ui/core/InputBase'
import SearchIconButton from '@syntesis/c-buttons/src/components/IconButton/SearchIconButton'
import BroomIconButton from '@syntesis/c-buttons/src/components/IconButton/BroomIconButton'
import { withTextField } from '../TextField'

class Input extends Component {
  render() {
    const {
      labelValue,
      clearInput,
      inputRef,
      ...otherProps
    } = this.props

    return (
      <Fragment>
        <InputBase
          ref={ inputRef }
          style={ { padding: 0 } }
          { ...otherProps }
          onChange={ () => {} }
          onBlur={ () => {} }
          value={ labelValue || '' }
        />
        {
          !isEmpty(labelValue)
            ? (
              <Fragment>
                <BroomIconButton
                  size="mini"
                  onClick={ clearInput }
                />
              </Fragment>
            )
            : null
        }
      </Fragment>
    )
  }
}

Input.propTypes = {
  clearInput: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  labelValue: PropTypes.any
}

Input.defaultProps = {
  labelValue: null
}

export default withTextField({
  type: 'text',
  inputDefault: false,
  debounceValue: false,
  icon: SearchIconButton,
  iconProps: {
    tooltip: 'Pesquisar e selecionar',
    size: 'mini'
  }
})(Input)
