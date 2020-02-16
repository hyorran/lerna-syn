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
import formEntriesFilterStore from '../stores/EntriesStores/formEntriesFilterStore'
import datagridEntriesStore from '../stores/EntriesStores/datagridEntriesStore'
import DatagridEntriesContainer from '../containers/EntriesContainers/DatagridEntriesContainer'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'
import { getLastUpdate } from '@syntesis/s-cobilling'
import moment from 'moment/moment'

import styles from './styles'

@inject('formEntriesFilterStore')
@inject('datagridEntriesStore')
@observer
class ScreenEntries extends Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
    this.fetchLastUpdate = this.fetchLastUpdate.bind(this)

    this.state = {
      lastUpdated: 'Atualizando...'
    }
  }

  componentDidMount() {
    this.fetchLastUpdate()
  }

  refresh() {
    const {
      datagridEntriesStore: {
        onRowClick,
        getDatagridData,
      },
    } = this.props

    onRowClick({ index: null })
    getDatagridData()
  }

  async fetchLastUpdate() {
    try {
      const { response } = await getLastUpdate()

      this.setState(prevState => ({
        ...prevState,
        lastUpdated: `Atualizado em: ${ moment(response).format('L LT') }`
      }))
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      classes,
      withoutTabContents,
      formEntriesFilterStore: {
        changeFormControl,
        resetForm
      }
    } = this.props

    const feature = {
      title: 'Emissões',
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
                wikiPageId={ wikiPageIds.financial.coBilling.entries }
                summaryButton
              />
            </Card>
            <Card className={ classes.datagridContainer }>
              <DatagridEntriesContainer
                changeFormControl={ changeFormControl }
                clearFilters={ resetForm }
                feature={ feature }
                lastUpdated={ this.state.lastUpdated }
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ScreenEntries.propTypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object,
  withoutTabContents: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  datagridEntriesStore: MobxPropTypes.objectOrObservableObject,
  // eslint-disable-next-line react/require-default-props
  formEntriesFilterStore: MobxPropTypes.objectOrObservableObject
}

ScreenEntries.defaultProps = {
  params: {},
  withoutTabContents: false,
  formEntriesFilterStore
}

export default flow(
  withStores({ datagridEntriesStore }),
  withStyles(styles)
)(ScreenEntries)
