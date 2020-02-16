import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import GavelIcon from '@syntesis/c-icons/src/GavelIcon'
import PageTitle from '@syntesis/c-commons/src/components/PageTitle'
import { withStores } from '@syntesis/c-stores-provider'
import formExpedientNotesStore from '../stores/formExpedientNotesStore'
import formExpedientNotesFilterDeletedStore from '../stores/formExpedientNotesFilterDeletedStore'
import datagridExpedientNotesDeletedStore from '../stores/datagridExpedientNotesDeletedStore'
import DatagridDeletedContainer from '../containers/DatagridDeletedContainer'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'

import styles from './styles'

@inject('formExpedientNotesStore')
@inject('formExpedientNotesFilterDeletedStore')
@inject('datagridExpedientNotesDeletedStore')
@observer
class ScreenDeleted extends Component {
  constructor(props) {
    super(props)

    this.onRefresh = this.refresh.bind(this)
  }


  componentDidMount() {
    const {
      formExpedientNotesStore: { registerFallback },
      datagridExpedientNotesDeletedStore: { getDatagridData }
    } = this.props

    registerFallback(getDatagridData)
  }

  refresh() {
    const {
      datagridExpedientNotesDeletedStore: {
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
      formExpedientNotesFilterDeletedStore: {
        changeFormControl,
        resetForm
      }
    } = this.props

    const feature = {
      title: 'Notas de expediente excluídas',
      subtitle: 'Jurídico / Operações'
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
          >
            <Card>
              <PageTitle
                title={ feature.title }
                subtitle={ feature.subtitle }
                Icon={ GavelIcon }
                wikiPageId={ wikiPageIds.lawsuit.expedientNotes.deleted }
                summaryButton
                // customDocsButton={ {
                //   url: 'http://www.google.com'
                // } }
              />
            </Card>
            <Card className={ classes.datagridContainer }>
              <DatagridDeletedContainer
                clearFilters={ resetForm }
                changeFormControl={ changeFormControl }
                feature={ feature }
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ScreenDeleted.propTypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object,
  withoutTabContents: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  datagridExpedientNotesDeletedStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formExpedientNotesFilterDeletedStore: MobxPropTypes.objectOrObservableObject
}

ScreenDeleted.defaultProps = {
  params: {},
  withoutTabContents: false
}

export default flow(
  withStores({
    formExpedientNotesStore,
    formExpedientNotesFilterDeletedStore,
    datagridExpedientNotesDeletedStore
  }),
  withStyles(styles)
)(ScreenDeleted)
