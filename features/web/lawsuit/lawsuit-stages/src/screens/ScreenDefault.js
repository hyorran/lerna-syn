import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import flow from 'lodash/fp/flow'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import GavelIcon from '@syntesis/c-icons/src/GavelIcon'
import PageTitle from '@syntesis/c-commons/src/components/PageTitle'
import CardHeightFull from '@syntesis/c-commons/src/components/CardHeightFull'
import { withStores } from '@syntesis/c-stores-provider'
import formDetailsLawsuitStagesStore from '../stores/formLawsuitStagesStore'
import formLawsuitStagesFilterStore from '../stores/formLawsuitStagesFilterStore'
import datagridLawsuitStagesStore from '../stores/datagridLawsuitStagesStore'
import DatagridContainer from '../containers/DatagridContainer'
import TabsContainer from '../containers/TabsContainer'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'
import Delay from 'react-delay-render'

import styles from './styles'

@inject('formDetailsLawsuitStagesStore')
@inject('formLawsuitStagesFilterStore')
@inject('datagridLawsuitStagesStore')
@observer
class ScreenDefault extends Component {
  constructor(props) {
    super(props)
    this.onRefresh = this.refresh.bind(this)
  }

  componentDidMount() {
    const {
      formDetailsLawsuitStagesStore: { registerFallback },
      datagridLawsuitStagesStore: { getDatagridData }
    } = this.props

    registerFallback(getDatagridData)
  }

  refresh() {
    const {
      datagridLawsuitStagesStore: {
        onRowClick,
        getDatagridData
      },
    } = this.props

    onRowClick({ index: null })
    getDatagridData()
  }

  renderRightDatagrid = () => {
    const {
      classes,
      datagridLawsuitStagesStore: {
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

    const RightDatagrid = Delay({ delay: widthGridAnimation })(() => (
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

    return <RightDatagrid />
  }

  render() {
    const {
      classes,
      formLawsuitStagesFilterStore: {
        changeFormControl,
        resetForm
      },
      datagridLawsuitStagesStore: {
        itemSelected
      }
    } = this.props

    const feature = {
      title: 'Fases Processuais',
      subtitle: 'Jurídico / Cadastros'
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
                wikiPageId={ wikiPageIds.lawsuit.lawsuitStages }
                summaryButton
              />
            </Card>
            <Card className={ classes.datagridContainer }>
              <DatagridContainer
                clearFilters={ resetForm }
                changeFormControl={ changeFormControl }
                feature={ feature }
                onRenderRightLogsDatagrid={ () => this.renderRightDatagrid }
              />
            </Card>
          </Grid>
          {
            isEmpty(itemSelected)
              ? null
              : this.renderRightDatagrid()
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
  datagridLawsuitStagesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formDetailsLawsuitStagesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formLawsuitStagesFilterStore: MobxPropTypes.objectOrObservableObject
}

ScreenDefault.defaultProps = {
  params: {}
}

export default flow(
  withStores({
    formDetailsLawsuitStagesStore,
    formLawsuitStagesFilterStore,
    datagridLawsuitStagesStore
  }),
  withTheme(),
  withStyles(styles)
)(ScreenDefault)
