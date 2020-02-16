import React, { Component, createElement, Fragment } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import isBoolean from 'lodash/isBoolean'
import sortBy from 'lodash/sortBy'
import map from 'lodash/map'
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import omitBy from 'lodash/omitBy'
import partition from 'lodash/partition'
import { withStyles } from '@material-ui/core/styles'
import MuiToolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import * as IconButton from '@syntesis/c-buttons/src/components/IconButton'
import { createDynamicModal } from '@syntesis/c-dialog-portal/src/utils'
import { openExportModal } from '@syntesis/c-modals'
import stringifyValue from '@syntesis/c-functions/src/stringifyValue'
import BroomIconButton from '@syntesis/c-buttons/src/components/IconButton/BroomIconButton'
import MoreOptionsIconButton from '@syntesis/c-buttons/src/components/IconButton/MoreOptionsIconButton'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import SearchComponent from '../Search'
import Period from '../Period'

import styles from './styles'

class Toolbar extends Component {
  constructor(props) {
    super(props)

    this.refreshDatagrid = this.refreshDatagrid.bind(this)
  }

  openAdvancedFilterModal = () => {
    const { advancedFilterModalConfig } = this.props
    createDynamicModal(advancedFilterModalConfig)
  }

  async refreshDatagrid() {
    const { getDatagridData } = this.props
    try {
      await getDatagridData()
      window.snackbar.success('Atualizado com sucesso!')
    } catch (e) {
      throw e
    }
  }

  renderActivatedFilters = (activatedFilter, index) => {
    const {
      classes,
      onRemoveAdvancedFilter
    } = this.props

    let value = get(activatedFilter, 'filterFromForm.value')
    const checked = get(activatedFilter, 'filterFromForm.checked')
    const alias = get(activatedFilter, 'filterFromForm.alias')
    const rules = get(activatedFilter, 'filterFromForm.rules')

    if (isBoolean(checked)) {
      value = checked
    } else if (!isEmpty(alias)) {
      value = alias
    }

    return (
      <Chip
        key={ index }
        label={ `${ activatedFilter.Header }: ${ stringifyValue({
          value,
          rules
        }) }` }
        onDelete={ () => { onRemoveAdvancedFilter(activatedFilter) } }
        className={ classes.chip }
        color="secondary"
        variant="outlined"
      />
    )
  }

  renderButton = (button, index) => {
    const {
      checkedRows, // Linhas selecionadas na coluna de checkboxes
      multiSelect,
      datagridColumns,
      feature
    } = this.props

    const {
      modalComponent,
      modalProps,
      onClick
    } = button

    button = omitBy(button, (_, key) =>
      key === 'modalProps' ||
      key === 'modalComponent')

    /*
    * posibilita criar modal instantaneamente
    * */
    button = {
      ...button,
      onClick: () => createDynamicModal({
        modalComponent,
        modalProps,
        onClick: () => onClick && onClick({ checkedRows })
      })
    }

    const {
      type,
      ...otherButtonProps
    } = button

    switch (type) {
      case 'add':
        return createElement(IconButton.Add, {
          order: 10,
          key: index,
          shadow: true,
          ...otherButtonProps
        })
      case 'download':
        return createElement(IconButton.CloudDownload, {
          order: 30,
          key: index,
          shadow: true,
          color: 'primary',
          ...otherButtonProps
        })
      case 'export':
        return createElement(IconButton.Print, {
          order: 40,
          key: index,
          shadow: true,
          color: 'primary',
          disabled: checkedRows.length === 0,
          ...otherButtonProps,
          onClick: () => openExportModal({
            data: checkedRows,
            datagridColumns,
            feature
          })
        })
      case 'remove':
        if (multiSelect) {
          return createElement(IconButton.Delete, {
            order: 50,
            key: index,
            shadow: true,
            disabled: checkedRows.length === 0,
            ...otherButtonProps
          })
        }
        break;
      // case 'cancel':
      //   if (multiSelect) {
      //     return createElement(IconButton.Cancel, {
      //       order: 40,
      //       key: index,
      //       shadow: true,
      //       color: 'secondary',
      //       disabled: checkedRows.length === 0,
      //       ...otherButtonProps
      //     })
      //   }
      //   break;
      // case 'forward':
      //   return createElement(IconButton.SwapHoriz, {
      //     order: 20,
      //     key: index,
      //     shadow: true,
      //     color: 'primary',
      //     disabled: checkedRows.length === 0,
      //     ...otherButtonProps
      //   })
      default: {
        // Caso não haja um ícone declarado, usa o de Info,
        // ou então transforma para title case para evitar quebrar
        let typeDefault
        if (isEmpty(type)) {
          typeDefault = 'Info'
        } else {
          typeDefault = startCase(type)
        }
        return createElement(IconButton[typeDefault], {
          key: index,
          order: 0, // essa prop pode ser sobrescrita para mudar a ordem padrao
          color: 'primary',
          shadow: true,
          ...otherButtonProps
        })
      }
    }
    return true
  }

