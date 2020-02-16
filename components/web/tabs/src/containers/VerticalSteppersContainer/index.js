import React, { Component } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import isFunction from 'lodash/isFunction'
import find from 'lodash/find'
import debounce from 'lodash/debounce'
import SwipeableViews from 'react-swipeable-views'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import WarningIcon from '@syntesis/c-icons/src/WarningIcon'
import { Typography } from '@material-ui/core'
import LockIcon from '@syntesis/c-icons/src/LockIcon'

import styles from './styles'

class VerticalSteppersContainer extends Component {
  static getDerivedStateFromProps(props, state) {
    let { currentIndex } = state
    const { activeStepperIndex } = props
    if (activeStepperIndex) {
      currentIndex = activeStepperIndex
    }
    return {
      ...state,
      currentIndex
    }
  }

  constructor(props) {
    super(props)

    this.adjustHeight = debounce(this.adjustHeight.bind(this), 100)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.registerTabActions = this.registerTabActions.bind(this)
    this.renderSteppersList = this.renderSteppersList.bind(this)
    this.renderStepperContent = this.renderStepperContent.bind(this)

    this.state = {
      currentIndex: 0,
      actions: {}
    }
  }

  componentDidUpdate() {
    this.adjustHeight()
  }

  adjustHeight() {
    if (isFunction(this.state.actions.updateHeight)) {
      this.state.actions.updateHeight()
    }
  }

  handleChangeIndex(currentIndex) {
    this.setState(prevState => ({
      ...prevState,
      currentIndex
    }), this.adjustHeight)

    const {
      onNavigation,
      steppers
    } = this.props

    const activeStepper = find(steppers, (_, index) => currentIndex === index)

    onNavigation(activeStepper, currentIndex)
  }

  registerTabActions(actions) {
    this.setState(prevState => ({
      ...prevState,
      actions
    }))
  }

  renderSteppersList() {
    const {
      classes,
      steppers
    } = this.props

    const { currentIndex } = this.state

    return map(steppers, (stepper, index) => {
      const {
        title,
        condition = () => {},
        completed = () => {},
        error = () => {},
        errorText = () => ''
      } = stepper

      const hasError = isFunction(error) ? error(stepper, index, steppers) : error
      const hasCompleted = isFunction(completed) ? completed(stepper, index, steppers) : completed
      const active = index === currentIndex

      const isDisabled = isFunction(condition)
        ? !condition(stepper, index, steppers)
        : !condition

      let stepButtonProps = {
        classes: {
          root: classes.stepLabel
        }
      }

      if (active) {
        stepButtonProps = {
          ...stepButtonProps,
          classes: {
            ...stepButtonProps.classes,
            root: [
              stepButtonProps.classes.root,
              classes.stepLabelActived
            ].join(' ')
          }
        }
      } else if (hasCompleted) {
        stepButtonProps = {
          ...stepButtonProps,
          classes: {
            ...stepButtonProps.classes,
            root: [
              stepButtonProps.classes.root,
              classes.stepLabelCompleted
            ].join(' ')
          }
        }
      } else if (isDisabled) {
        stepButtonProps = {
          ...stepButtonProps,
          classes: {
            ...stepButtonProps.classes,
            root: [
              stepButtonProps.classes.root,
              classes.stepLabelDisabled
            ].join(' ')
          }
        }
      }

      if (hasError) {
        stepButtonProps = {
          ...stepButtonProps,
          icon: <WarningIcon color="secondary" />,
          classes: {
            ...stepButtonProps.classes,
            root: [
              stepButtonProps.classes.root,
              classes.error,
              classes.stepLabelError
            ].join(' ')
          }
        }

        const errText = isFunction(errorText) ? errorText(stepper, index, steppers) : errorText
        if (errText) {
          stepButtonProps = {
            ...stepButtonProps,
            optional: <Typography noWrap className={ classes.labelError }>{ errText }</Typography>
          }
        }
      }

      const stepProps = {}
      if (isDisabled) {
        stepProps.icon = (
          <div className={ classes.iconDisabledContainer }>
            <LockIcon className={ classes.iconDisabled } />
          </div>
        )
      }

      return (
        <Step
          key={ title }
          active={ active }
          disabled={ isDisabled }
          completed={ hasCompleted }
        >
          <StepButton
            onClick={ () => this.handleChangeIndex(index) }
            { ...stepButtonProps }
            { ...stepProps }
          >
            { title }
          </StepButton>
        </Step>
      )
    })
  }

  renderStepperContent() {
    const {
      classes,
      steppers
    } = this.props

    const { currentIndex } = this.state

    return map(steppers, ({ contentComponent = () => null, contentComponentProps = {} }, index) => {
      const ContentComponent = contentComponent
      const active = index === currentIndex

      return (
        <div
          key={ index }
          className={ classes.swipeableViewContainer }
          style={
            active
              ? { display: 'none !important' }
              : undefined
          }
          hidden={ !active }
        >
          <ContentComponent
            stepperIndex={ index }
            adjustHeight={ this.adjustHeight }
            isActiveStepper={ active }
            { ...contentComponentProps }
          />
        </div>
      )
    })
  }

  render() {
    const {
      classes,
      hide,
      containerClass
    } = this.props

    if (hide) {
      return null
    }

    const { currentIndex } = this.state

    return (
      <div className={ [classes.container, containerClass].join(' ') }>
        <div
          className={ classes.steppersContainer }
        >
          <Stepper
            activeStep={ currentIndex }
            orientation="vertical"
            classes={ {
              root: classes.stepperList
            } }
          >
            { this.renderSteppersList() }
          </Stepper>
        </div>

        <div className={ classes.contentsContainer }>
          <SwipeableViews
            animateHeight
            ignoreNativeScroll
            action={ this.registerTabActions }
            axis="x"
            index={ currentIndex }
            // onChangeIndex={ this.handleChangeIndex }
            // todo prop onChangeIndex bugging
          >
            { this.renderStepperContent() }
          </SwipeableViews>
        </div>
      </div>
    )
  }
}

VerticalSteppersContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  steppers: PropTypes.arrayOf(PropTypes.object),
  activeStepperIndex: PropTypes.number,
  hide: PropTypes.bool,
  onNavigation: PropTypes.func,
  containerClass: PropTypes.string
}

VerticalSteppersContainer.defaultProps = {
  steppers: [],
  hide: true,
  activeStepperIndex: null,
  onNavigation: () => {},
  containerClass: null
}

export default withStyles(styles, { withTheme: true })(VerticalSteppersContainer)
