import React from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import first from 'lodash/fp/first'
import getOr from 'lodash/fp/getOr'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import Scroll from '@syntesis/c-scroll'
import ReactResizeDetector from 'react-resize-detector'

import styles from './styles'

const HeightFull = (props) => {
  const {
    classes,
    children,
    cardContainerClass,
    setHeight,
  } = props

  let { component: Div } = props

  return (
    <ReactResizeDetector
      handleWidth
      handleHeight
      render={
        () => {
          const {
            innerHeight,
            // innerWidth
          } = window

          const menuTopHeight = flow(
            first,
            getOr(0, 'offsetHeight')
          )(document.getElementsByClassName('topbar'))

          const scrollStyle = {}
          const cardStyles = {
            // pega a altura da window - altura do menu top
            // menuTopHeight - (padding do container principal + diferença do menu top)
            maxHeight: innerHeight - (menuTopHeight + 22) // 10 + 6 top + 6 bottom
          }

          // if (innerWidth < 992) {
          //   cardStyles.maxHeight = 'none'
          // } else {
            // diminui a area "scrollable" dentro do card
            // para nao cortar o scroll
          scrollStyle.autoHeightMax = cardStyles.maxHeight - 15
          // }

          if (setHeight) {
            cardStyles.height = cardStyles.maxHeight
            scrollStyle.height = scrollStyle.autoHeightMax
          }

          if (Div === 'div') {
            Div = ({ children: child }) => (<div>{ child }</div>)
          }

          return (
            <Div style={ cardStyles } className={ [classes.container, cardContainerClass].join(' ') }>
              <Scroll { ...scrollStyle }>
                { children }
              </Scroll>
            </Div>
          )
        }
      }
    />
  )
}

HeightFull.propTypes = {
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** Elements inside Card. */
  children: PropTypes.element,
  /** Container css class. */
  cardContainerClass: PropTypes.string,
  /** if 'true', the component will be maxed out inside the wrapper component. */
  setHeight: PropTypes.bool,
  /** Component used inside the card. */
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ])
}

HeightFull.defaultProps = {
  children: null,
  cardContainerClass: null,
  setHeight: false,
  component: Card
}

export default withStyles(styles)(HeightFull)
export { HeightFull as ComponentWithProps }
