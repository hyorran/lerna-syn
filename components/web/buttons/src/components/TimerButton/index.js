import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isNumber from 'lodash/isNumber'
import OutsideClickHandler from 'react-outside-click-handler'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import Button from '../Button'

import styles from './styles'

class TimerButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTimer: false,
      seconds: props.time
    }

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1
      }), () => {
        if (this.state.seconds <= 0) {
          this.stopTimer()
          this.props.onClick()
        }
      })
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState(prevState => ({
      ...prevState,
      seconds: this.props.time
    }))
  }

  render() {
    const {
      classes,
      showIn,
      resetOutsideClick,
      children,
      ...otherProps
    } = this.props

    const {
      seconds
    } = this.state

    let showCounter = true
    if (isNumber(showIn)) {
      showCounter = seconds <= showIn
    } else if (!showIn) {
      showCounter = false
    }

    const content = (
      <Fragment>
        { children }
        {
          showCounter
            ? (
              <Avatar className={ classes.counter }>
                { seconds }
              </Avatar>
            )
            : null
        }
      </Fragment>
    )

    return (
      <OutsideClickHandler
        onOutsideClick={
          resetOutsideClick
            ? this.resetTimer
            : () => {}
        }
      >
        <Button
          { ...otherProps }
        >
          { content }
        </Button>
      </OutsideClickHandler>
    )
  }
}

TimerButton.propTypes = {
  /** - */
  classes: PropTypes.object.isRequired,
  /** - */
  children: PropTypes.any,
  /** Set the timer in seconds. */
  time: PropTypes.number,
  /** if 'true', when clicked outside of TimerButton's container, reset the timer. */
  resetOutsideClick: PropTypes.bool,
  /** Define the time when the counter will be displayed. */
  showIn: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),
  /** - */
  onClick: PropTypes.func,
}

TimerButton.defaultProps = {
  time: 60,
  children: null,
  showIn: true,
  onClick: () => {},
  resetOutsideClick: true
}

export default withStyles(styles)(TimerButton)
export { TimerButton as ComponentWithProps }
