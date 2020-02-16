import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import styles from './styles'

const TableToolbar = (props) => {
  const {
    numSelected,
    classes,
    actions,
    onAction,
    selectItemsText,
    disabled
  } = props

  return (
    <Toolbar
      className={
        classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
          [classes.hide]: numSelected === 0
        })
      }
    >
      <div className={ classes.title }>
        <Typography color="primary" variant="subtitle1">
          {
            numSelected > 0
              ? `${ numSelected } ${ selectItemsText }`
              : null
          }
        </Typography>
      </div>
      <div className={ classes.spacer } />
      <div className={ classes.actions }>
        {
          numSelected > 0
            ? map(actions, (action, index) => {
              const {
                buttonComponent: Btn,
                buttonProps = {},
                onClick = () => {}
              } = action

              return (
                <Btn
                  key={ index }
                  color="primary"
                  onClick={ () => onAction(onClick) }
                  disabled={ disabled }
                  { ...buttonProps }
                />
              )
            })
            : null
        }
      </div>
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onAction: PropTypes.func.isRequired,
  selectItemsText: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool.isRequired
}

TableToolbar.defaultProps = {
  actions: []
}

export default withStyles(styles)(TableToolbar)
