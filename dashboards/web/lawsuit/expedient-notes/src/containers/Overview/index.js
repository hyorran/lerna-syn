import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import GavelIcon from '@syntesis/c-icons/src/GavelIcon'
import PageTitle from '@syntesis/c-commons/src/components/PageTitle'
import IndicatorGroup from '@syntesis/c-indicator/src/components/IndicatorGroup'
import PendingIndicator from '@syntesis/f-expedient-notes/src/indicators/PendingIndicator'
import WithProcessIndicator from '@syntesis/f-expedient-notes/src/indicators/WithProcessIndicator'
import WithoutProcessIndicator from '@syntesis/f-expedient-notes/src/indicators/WithoutProcessIndicator'
import DelayedIndicator from '@syntesis/f-expedient-notes/src/indicators/DelayedIndicator'
import ActivityPendingIndicator from '@syntesis/f-expedient-notes/src/indicators/ActivityPendingIndicator'
import ActivityDelayedIndicator from '@syntesis/f-expedient-notes/src/indicators/ActivityDelayedIndicator'
import ActivityForTodayIndicator from '@syntesis/f-expedient-notes/src/indicators/ActivityForTodayIndicator'
import ActivityFutureIndicator from '@syntesis/f-expedient-notes/src/indicators/ActivityFutureIndicator'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'

import styles from './styles'

class Overview extends Component {
  render() {
    const feature = {
      title: 'Visão Geral',
      subtitle: 'Jurídico'
    }

    const { classes } = this.props

    return (
      <div>
        <Grid container wrap="wrap">
          <Grid
            item
            xs={ 12 }
            sm={ 12 }
            md={ 12 }
            lg={ 12 }
          >
            <Card>
              <PageTitle
                title={ feature.title }
                subtitle={ feature.subtitle }
                Icon={ GavelIcon }
                wikiPageId={ wikiPageIds.lawsuit.expedientNotes.overview }
                summaryButton
                // customDocsButton={ {
                //   url: 'http://www.google.com'
                // } }
              />
            </Card>
            <Card className={ classes.datagridContainer }>
              <IndicatorGroup title="Notas de expediente">
                <DelayedIndicator severity="danger" />
                <PendingIndicator severity="warning" />
                <WithoutProcessIndicator />
                <WithProcessIndicator />
              </IndicatorGroup>

              <IndicatorGroup title="Atividades">
                <ActivityDelayedIndicator severity="danger" />
                <ActivityPendingIndicator severity="warning" />
                <ActivityForTodayIndicator />
                <ActivityFutureIndicator severity="success" />
              </IndicatorGroup>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview)
