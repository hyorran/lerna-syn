import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styles from './styles'

const SinglePanel = (props) => {
  const {
    classes,
    title,
    ContentComponent,
    componentProps,
    initialExpanded
  } = props

  const [expanded, setExpanded] = useState(initialExpanded)

  return (
    <ExpansionPanel
      expanded={ expanded }
      onChange={ (_, exp) => setExpanded(exp) }
      className={ expanded ? classes.rootExpanded : null }
    >
      <ExpansionPanelSummary
        expandIcon={ <ExpandMoreIcon /> }
        className={ expanded ? classes.panelSelected : classes.panelSummary }
      >
        <Typography className={ expanded ? classes.panelSelectedTitle : classes.panelHeader }>
          { title }
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={ classes.panelDetails }>
        <div className={ classes.panelInsideDetails }>
          {
            expanded
              ? <ContentComponent { ...componentProps } />
              : <div />
          }
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
SinglePanel.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  ContentComponent: PropTypes.func,
  componentProps: PropTypes.object,
  filter: PropTypes.object,
  initialExpanded: PropTypes.bool
}
SinglePanel.defaultProps = {
  title: '',
  ContentComponent: () => null,
  componentProps: {},
  filter: {},
  initialExpanded: false
}
export default withStyles(styles)(SinglePanel)
