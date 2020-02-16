import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Colors from '@syntesis/c-styles/src/styles/Colors'

import styles from './styles'

class Circular extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showing: !props.delay
    }
    if (props.delay) {
      // 1 segundo é o limite mínimo para exibição de um carregador [NIELSEN, 93]
      this.timer = setTimeout(this.showLoader, props.delay)
    }

  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  showLoader = () => {
    if (this.props.visible) {
      this.setState({ showing: true })
    }
  }

  render() {
    const { classes, className } = this.props
    const { showing } = this.state

    if (!showing) {
      return null
    }

    return (
      <div className={ [classNames(classes.overlay, 'visible'), className].join(' ') }>
        <svg className={ classes.loader } xmlns="http://www.w3.org/2000/svg" width="57.9" height="64">
          <path
            d="M26.475 0v6.922a25.202 25.202 0 0 0-17.98 10.41l-6.02-3.475L0 18.143l6.02 3.476A25.202 25.202 0 0 0 3.748 32a25.202 25.202 0 0 0 2.265 10.385L0 45.857l2.475 4.286 6.011-3.47a25.202 25.202 0 0 0 17.99 10.382V64h4.949v-6.922a25.202 25.202 0 0 0 17.98-10.41l6.02 3.475 2.475-4.286-6.02-3.476a25.202 25.202 0 0 0 2.272-10.38 25.202 25.202 0 0 0-2.265-10.386l6.013-3.472-2.474-4.286-6.012 3.47a25.202 25.202 0 0 0-17.99-10.382V0zm0 13.957v10.029h4.95V13.958a18.232 18.232 0 0 1 11.923 6.872l-8.695 5.02 2.475 4.286 8.692-5.018A18.232 18.232 0 0 1 47.182 32a18.232 18.232 0 0 1-1.36 6.883l-8.694-5.02-2.475 4.287 8.684 5.014a18.232 18.232 0 0 1-11.912 6.879V40.014h-4.95v10.028a18.232 18.232 0 0 1-11.923-6.872l8.695-5.02-2.475-4.286-8.692 5.018A18.232 18.232 0 0 1 10.718 32a18.232 18.232 0 0 1 1.36-6.883l8.694 5.02 2.475-4.287-8.684-5.014a18.232 18.232 0 0 1 11.912-6.879zm2.475 12.74A5.303 5.303 0 0 0 23.647 32a5.303 5.303 0 0 0 5.303 5.303A5.303 5.303 0 0 0 34.253 32a5.303 5.303 0 0 0-5.303-5.303z"
            fill={ Colors.primary }
          />
        </svg>
      </div>
    )
  }
}

Circular.propTypes = {
  classes: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  className: PropTypes.string,
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ])
}

Circular.defaultProps = {
  visible: false,
  className: null,
  delay: 500
}

export default withStyles(styles)(Circular)
export { Circular as ComponentWithProps }
