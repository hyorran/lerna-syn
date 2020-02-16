import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import isFunction from 'lodash/isFunction'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import SwipeableViews from 'react-swipeable-views'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabContent from '../../component/TabContent'

import styles from './styles'

class TabsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.adjustHeight = debounce(this.adjustHeight.bind(this), 200)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.registerTabActions = this.registerTabActions.bind(this)
    this.renderTabTitle = this.renderTabTitle.bind(this)
    this.renderTabContent = this.renderTabContent.bind(this)

    this.state = {
      value: 0,
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

  handleChange(event, value) {
    this.setState({ value })
  }

  handleChangeIndex(index) {
    this.setState({ value: index })
  }

  registerTabActions(actions) {
    this.setState(prevState => ({
      ...prevState,
      actions
    }))
  }

  renderTabTitle() {
    const { tabs } = this.props

    return map(tabs, ({ type, label }, index) => {
      let tabLabel = label
      if (!isEmpty(type)) {
        switch (type) {
          case 'details':
            tabLabel = 'Detalhes'
            break
          default:
            break
        }
      }
      return <Tab key={ index } label={ tabLabel } />
    })
  }

  renderTabContent() {
    const {
      theme,
      tabs
    } = this.props

    return map(tabs, ({ contentComponent = () => null, contentComponentProps = {} }, index) => {
      const ContentComponent = contentComponent
      return (
        <TabContent key={ index } dir={ theme.direction }>
          <ContentComponent { ...contentComponentProps } />
        </TabContent>
      )
    })
  }

  render() {
    const {
      classes,
      theme,
      hide
    } = this.props

    if (hide) {
      return null
    }

    const { value } = this.state

    return (
      <div className={ classes.container }>
        <AppBar position="static" color="default">
          <Tabs
            position="static"
            value={ value }
            onChange={ this.handleChange }
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="off"
          >
            { this.renderTabTitle() }
          </Tabs>
        </AppBar>

        <SwipeableViews
          animateHeight
          action={ this.registerTabActions }
          axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
          index={ this.state.value }
          onChangeIndex={ this.handleChangeIndex }
        >
          { this.renderTabContent() }
        </SwipeableViews>
      </div>
    )
  }
}

TabsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object),
  hide: PropTypes.bool
}

TabsContainer.defaultProps = {
  tabs: [],
  hide: true
}

export default withStyles(styles, { withTheme: true })(TabsContainer)
