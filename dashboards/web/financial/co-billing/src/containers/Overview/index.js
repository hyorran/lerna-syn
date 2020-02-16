import React, { Component } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import SquareCashIcon from '@syntesis/c-icons/src/SquareCashIcon'
import PageTitle from '@syntesis/c-commons/src/components/PageTitle'
import DateRangePickerInput from '@syntesis/c-inputs/src/components/pickers/DateRangePickerInput'
import ExpansionPanel from '@syntesis/c-panels/src/containers/ExpansionPanel'
import { getPlaces } from '@syntesis/s-cobilling-places'
import CoBillingIndicatorOverview from '@syntesis/f-co-billing/src/containers/IndicatorsContainer'
import moment from 'moment/moment'
import { momentBackDateFormat } from '@syntesis/c-pickers/src/utils'
import styles from './styles'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'

class Overview extends Component {
  constructor(props) {
    super(props)
    this.fetchPlaces = this.fetchPlaces.bind(this)
    this.datePickerChange = this.datePickerChange.bind(this)

    this.state = {
      panels: [],
      dateRange: {
        from: {
          value: moment().startOf('month').format(momentBackDateFormat)
        },
        to: {
          value: moment().format(momentBackDateFormat)
        }
      }
    }
  }

  componentDidMount() {
    this.fetchPlaces()
  }

  async fetchPlaces() {
    const { response } = await getPlaces()

    const panelsByPlaces = map(response, place => ({
      title: place.description,
      component: CoBillingIndicatorOverview,
      componentProps: {
        cobillingPlaceId: place.id,
        dateRange: this.state.dateRange
      }
    }))

    const panels = [
      {
        title: 'Geral',
        component: CoBillingIndicatorOverview,
        componentProps: {
          dateRange: this.state.dateRange
        }
      },
      ...panelsByPlaces
    ]
    this.setState(prevState => ({
      ...prevState,
      panels
    }))
  }

  datePickerChange = (controlName, control) => {
    const dateRange = control.value
    this.setState(prevState => ({
      ...prevState,
      dateRange,
      panels: map(prevState.panels, panel => ({
        ...panel,
        componentProps: {
          ...panel.componentProps,
          dateRange
        }
      }))
    }))
  }

  render() {
    const {
      panels,
      dateRange
    } = this.state

    const feature = {
      title: 'Visão Geral',
      subtitle: 'Co-Billing'
    }
    const {
      classes
    } = this.props

    return (
      <div >
        <Grid container wrap="wrap" >
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
                Icon={ SquareCashIcon }
                wikiPageId={ wikiPageIds.financial.coBilling.overview }
                summaryButton
              />
            </Card>
            <Card>
              <div className={ classes.cardHeader }>
                <div className={ classes.dateRangePicker }>
                  <DateRangePickerInput
                    name="period"
                    label="Período para visualização"
                    inputProps={ {
                      inputProps: {
                        maxDate: 'today',
                        showStatic: false
                      }
                    } }
                    value={ dateRange }
                    onChange={ this.datePickerChange }
                  />
                </div>
              </div>
            </Card>
            <Card className={ classes.details }>
              <ExpansionPanel
                panels={ panels }
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired
};
Overview.defaultProps = {

}
export default withStyles(styles)(Overview)
