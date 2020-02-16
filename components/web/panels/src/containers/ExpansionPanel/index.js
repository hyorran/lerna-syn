import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import SinglePanel from '@syntesis/c-panels/src/components/SinglePanel'

import styles from './styles'

class ExpansionPanel extends Component {
  createPanels = (panel, index) => {
    const {
      component,
      componentProps,
      title
    } = panel

    return (
      <SinglePanel
        initialExpanded={ index === 0 }
        key={ index }
        title={ title }
        ContentComponent={ component }
        componentProps={ componentProps }
      />
    )
  }

  render() {
    const { panels } = this.props
    return map(panels, this.createPanels)
  }
}

ExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  panels: PropTypes.arrayOf(PropTypes.object)
}

ExpansionPanel.defaultProps = {
  panels: []
}
export default withStyles(styles)(ExpansionPanel)
