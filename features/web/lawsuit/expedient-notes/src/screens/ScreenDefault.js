import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import GavelIcon from '@syntesis/c-icons/src/GavelIcon'
import PageTitle from '@syntesis/c-commons/src/components/PageTitle'
import CardHeightFull from '@syntesis/c-commons/src/components/CardHeightFull'
import { withStores } from '@syntesis/c-stores-provider'
import formExpedientNotesFilterStore from '../stores/formExpedientNotesFilterStore'
import formExpedientNotesStore from '../stores/formExpedientNotesStore'
import datagridExpedientNotesStore from '../stores/datagridExpedientNotesStore'
import DatagridContainer from '../containers/DatagridContainer'
import TabsContainer from '../containers/TabsContainer'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'
import Delay from 'react-delay-render'

import styles from './styles'

@inject('formExpedientNotesStore')
@inject('formExpedientNotesFilterStore')
@inject('datagridExpedientNotesStore')
@observer
class ScreenDefault extends Component {
  constructor(props) {
    super(props)
    this.onRefresh = this.refresh.bind(this)
  }

  componentDidMount() {
    const {
      formExpedientNotesStore: { registerFallback },
      datagridExpedientNotesStore: { getDatagridData }
    } = this.props

    registerFallback(getDatagridData)
  }

  // componentWillUpdate(nextProps) {
  //   const {
  //     datagridExpedientNotesStore: {
  //       itemSelected
  //     },
  //   } = this.props
  //
  //   if (!isEqual(itemSelected, nextProps.datagridExpedientNotesStore.itemSelected)) {
  //     this.getItem(get(nextProps, 'item'))
  //   }
  // }

  refresh() {
    const {
      datagridExpedientNotesStore: {
        onRowClick,
        getDatagridData
      },
    } = this.props

    onRowClick({ index: null })
    getDatagridData()
  }

  renderRightLogsDatagrid = () => {
    const {
      classes,
      datagridExpedientNotesStore: {
        itemSelected,
        onRowClick,
        getDatagridData
      },
      theme: {
        custom: {
          widthGridAnimation
        }
      }
    } = this.props

    const RightLogsDatagrid = Delay({ delay: widthGridAnimation })(() => (
      <Grid
        item
        xs={ 12 }
        sm={ 12 }
        md={ 4 }
        lg={ 4 }
      >
        <Fade in>
          <CardHeightFull cardContainerClass={ classes.cardRightContainer }>
            <TabsContainer
              item={ itemSelected }
              onRefresh={ () => {
                onRowClick({ index: null })
                getDatagridData()
              } }
            />
          </CardHeightFull>
        </Fade>
      </Grid>
    ))

    return <RightLogsDatagrid />
  }

  render() {
    const {
      classes,
      formExpedientNotesFilterStore: {
        changeFormControl,
        resetForm
      },
      datagridExpedientNotesStore: {
        itemSelected
      }
    } = this.props

    const feature = {
      title: 'Notas de expediente pendentes',
      subtitle: 'Jurídico / Operações'
    }

    return (
      <div>
        <Grid container wrap="wrap">
          <Grid
            item
            xs={ 12 }
            sm={ 12 }
            md={ isEmpty(itemSelected) ? 12 : 8 }
            lg={ isEmpty(itemSelected) ? 12 : 8 }
            className={ classes.gridWidthAnimation }
          >
            <Card>
              <PageTitle
                title={ feature.title }
                subtitle={ feature.subtitle }
                Icon={ GavelIcon }
                wikiPageId={ wikiPageIds.lawsuit.expedientNotes.pending }
                summaryButton
                // customDocsButton={ {
                //   url: 'http://www.google.com'
                // } }
              />
            </Card>
            <Card className={ classes.datagridContainer }>
              <DatagridContainer
                clearFilters={ resetForm }
                changeFormControl={ changeFormControl }
                feature={ feature }
                onRenderRightLogsDatagrid={ () => this.renderRightLogsDatagrid }
              />
            </Card>
          </Grid>
          {
            isEmpty(itemSelected)
              ? null
              : this.renderRightLogsDatagrid()
          }
        </Grid>
      </div>
    )
  }
}

ScreenDefault.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  params: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  datagridExpedientNotesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesFilterStore: MobxPropTypes.objectOrObservableObject
}

ScreenDefault.defaultProps = {
  params: {}
}

export default flow(
  withStores({
    formExpedientNotesStore,
    formExpedientNotesFilterStore,
    datagridExpedientNotesStore
  }),
  withTheme(),
  withStyles(styles)
)(ScreenDefault)
