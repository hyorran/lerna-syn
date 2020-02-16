import React, { Component } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import { withStyles } from '@material-ui/core/styles'
import MuiTableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'

import styles from './styles'

class TableHead extends Component {
  render() {
    const {
      classes,
      onSelectAllClick,
      numSelected,
      rowCount,
      columns,
      disabled,
      withActions
    } = this.props

    return (
      <MuiTableHead>
        <TableRow classes={ { head: classes.headRow } }>
          {
            withActions
              ? (
                <TableCell
                  classes={ { head: classes.headCell } }
                  padding="checkbox"
                >
                  <Checkbox
                    light
                    name="checkall"
                    indeterminate={ numSelected > 0 && numSelected < rowCount }
                    checked={ numSelected === rowCount }
                    onChange={ onSelectAllClick }
                    disabled={ disabled }
                  />
                </TableCell>
              )
              : null
          }
          {
            map(columns, ({ props = {}, value = null }, index) => (
              <TableCell
                key={ index }
                classes={ { head: classes.headCell } }
                { ...props }
              >
                { value }
              </TableCell>
            ))
          }
        </TableRow>
      </MuiTableHead>
    )
  }
}

TableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  withActions: PropTypes.bool.isRequired
}

export default withStyles(styles)(TableHead)
