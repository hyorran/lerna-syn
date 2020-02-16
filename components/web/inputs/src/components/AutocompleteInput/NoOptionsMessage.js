/* eslint-disable react/prop-types */
import Typography from '@material-ui/core/Typography/Typography'
import React from 'react'

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={ props.selectProps.classes.noOptionsMessage }
      { ...props.innerProps }
    >
      {props.children}
    </Typography>
  )
}

export default NoOptionsMessage
