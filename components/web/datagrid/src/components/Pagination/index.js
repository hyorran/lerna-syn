/* eslint-disable */
import React, { Component, Fragment } from 'react'
import map from 'lodash/map'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import NumberInput from '@syntesis/c-inputs/src/components/NumberInput'
import SelectInput from '@syntesis/c-inputs/src/components/SelectInput'
import NavigateNextIconButton from '@syntesis/c-buttons/src/components/IconButton/NavigateNextIconButton'
import NavigateBeforeIconButton from '@syntesis/c-buttons/src/components/IconButton/NavigateBeforeIconButton'

import styles from './styles'

// Este componente é um fork da paginação original do ReactTables
class Pagination extends Component {
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      page: props.page
    }
  }

  constructor(props) {
    super()

    this.getSafePage = this.getSafePage.bind(this)
    this.changePage = this.changePage.bind(this)
    this.applyPage = this.applyPage.bind(this)
    this.changePageSize = this.changePageSize.bind(this)

    this.state = {
      page: props.page,
    }
  }

  getSafePage(page) {
    if (Number.isNaN(page)) {
      page = { ...this.props.page }
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1)
  }

  changePage(page) {
    page = this.getSafePage(page)
    this.setState({ page })
    if (this.props.page !== page) {
      this.props.onPageChange(page)
    }
  }

  applyPage(e) {
    if (e) {
      e.preventDefault()
    }
    const page = this.state.page
    this.changePage(page === '' ? this.props.page : page)
  }

  changePageSize(name, { value }) {
    this.props.onPageSizeChange(Number(value))
  }

  render() {
    const {
      // Computed
      pages,
      // Props
      classes,
      page,
      canPrevious,
      canNext,
      pageText,
      totalText
    } = this.props

    let {
      pageSizeOptions,
      pageSize,
    } = this.props

    pageSizeOptions = map(pageSizeOptions, option => ({
      label: `${ option } ${ this.props.rowsText }`,
      value: option
    }))

    return (
      <Fragment>
        <Divider />
        <div className={ classes.container }>
          <div>
            <div className={ classes.rowsCounter }>
              { totalText }
            </div>
          </div>
          <div className={ classes.paginationContainer }>
            <div>
              <Typography>{ pageText }</Typography>
              <NumberInput
                margin="none"
                withoutHelperText
                name="pagination-page"
                aria-label={ this.props.pageJumpText }
                value={ this.state.page === '' ? '' : this.state.page + 1 }
                onChange={ (_, { value }) => {
                  const page = value - 1
                  if (value === '') {
                    return this.setState({ page: value })
                  }
                  this.setState({ page: this.getSafePage(page) })
                } }
                onBlur={ this.applyPage }
                className={ classes.currentPage }
                inputClasses={ {
                  root: classes.currentPage
                } }
                inputProps={ {
                  onKeyPress: (e) => {
                    if (e.which === 13 || e.keyCode === 13) {
                      this.applyPage()
                    }
                  }
                } }
              />
              <Typography>{ this.props.ofText }{'  '}{ pages || 1 }</Typography>
            </div>
            <div>
              <SelectInput
                none={ false }
                name="datagrid-page-size"
                onChange={ this.changePageSize }
                value={ pageSize }
                options={ pageSizeOptions }
                margin={ false }
                selectClasses={ {
                  root: classes.select,
                  select: classes.selectInput
                } }
              />
            </div>
            <div>
              <NavigateBeforeIconButton
                onClick={ () => {
                  if (canPrevious) {
                    this.changePage(page - 1)
                  }
                } }
                disabled={ !canPrevious }
                btnClass={ classes.buttons }
                btnProps={ {
                  classes: {
                    label: classes.btnNavigation
                  }
                } }
                tooltip="Anterior"
              />
              <NavigateNextIconButton
                onClick={ () => {
                  if (canNext) {
                    this.changePage(page + 1)
                  }
                } }
                disabled={ !canNext }
                btnClass={ classes.buttons }
                btnProps={ {
                  classes: {
                    root: classes.buttons
                  }
                } }
                tooltip="Próxima"
              />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Pagination)
