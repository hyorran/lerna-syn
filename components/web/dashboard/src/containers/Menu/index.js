import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardTitle from '@syntesis/c-commons/src/components/DashboardTitle'
import KeyboardArrowRight from '@syntesis/c-icons/src/KeyboardArrowRight'

import styles from './styles'

class Menu extends Component {
  render() {
    const {
      classes,
      feature,
      items,
      history: {
        push
      },
      location: {
        pathname
      }
    } = this.props

    const options = map(items, (item, index) => {
      const {
        urlPath,
        title
      } = item

      const active = pathname === urlPath

      return (
        <ListItem
          key={ index }
          button
          divider
          // dense
          classes={ {
            root: classes.listItem,
            selected: classes.listItemSelected
          } }
          selected={ active }
          onClick={ () => push(urlPath) }
        >
          <ListItemText
            primary={ title }
            classes={ {
              primary: classes.listItemText
            } }
          />
          {
            active
              ? <KeyboardArrowRight className={ classes.keyboardArrow } />
              : null
          }
        </ListItem>
      )
    })

    return (
      <div>
        <div className={ classes.featureTitleContainer }>
          <DashboardTitle { ...feature } />
        </div>

        <Divider />

        <List
          classes={ {
            root: classes.list
          } }
        >
          { options }
        </List>
      </div>
    )
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object)
}

Menu.defaultProps = {
  items: []
}

export default flow(
  withStyles(styles),
  withRouter
)(Menu)

export { Menu as ComponentWithProps }
