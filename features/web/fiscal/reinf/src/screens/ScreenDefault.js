import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CashRegisterIcon from '@syntesis/c-icons/src/CashRegisterIcon'
import PageTitle from '@syntesis/c-commons/src/components/PageTitle'
import DatagridContainer from '../containers/DatagridContainer'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'

import styles from './styles'

class ScreenDefault extends Component {
  render() {
    const {
      classes
    } = this.props

    const feature = {
      title: 'Geração de arquivos EFD - REINF',
      subtitle: 'Fiscal / Operações'
    }

    return (
      <div>
        <Grid container wrap="wrap">
          <Grid
            item
            xs={ 12 }
            sm={ 12 }
            md={ 12 }
            lg={ 12 }
            className={ classes.gridWidthAnimation }
          >
            <Card>
              <PageTitle
                title={ feature.title }
                subtitle={ feature.subtitle }
                Icon={ CashRegisterIcon }
                wikiPageId={ wikiPageIds.fiscal.reinf }
                summaryButton
              />
            </Card>
          </Grid>
          <Grid
            item
            xs={ 12 }
            sm={ 12 }
            md={ 12 }
            lg={ 12 }
            className={ classes.gridWidthAnimation }
          >
            <Card className={ classes.datagridContainer }>
              <DatagridContainer feature={ feature } />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ScreenDefault.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  params: PropTypes.object
}

ScreenDefault.defaultProps = {
  params: {}
}

export default flow(
  withTheme(),
  withStyles(styles)
)(ScreenDefault)
