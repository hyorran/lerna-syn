import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import Chip from '@syntesis/c-commons/src/components/Chip'
import { momentBackDateFormat, momentFriendlyDateFormat } from '@syntesis/c-pickers/src/utils'
import moment from 'moment/moment'
import DatagridR2020NfsListServiceContainer from '../DatagridR2020NfsListServiceContainer'

import styles from './styles'

class SubComponent extends Component {
  componentDidMount() {
    this.props.adjustHeight()
  }

  render() {
    const {
      classes,
      adjustHeight,
      serviceClassifications,
      item: {
        serialNumber,
        doctoNumber,
        issueDate,
        grossValue,
        observation,
        servicesTypes
      }
    } = this.props

    return (
      <Fragment>
        <div className={ classes.container } >
          <Chip
            label="Nº da NF/Fatura"
            value={ doctoNumber }
            tooltip="Número da Nota Fiscal/Fatura ou documento fiscal válido"
          />
          <Chip
            label="Nº de série da NF/Fatura"
            value={ serialNumber }
            tooltip="Nº de série da Nota Fiscal/Fatura ou Recibo Provisório de Serviço"
          />
          <Chip
            label="Data de emissão na NF"
            value={ moment(issueDate, momentBackDateFormat).format(momentFriendlyDateFormat) }
            tooltip="Data de Emissão da Nota Fiscal/Fatura ou Recibo Provisório de Serviço"
          />
          <Chip
            label="Valor bruto da NF"
            value={ formatMoney(grossValue) }
            tooltip="Valor bruto da Nota Fiscal ou do Recibo Provisório de Serviço"
          />
          <Chip
            label="Obervações"
            value={ observation }
            tooltip="Obervações adicionais da Nota Fiscal"
          />
        </div>
        <DatagridR2020NfsListServiceContainer
          initialData={ servicesTypes }
          didMount={ adjustHeight }
          adjustHeight={ adjustHeight }
          serviceClassifications={ serviceClassifications }
        />
      </Fragment>
    )
  }
}

SubComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  adjustHeight: PropTypes.func.isRequired,
  serviceClassifications: PropTypes.array.isRequired
}

export default withStyles(styles)(SubComponent)
