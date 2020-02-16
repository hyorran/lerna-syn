/* eslint-disable react/prop-types */
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import Typography from '@material-ui/core/Typography'
import React from 'react'

function Option(props) {
  return (
    <MenuItem
      buttonRef={ props.innerRef }
      selected={ props.isFocused }
      component="div"
      style={ {
        fontWeight: props.isSelected ? 500 : 400,
      } }
      { ...props.innerProps }
    >
      <Typography
        noWrap
        style={ { width: '100%' } }
      >
        { props.children }
      </Typography>
    </MenuItem>
  )
}

export default Option
