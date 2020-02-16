/* eslint-disable react/prop-types */
import Chip from '@material-ui/core/Chip/Chip'
import classNames from 'classnames'
import CancelIcon from '@syntesis/c-icons/src/CancelIcon'
import React from 'react'

function MultiValue(props) {
  return (
    <Chip
      tabIndex={ -1 }
      label={ props.children }
      className={ classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      }) }
      onDelete={ props.removeProps.onClick }
      deleteIcon={ <CancelIcon { ...props.removeProps } /> }
    />
  )
}

export default MultiValue