  renderMoreOptions = () => {
    const items = []
    if (this.props.endpoint) {
      items.push(popupState => (
        <MenuItem
          key="refreshDatagrid"
          onClick={ () => {
            this.refreshDatagrid()
            popupState.close()
          } }
        >
          Atualizar
        </MenuItem>
      ))
    }

    if (isEmpty(items)) {
      return null
    }

    return (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {
          popupState => (
            <Fragment>
              <MoreOptionsIconButton btnProps={ { ...bindTrigger(popupState) } } />
              <Menu { ...bindMenu(popupState) }>
                { map(items, item => item(popupState)) }
              </Menu>
            </Fragment>
          )
        }
      </PopupState>
    )
  }

  render() {
    const {
      searchableKeys,
      activatedFilters,
      onSearch,
      classes,
      buttons,
      advancedFilterModalConfig,
      clearFilters,
      period,
      onChangePeriod,
      searchLabel,
      searchInputComponent,
      searchAutoFocus
    } = this.props

    if (
      isEmpty(buttons) &&
      isEmpty(searchableKeys) &&
      isEmpty(activatedFilters) &&
      isEmpty(advancedFilterModalConfig)
    ) {
      return null
    }

    // Renderiza os componentes
    const renderedButtons = map(buttons, (btn, index) => this.renderButton(btn, index))
    // Organiza os componentes
    const [defaultButtons, customButtons] = partition(renderedButtons, btn => get(btn, 'props.order', false))

    const hasActivedFilters = !isEmpty(activatedFilters)

    let filterButton = null

    if (!isEmpty(advancedFilterModalConfig)) {
      filterButton = (
        <IconButton.Filter
          // shadow
          color={ !hasActivedFilters ? 'primary' : undefined }
          roleStyle={ hasActivedFilters ? 'secondaryButton' : undefined }
          onClick={ this.openAdvancedFilterModal }
        />
      )

      if (hasActivedFilters) {
        filterButton = (
          <Badge
            badgeContent={
              <BroomIconButton
                size="mini"
                shadow
                roleStyle="secondaryInverseButton"
                btnClass={ classes.clearFilterIcon }
                onClick={ clearFilters }
                tooltip="Limpar todos os filtros"
              />
            }
            className={ classes.clearFilter }
          >
            { filterButton }
          </Badge>
        )
      }
    }

    return (
      <MuiToolbar
        disableGutters
        className={ classes.toolbarContainer }
      >
        { this.renderMoreOptions() }

        <div className={ classes.toolbarFilterContainer }>
          { filterButton }
          {
            !isEmpty(searchableKeys) && isEmpty(activatedFilters)
              ? (
                <SearchComponent
                  searchInputComponent={ searchInputComponent }
                  searchLabel={ searchLabel }
                  onSearch={ onSearch }
                  searchAutoFocus={ searchAutoFocus }
                />
              ) : null
          }
          {
            !isEmpty(activatedFilters)
              ? (
                <div className={ classes.activatedFiltersContainer }>
                  { map(activatedFilters, this.renderActivatedFilters) }
                </div>
              )
              : null
          }
        </div>

        <div className={ classes.container }>
          { sortBy(defaultButtons, btn => btn.props.order) }
          { customButtons }
          {
            !isEmpty(get(period, 'from')) && !isEmpty(get(period, 'to'))
              ? (
                <div className={ classes.periodContainer } >
                  <Period
                    onChange={ onChangePeriod }
                    value={ period }
                  />
                </div>
              )
              : null
          }
        </div>
      </MuiToolbar>
    )
  }
}

Toolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  multiSelect: PropTypes.bool.isRequired,
  advancedFilterModalConfig: PropTypes.object.isRequired,
  searchAutoFocus: PropTypes.bool.isRequired,
  feature: PropTypes.object.isRequired,
  searchableKeys: PropTypes.array,
  onSearch: PropTypes.func,
  onRemoveAdvancedFilter: PropTypes.func,
  buttons: PropTypes.array,
  checkedRows: PropTypes.array,
  datagridColumns: PropTypes.array,
  activatedFilters: PropTypes.array,
  clearFilters: PropTypes.func,
  period: PropTypes.object,
  onChangePeriod: PropTypes.func,
  getDatagridData: PropTypes.func.isRequired,
  customOptions: PropTypes.array.isRequired,
  endpoint: PropTypes.string,
  searchLabel: PropTypes.string,
  searchInputComponent: PropTypes.func
}

Toolbar.defaultProps = {
  searchableKeys: [],
  onSearch: () => {},
  onRemoveAdvancedFilter: () => {},
  buttons: [],
  checkedRows: [],
  datagridColumns: [],
  activatedFilters: [],
  period: {},
  onChangePeriod: () => {},
  clearFilters: () => {},
  endpoint: null,
  searchLabel: undefined,
  searchInputComponent: undefined
}

export default withStyles(styles)(Toolbar)
