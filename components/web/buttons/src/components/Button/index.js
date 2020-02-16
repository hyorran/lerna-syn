import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MuiButton from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'

import styles from './styles'

class Button extends Component {
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
  }

  onClick() {
    this.props.onClick()
  }

  render() {
    const {
      classes,
      loading,
      loadingSize,
      type,
      disabled,
      asCreate,
      btnProps,
      btnClass,
      children,
      roleStyle,
      wrap,
      capitalize,
      iconLeft: IconLeft,
      iconRight: IconRight
    } = this.props

    let { variant } = this.props

    const classesMui = {}

    const className = [classes.btn]

    // Um botão submit deve ser sempre destacado, pois representa uma ação que mudará dados
    if (type === 'submit') {
      variant = 'contained'
    }

    if (asCreate) {
      className.push(classes.btnCreate)
      if (disabled && (variant === 'outlined' || variant === 'text')) {
        classesMui.disabled = classes.btnCreateTextDisabled
      }
    }

    if (!isEmpty(btnClass)) {
      className.push(btnClass)
    }

    if (!isEmpty(classes[roleStyle])) {
      className.push(classes[roleStyle])
    }

    if (wrap) {
      className.push(classes.wrap)
    }


    if (capitalize) {
      className.push(classes.capitalize)
    }


    const iconLeft = IconLeft ? <IconLeft className={ classes.iconLeft } /> : null
    const iconRight = IconRight ? <IconRight className={ classes.iconRight } /> : null

    return (
      <MuiButton
        className={ className.join(' ') }
        onClick={ loading ? () => {} : this.onClick }
        type={ type }
        classes={ classesMui }
        disabled={ disabled }
        variant={ variant }
        { ...btnProps }
      >
        {
          loading
            ? <CircularProgress color="inherit" size={ loadingSize } />
            : (
              <div className={ classes.btnChildren }>
                { iconLeft }
                <span>
                  { children }
                </span>
                { iconRight }
              </div>
            )
        }
      </MuiButton>
    )
  }
}

Button.propTypes = {
  /** Provided by Material-Ui. */
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line max-len
  /** Used to control the button's purpose, This property passes the value to the type attribute of the native button component. */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** If 'true', disable the component. */
  disabled: PropTypes.bool,
  /** Enable loader inside the button. */
  loading: PropTypes.bool,
  /** Loader's size. */
  loadingSize: PropTypes.number,
  /** - */
  asCreate: PropTypes.bool,
  /** 'Classes' from Material-Ui applied to the button style. */
  btnClass: PropTypes.string,
  /** Props applied to the button */
  btnProps: PropTypes.object,
  /** - */
  children: PropTypes.any,
  /** - */
  onClick: PropTypes.func,
  // eslint-disable-next-line max-len
  /** Lodash function used to creates a debounced function that delays invoking 'func' until after 'wait' milliseconds,
   have elapsed since the last time the debounced function was invoked.
   */
  debounce: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),
  /** - */
  debounceReverse: PropTypes.bool,
  /** The variant to use, provided by Material-Ui */
  variant: PropTypes.oneOf(['text', 'outlined', 'contained', 'fab', 'extendedFab', 'flat', 'raised']),
  /** Injects some pre-defined styles to the button component */
  roleStyle: PropTypes.string,
  /** If 'true' component will be wrapped. */
  wrap: PropTypes.bool,
  /** - */
  capitalize: PropTypes.bool,
  /** Set the position of an icon to the left, if he exists */
  iconLeft: PropTypes.func,
  /** Set the position of an icon to the right, if he exists */
  iconRight: PropTypes.func
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  loading: false,
  loadingSize: 22,
  asCreate: false,
  btnClass: '',
  btnProps: {},
  children: '',
  onClick: () => {},
  debounce: 200,
  debounceReverse: false,
  variant: 'outlined',
  roleStyle: null,
  wrap: false,
  capitalize: false,
  iconLeft: null,
  iconRight: null
}

export default withStyles(styles)(Button)

export { Button as ComponentWithProps }
