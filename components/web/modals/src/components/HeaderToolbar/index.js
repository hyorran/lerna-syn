import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import CloseIconButton from '@syntesis/c-buttons/src/components/IconButton/CloseIconButton'

import styles from './styles'

const HeaderToolbar = (props) => {
  const {
    classes,
    title,
    escape,
    handleClose
  } = props

  return (
    <AppBar position="static">
      <Toolbar classes={ { root: classes.header } }>
        <Typography variant="h6" color="inherit" className={ classes.title }>
          { title }
        </Typography>
        {
          escape
            ? (
              <CloseIconButton
                roleStyle="btnTransparentWhite"
                marginHorizontal
                marginVertical
                onClick={ handleClose }
              />
            )
            : null
        }
      </Toolbar>
    </AppBar>
  )
}

HeaderToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  escape: PropTypes.bool,
  handleClose: PropTypes.func
}

HeaderToolbar.defaultProps = {
  escape: true,
  handleClose: () => {}
}

export default withStyles(styles)(HeaderToolbar)
