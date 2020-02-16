import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import lowerFirst from 'lodash/lowerFirst'
import assign from 'lodash/assign'
import mapValues from 'lodash/mapValues'
import mapKeys from 'lodash/mapKeys'
import flow from 'lodash/fp/flow'
import mapValuesFP from 'lodash/fp/mapValues'
import filter from 'lodash/fp/filter'
import reduce from 'lodash/fp/reduce'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import store from '../../store'
import TableHead from '../../components/TableHead'
import TableToolbar from '../../components/TableToolbar'

import styles from './styles'

@inject('store')
@observer
class InfoTableContainer extends Component {
  handleAction = (cb = () => {}) => {
    const infos = flow(
      filter.convert({ cap: false })((item, index) => this.props.store.isSelected(index)),
      mapValuesFP((item) => {
        const cell = find(item.columns, c => c.ref === 'oldValue')
        const name = get(find(item.columns, c => c.ref === 'friendlyColumnName'), 'value')
        return {
          [item.ref]: {
            value: cell.value,
            original: cell.original,
            name,
            friendlyValue: cell.friendlyValue
          }
        }
      }),
      reduce((memo, current) => assign(memo, current), {})
    )(this.props.data)

    let values = mapValues(infos, item => item.original || item.value)
    values = mapKeys(values, (_, key) => lowerFirst(key))

    cb({
      values,
      infos
    })
  }

  handleSelectAllClick = (name, { checked }) => {
    if (checked) {
      this.props.store.selectItem(map(this.props.data, (_, index) => index))
    } else {
      this.props.store.reset()
    }
  }

  handleClick = (event, index) => {
    if (this.props.withActions && !this.props.disabled) {
      this.props.store.selectItem(index)
    }
  }

  render() {
    const {
      classes,
      columns,
      data,
      actions,
      paper,
      selectItemsText,
      disabled,
      withActions,
      store: {
        getSelecteds: selected,
        isSelected
      }
    } = this.props

    const content = (
      <Fragment>
        <TableToolbar
          numSelected={ selected.length }
          actions={ actions }
          disabled={ disabled }
          onAction={ this.handleAction }
          selectItemsText={ selectItemsText }
        />

        <div className={ classes.tableWrapper }>
          <Table className={ classes.table }>
            {
              columns.length
                ? (
                  <TableHead
                    numSelected={ selected.length }
                    onSelectAllClick={ this.handleSelectAllClick }
                    rowCount={ data.length }
                    columns={ columns }
                    disabled={ disabled }
                    withActions={ withActions }
                  />
                )
                : null
            }
            <TableBody>
              {
                !data.length
                  ? (
                    <TableRow className={ classes.row } style={ { height: 49 } }>
                      <TableCell className={ classes.cell } colSpan={ 3 }>
                        Nenhum registro encontrado
                      </TableCell>
                    </TableRow>
                  )
                  : map(data, (item, index) => {
                    const isSelec = isSelected(index)

                    return (
                      <TableRow
                        key={ index }
                        hover={ withActions }
                        className={ classes.row }
                        onClick={ event => this.handleClick(event, index) }
                        role="checkbox"
                        aria-checked={ isSelec }
                        tabIndex={ -1 }
                        selected={ isSelec }
                      >
                        {
                          withActions
                            ? (
                              <TableCell className={ classes.cell } padding="checkbox">
                                <Checkbox
                                  name={ `check-log-${ index }` }
                                  checked={ isSelec }
                                  disabled={ disabled }
                                />
                              </TableCell>
                            )
                            : null
                        }
                        {
                          map(item.columns, ({ value = null, friendlyValue, props }, i) => (
                            <TableCell
                              key={ i }
                              { ...props }
                              className={
                                [
                                  classes.cell,
                                  get(props, 'className', null)
                                ].join(' ')
                              }
                            >
                              { !isEmpty(friendlyValue) ? (friendlyValue) : (value || '-') }
                            </TableCell>
                          ))
                        }
                      </TableRow>
                    )
                  })
              }
            </TableBody>
          </Table>
        </div>
      </Fragment>
    )

    if (paper) {
      return (
        <Paper className={ classes.root }>
          { content }
        </Paper>
      )
    }

    return content
  }
}

InfoTableContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array,
  data: PropTypes.arrayOf(PropTypes.object),
  selectItemsText: PropTypes.string,
  disabled: PropTypes.bool,
  withActions: PropTypes.bool,
  paper: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    buttonComponent: PropTypes.func.isRequired,
    buttonProps: PropTypes.object,
    onClick: PropTypes.func.isRequired
  })),
  // eslint-disable-next-line react/require-default-props
  store: MobxPropTypes.objectOrObservableObject
}

InfoTableContainer.defaultProps = {
  data: [],
  columns: [],
  selectItemsText: 'selecionado(s)',
  disabled: false,
  paper: true,
  actions: [],
  withActions: false
}

export default flow(
  withStyles(styles),
  withStores({ store })
)(InfoTableContainer)

export { InfoTableContainer as ComponentWithProps }
