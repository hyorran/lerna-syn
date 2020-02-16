import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import Chip from '@syntesis/c-commons/src/components/Chip'
import flow from 'lodash/fp/flow'
import findFP from 'lodash/fp/find'
import getFP from 'lodash/fp/get'
import getReinfAdjustTypes from '@syntesis/c-functions/src/getReinfAdjustTypes'
import { momentBackDateFormat, momentFriendlyDateFormat } from '@syntesis/c-pickers/src/utils'
import moment from 'moment/moment'

import styles from './styles'

class SubComponent extends Component {
  componentDidMount() {
    this.props.adjustHeight()
  }

  render() {
    const {
      classes,
      item: {
        adjustType,
        adjustCode,
        adjust,
        adjustDate,
        adjustDescription,
      }
    } = this.props

    const code = flow(
      findFP(item => item.value.toString() === adjustCode.toString()),
      getFP('label')
    )(getReinfAdjustTypes)

    return (
      <Fragment>
        <div className={ classes.container } >
          <Chip
            label="Tipo de ajuste"
            value={ adjustType.toString() === '0' ? 'Redução' : 'Acréscimo' }
          />
          <Chip
            label="Código do ajuste"
            value={ code }
          />
          <Chip
            label="Valor do ajuste"
            value={ formatMoney(adjust) }
          />
          <Chip
            label="Data do ajuste"
            value={ moment(adjustDate, momentBackDateFormat).format(momentFriendlyDateFormat) }
          />
          <Chip
            label="Descrição do ajuste"
            value={ adjustDescription }
          />
        </div>
      </Fragment>
    )
  }
}

SubComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  adjustHeight: PropTypes.func.isRequired
}

export default withStyles(styles)(SubComponent)
