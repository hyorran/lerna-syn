import React, { Component, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'
import map from 'lodash/map'
import { withStyles } from '@material-ui/core/styles'
import CircularLoader from '@syntesis/c-loaders/src/components/Circular'

import styles from './styles'

class Containers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: map(props.items, (item, index) => {
        const {
          urlPath,
          container: ItemComponent
        } = item

        return (
          <Route
            key={ index }
            path={ urlPath }
            exact={ urlPath === '/' }
            component={
              componentProps => (
                <Suspense
                  fallback={ (
                    <CircularLoader
                      visible
                      delay={ false }
                      className={ props.classes.loader }
                    />
                  ) }
                >
                  <ItemComponent { ...componentProps } />
                </Suspense>
              )
            }
          />
        )
      })
    }
  }

  render() {
    const { items } = this.state
    return (
      <Switch>
        { items }
        <Route component={ () => <Redirect to="/" /> } />
      </Switch>
    )
  }
}

Containers.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
}

Containers.defaultProps = {
  items: []
}

export default withStyles(styles)(Containers)
export { Containers as ComponentWithProps }
