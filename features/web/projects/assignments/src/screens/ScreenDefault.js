import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import ShipWheelIcon from '@syntesis/c-icons/src/ShipWheelIcon'
import PageTitle from '@syntesis/c-commons/src/components/PageTitle'
import CardHeightFull from '@syntesis/c-commons/src/components/CardHeightFull'
import { withStores } from '@syntesis/c-stores-provider'
import formAssignmentsForwardStore from '../stores/formAssignmentsForwardStore'
import formAssignmentsCancelStore from '../stores/formAssignmentsCancelStore'
import formAssignmentsFilterStore from '../stores/formAssignmentsFilterStore'
import datagridAssignmentsStore from '../stores/datagridAssignmentsStore'
import DatagridContainer from '../containers/DatagridContainer'
import TabsContainer from '../containers/TabsContainer'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'

import styles from './styles'

@inject('formAssignmentsForwardStore')
@inject('formAssignmentsCancelStore')
@inject('formAssignmentsFilterStore')
@inject('datagridAssignmentsStore')
@observer
class ScreenDefault extends Component {
  constructor(props) {
    super(props)

    this.onRefresh = this.refresh.bind(this)
  }


  componentDidMount() {
    const {
      formAssignmentsForwardStore: { registerFallback },
      datagridAssignmentsStore: { getDatagridData }
    } = this.props

    registerFallback(getDatagridData)
  }

  refresh() {
    const {
      datagridAssignmentsStore: {
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
      datagridAssignmentsStore: {
        itemSelected,
        onRowClick,
        getDatagridData
      },
      formAssignmentsFilterStore: {
        changeFormControl,
        resetForm
      },
      withoutTabContents
    } = this.props

    const feature = {
      title: 'Atividades/Prazos',
      subtitle: 'Suíte / Operações'
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
                Icon={ ShipWheelIcon }
                wikiPageId={ wikiPageIds.projects.assignments }
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
              />
            </Card>
          </Grid>

          {
            withoutTabContents
              ? null
              : (
                <Grid
                  item
                  xs={ 12 }
                  sm={ 12 }
                  md={ 4 }
                  lg={ 4 }
                >
                  <CardHeightFull cardContainerClass={ classes.cardRightContainer }>
                    <TabsContainer
                      item={ itemSelected }
                      onRefresh={ () => {
                        onRowClick({ index: null })
                        getDatagridData()
                      } }
                    />
                  </CardHeightFull>
                </Grid>
            )
          }
        </Grid>
      </div>
    )
  }
}

ScreenDefault.propTypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object,
  withoutTabContents: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  datagridAssignmentsStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formAssignmentsForwardStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formAssignmentsCancelStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formAssignmentsFilterStore: MobxPropTypes.objectOrObservableObject
}

ScreenDefault.defaultProps = {
  params: {},
  withoutTabContents: false
}

export default flow(
  withStores({
    formAssignmentsForwardStore,
    formAssignmentsCancelStore,
    formAssignmentsFilterStore,
    datagridAssignmentsStore
  }),
  withStyles(styles)
)(ScreenDefault)
