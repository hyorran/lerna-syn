import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import uuid from 'uuid/v1'

import styles from './styles'

class SubComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      key: uuid()
    }
  }

  render() {
    const {
      original,
      classes,
      children: Children,
      ...otherProps
    } = this.props

    return (
      <div className={ classes.container }>
        <Children
          key={ this.state.key }
          item={ original }
          { ...otherProps }
        />
      </div>
    )
  }
}

SubComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  original: PropTypes.object.isRequired,
}

export default withStyles(styles)(SubComponent)
