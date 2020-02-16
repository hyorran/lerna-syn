import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import SquareCashIcon from '@syntesis/c-icons/src/SquareCashIcon'
import PageTitle from '@syntesis/c-commons/src/components/PageTitle'
import { withStores } from '@syntesis/c-stores-provider'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'
import datagridDocReceiptsStore from '../stores/ReceiptsStore/datagridDocReceiptsStore'
import DatagridDocReceiptsContainer from '../containers/ReceiptsContainers/DatagridDocReceiptsContainer'

import styles from './styles'

@inject('datagridDocReceiptsStore')
@observer
class ScreenDocReceipts extends Component {
  constructor(props) {
    super(props)

    this.refresh = this.refresh.bind(this)
  }

  refresh() {
    const {
      datagridDocReceiptsStore: {
        onRowClick,
        getDatagridData,
      },
    } = this.props

    onRowClick({ index: null })
    getDatagridData()
  }

  render() {
    const {
      classes,
      withoutTabContents,
    } = this.props

    const feature = {
      title: 'Auditoria - Transferência',
      subtitle: 'Faturamento / Operações'
    }

    return (
      <div>
        <Grid container wrap="wrap">
          <Grid
            item
            xs={ 12 }
            sm={ 12 }
            md={ withoutTabContents ? 12 : 8 }
            lg={ withoutTabContents ? 12 : 8 }
          >
            <Card>
              <PageTitle
                title={ feature.title }
                subtitle={ feature.subtitle }
                Icon={ SquareCashIcon }
                wikiPageId={ wikiPageIds.financial.coBilling.docReceipts }
                summaryButton
              />
            </Card>
            <Card className={ classes.datagridContainer }>
              <DatagridDocReceiptsContainer
                feature={ feature }
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ScreenDocReceipts.propTypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object,
  withoutTabContents: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  datagridDocReceiptsStore: MobxPropTypes.objectOrObservableObject
}

ScreenDocReceipts.defaultProps = {
  params: {},
  withoutTabContents: false
}

export default flow(
  withStores({
    datagridDocReceiptsStore
  }),
  withStyles(styles)
)(ScreenDocReceipts)
