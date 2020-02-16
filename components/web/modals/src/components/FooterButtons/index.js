import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import { withStyles } from '@material-ui/core/styles'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import Button from '@syntesis/c-buttons/src/components/Button'
import TimerButton from '@syntesis/c-buttons/src/components/TimerButton'

import styles from './styles'

const FooterButtons = (props) => {
  const {
    classes,
    buttons,
    handleClose,
    withButtonConfirm,
    withButtonCancel,
    buttonCancel,
    dialogActionsProps
  } = props

  const { time } = buttonCancel

  const Btn = time ? TimerButton : Button

  return (
    <DialogActions
      { ...dialogActionsProps }
    >
      {
        withButtonConfirm ? (
          map(buttons, (buttonProps, index) => (
            <Button
              debounceReverse
              { ...buttonProps }
              key={ index }
              btnClass={ [classes.button, buttonProps.btnClass].join(' ') }
            />
          ))
        ) : null
      }
      {
        withButtonCancel
          ? (
            <Btn
              debounceReverse
              { ...buttonCancel }
              btnClass={ [classes.button, buttonCancel.btnClass].join(' ') }
              btnProps={ {
                ...buttonCancel.btnProps,
                color: 'secondary',
              } }
              onClick={ handleClose }
            />
          )
          : null
      }
    </DialogActions>
  )
}

FooterButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClose: PropTypes.func.isRequired,
  dialogActionsProps: PropTypes.object.isRequired,
  withButtonConfirm: PropTypes.bool,
  withButtonCancel: PropTypes.bool,
  buttonCancel: PropTypes.shape({
    children: PropTypes.string,
    btnProps: PropTypes.object,
    time: PropTypes.number,
    btnClass: PropTypes.object
  })
}

FooterButtons.defaultProps = {
  withButtonCancel: false,
  withButtonConfirm: true,
  buttonCancel: {
    children: 'cancelar',
    btnProps: {},
    time: 0,
    btnClass: null
  }
}

export default withStyles(styles)(FooterButtons)
