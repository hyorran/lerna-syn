import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import toString from 'lodash/toString'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import Chip from '@syntesis/c-commons/src/components/Chip'
import DatagridR2060ActivityAdjustmentsContainer from '../../FormR2060ActivityContainer/DatagridR2060ActivityAdjustmentsContainer'

import styles from './styles'

class SubComponent extends Component {
  render() {
    const {
      classes,
      adjustHeight,
      economicActivities,
      item: {
        adjustments,
        fiscalEconomicActivityId,
        grossRevenueActivity,
        excludedGrossRevenue,
        aditionalGrossRevenue,
        calcBaseCprb,
        valueCprb
      }
    } = this.props

    const activity = find(
      economicActivities,
      { value: toString(fiscalEconomicActivityId) }
    )

    return (
      <Fragment>
        <div className={ classes.container } >
          <Chip
            label="Código Atividade"
            value={ get(activity, 'label', fiscalEconomicActivityId) }
            externalLinkUrl="http://sped.rfb.gov.br/estatico/FA/8B747B92BBA42325278124249DB3FBE82627A3/Leiautes%20da%20EFD-Reinf%20v1.4%20-%20Anexo%20I%20-%20Tabelas.pdf"
          />
          <Chip
            label="Valor Receita Atividade"
            value={ formatMoney(grossRevenueActivity) }
          />
          <Chip
            label="Valor Total das Reduções"
            value={ formatMoney(excludedGrossRevenue) }
          />
          <Chip
            label="Valor Total dos Acréscimos"
            value={ formatMoney(aditionalGrossRevenue) }
          />
          <Chip
            label="Base de cálculo CPRB"
            value={ formatMoney(calcBaseCprb) }
          />
          <Chip
            label="Valor CPRB"
            value={ formatMoney(valueCprb) }
          />
        </div>
        <DatagridR2060ActivityAdjustmentsContainer
          initialData={ adjustments }
          didMount={ adjustHeight }
          adjustHeight={ adjustHeight }
          viewMode
        />
      </Fragment>
    )
  }
}

SubComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  adjustHeight: PropTypes.func.isRequired,
  economicActivities: PropTypes.array.isRequired
}

export default withStyles(styles)(SubComponent)
