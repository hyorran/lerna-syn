/* eslint-disable react/prop-types */
import Typography from '@material-ui/core/Typography/Typography'
import React from 'react'

function Placeholder(props) {
  return (
    <Typography
      className={ props.selectProps.classes.placeholder }
      { ...props.innerProps }
    >
      {props.children}
    </Typography>
  )
}

export default Placeholder
