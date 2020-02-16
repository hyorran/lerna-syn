import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MuiIconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import PopoverOver from '@syntesis/c-popovers/src/components/PopoverOver'
import isEmpty from 'lodash/isEmpty'
import omitBy from 'lodash/omitBy'
import debounce from 'lodash/debounce'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'

import styles from '../styles'

class IconButton extends Component {
  constructor(props) {
    super(props)
    if (props.debounce) {
      let debounceConfig = {}
      if (props.debounceReverse) {
        debounceConfig = {
          'leading': true,
          'trailing': false
        }
      }
      this.onClick = debounce(this.onClick.bind(this), props.debounce, debounceConfig)

    } else {
      this.onClick = this.onClick.bind(this)
    }
    this.btnRef = createRef()
    this.state = {
      popoverId: props.popover ? Math.floor(Math.random() * 1000).toString() : null
    }
  }

  onClick() {
    this.props.onClick()
  }

  render() {
    const {
      classes,
      disabled,
      asCreate,
      asLight,
      onTable,
      withOpacity,
      btnClass,
      children,
      popover,
      tooltip,
      popoverProps,
      marginVertical,
      marginHorizontal,
      shadow,
      size,
      loading,
      roleStyle,
      placement,
      btnProps,
      // type
    } = this.props

    const classesNames = []

    if (asCreate) {
      classesNames.push(classes.btnCreate)
    }
    if (asLight) {
      classesNames.push(classes.btnLight)
    }
    if (shadow) {
      classesNames.push(classes.btnShadow)
    }
    if (size === 'mini') {
      classesNames.push(classes.mini)
    }
    if (size === 'none') {
      classesNames.push(classes.none)
    }
    if (onTable) {
      classesNames.push(classes.btnTable)
    }
    if (withOpacity) {
      classesNames.push(classes.withOpacity)
    }
    if (!isEmpty(btnClass)) {
      classesNames.push(btnClass)
    }
    if (!isEmpty(classes[roleStyle])) {
      classesNames.push(classes[roleStyle])
    }
    if (placement) {
      classesNames.push(placement)
    }

    let button = (
      <span
        key="iconButton"
        ref={ this.btnRef }
        aria-owns={ this.state.popoverId }
        aria-haspopup={ popover.toString() }
        className={ classes.spanIconButton }
      >
        <MuiIconButton
          { ...omitBy(this.props, (_, key) =>
            key === 'asCreate' ||
            key === 'asLight' ||
            key === 'onTable' ||
            key === 'withOpacity' ||
            key === 'popover' ||
            key === 'popoverProps' ||
            key === 'btnClass' ||
            key === 'marginVertical' ||
            key === 'marginHorizontal' ||
            key === 'shadow' ||
            key === 'order' ||
            key === 'filenameRef' ||
            key === 'datagridColumns' ||
            key === 'loading' ||
            key === 'debounceReverse' ||
            key === 'roleStyle' ||
            key === 'btnProps' ||
            key === 'iconProps' ||
            key === 'classes')
          }
          className={ classesNames.join(' ') }
          onClick={ loading ? () => {} : this.onClick }
          disabled={ disabled }
          { ...btnProps }
        >
          {
            loading
              ? <CircularProgress color="inherit" size={ 22 } />
              : children
          }
        </MuiIconButton>
      </span>
    )

    if (!isEmpty(tooltip)) {
      button = (
        <Tooltip
          title={ tooltip }
          enterDelay={ 500 }
          placement={ placement }
          TransitionComponent={ Zoom }
        >
          { button }
        </Tooltip>
      )
    }
    if (marginVertical || marginHorizontal) {
      button = (
        <div
          className={ [
            marginHorizontal ? classes.iconButtonMarginHorizontal : null,
            marginVertical ? classes.iconButtonMarginVertical : null
          ].join(' ') }
        >
          { button }
        </div>
      )
    }

    return popover
      ? [
        button,
        <PopoverOver
          key="popover"
          popoverId={ this.state.popoverId }
          { ...popoverProps }
          anchorEl={ this.btnRef }
        />
      ]
      : button
  }
}

IconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  btnClass: PropTypes.string,
  disabled: PropTypes.bool,
  asCreate: PropTypes.bool,
  asLight: PropTypes.bool,
  onTable: PropTypes.bool,
  withOpacity: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func,
  popover: PropTypes.bool,
  popoverProps: PropTypes.object,
  tooltip: PropTypes.string,
  marginVertical: PropTypes.bool,
  marginHorizontal: PropTypes.bool,
  shadow: PropTypes.bool,
  size: PropTypes.oneOf(['normal', 'mini', 'none']),
  loading: PropTypes.bool,
  debounce: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),
  debounceReverse: PropTypes.bool,
  roleStyle: PropTypes.string,
  placement: PropTypes.string,
  btnProps: PropTypes.object,
  /** Used to control the button's purpose,
   This property passes the value to the type attribute of the native button component. */
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
}

IconButton.defaultProps = {
  btnClass: null,
  disabled: false,
  asCreate: false,
  asLight: false,
  onTable: false,
  withOpacity: false,
  children: '',
  onClick: () => {},
  popover: false,
  popoverProps: {},
  tooltip: null,
  marginVertical: false,
  marginHorizontal: true,
  shadow: false,
  size: 'normal',
  loading: false,
  debounce: 200,
  debounceReverse: false,
  roleStyle: null,
  placement: 'bottom',
  btnProps: {},
  type: 'button'
}

export default withStyles(styles)(IconButton)
export { IconButton as ComponentWithProps }
