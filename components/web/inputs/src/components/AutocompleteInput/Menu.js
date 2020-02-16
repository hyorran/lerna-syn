/* eslint-disable react/prop-types */
import Paper from '@material-ui/core/Paper/Paper'
import React from 'react'

function Menu(props) {
  return (
    <Paper square className={ props.selectProps.classes.paper } { ...props.innerProps }>
      {props.children}
    </Paper>
  )
}

export default Menu
