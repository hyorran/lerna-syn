/* eslint-disable react/prop-types */
import TextField from '@material-ui/core/TextField/TextField'
import React from 'react'

function inputComponent({ inputRef, ...props }) {
  return <div ref={ inputRef } { ...props } />
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={ {
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      } }
      { ...props.selectProps.textFieldProps }
    />
  )
}

export default Control
