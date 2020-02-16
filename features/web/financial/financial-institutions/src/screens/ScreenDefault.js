import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import flow from 'lodash/fp/flow'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import BankIcon from '@syntesis/c-icons/src/BankIcon'
import PageTitle from '@syntesis/c-commons/src/components/PageTitle'
import CardHeightFull from '@syntesis/c-commons/src/components/CardHeightFull'
import { withStores } from '@syntesis/c-stores-provider'
import formStore from '../stores/formStore'
import formFilterStore from '../stores/formFilterStore'
import datagridStore from '../stores/datagridStore'
import DatagridContainer from '../containers/DatagridContainer'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'
import Delay from 'react-delay-render'
import TabsContainer from '../containers/TabsContainer'

import styles from './styles'

@inject('formStore')
@inject('formFilterStore')
@inject('datagridStore')
@observer
class ScreenDefault extends Component {
  constructor(props) {
    super(props)
    this.onRefresh = this.refresh.bind(this)
  }

  componentDidMount() {
    const {
      formStore: { registerFallback },
      datagridStore: { getDatagridData }
    } = this.props

    registerFallback(getDatagridData)
  }

  refresh() {
    const {
      datagridStore: {
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
      datagridStore: {
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
              fallback={ () => {
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
      formFilterStore: {
        changeFormControl,
        resetForm
      },
      datagridStore: {
        itemSelected
      }
    } = this.props

    const feature = {
      title: 'Instituições Financeiras',
      subtitle: 'Financeiro / Cadastros'
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
                Icon={ BankIcon }
                wikiPageId={ wikiPageIds.financial.financialInstitutions }
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
  withoutTabContents: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  datagridStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formFilterStore: MobxPropTypes.objectOrObservableObject
}

ScreenDefault.defaultProps = {
  params: {},
  withoutTabContents: false
}

export default flow(
  withStores({
    formStore,
    formFilterStore,
    datagridStore
  }),
  withTheme(),
  withStyles(styles)
)(ScreenDefault)
