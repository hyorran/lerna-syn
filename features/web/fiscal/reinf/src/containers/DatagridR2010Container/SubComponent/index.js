import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import formatCnpj from '@syntesis/c-functions/src/formatCnpj'
import Chip from '@syntesis/c-commons/src/components/Chip'
import DatagridR2010NfsListContainer from '../DatagridR2010NfsListContainer'
import formatLabelCpfCnpj from '@syntesis/c-functions/src/formatLabelCpfCnpj'
import { getCprbOption } from '../../../utils'

import styles from './styles'

class SubComponent extends Component {
  render() {
    const {
      classes,
      adjustHeight,
      serviceClassifications,
      item: {
        serviceTakenInscriptionType,
        serviceTakenInscriptionNumber,
        /* Retiradas as opções provisionOfServicesInConstructionWork,
            pois conforme o Heron e o Leonardo,
            os clientes se enquadram SOMENTE na primeira opção. */
        // provisionOfServicesInConstructionWork,
        serviceProviderCnpj,
        serviceProviderTotalGrossRevenue,
        serviceProviderTotalBaseRetention,
        serviceProviderTotalRetentionValue,
        cprbType,
        nfsList
      }
    } = this.props

    return (
      <Fragment>
        <div className={ classes.container } >
          <Chip
            label="Tipo de inscrição"
            value={ formatLabelCpfCnpj(serviceTakenInscriptionType) }
            tooltip="Código correspondente ao tipo de inscrição do estabelecimento"
          />
          <Chip
            label="Nº de inscrição"
            value={ formatCnpj(serviceTakenInscriptionNumber) }
            tooltip="Número de inscrição do estabelecimento"
          />
          <Chip
            label="CNPJ do prestador de serviços"
            value={ formatCnpj(serviceProviderCnpj) }
            tooltip="Número do CNPJ da empresa que prestou o serviço"
          />
          <Chip
            label="Optante CPRB"
            value={ getCprbOption(cprbType) }
            tooltip="Indicativo se o Prestador é contribuinte da Contribuição Previdenciária sobre a Receita Bruta (CPRB)"
          />
          <Chip
            label="Valor bruto da NF"
            value={ formatMoney(serviceProviderTotalGrossRevenue) }
            tooltip="Valor bruto da Nota Fiscal"
          />
          <Chip
            label="Soma da base de cálculo da retenção"
            value={ formatMoney(serviceProviderTotalBaseRetention) }
            tooltip="Soma da base de cálculo da retenção da contribuição previdenciária das Notas Fiscais emitidas para o contratante"
          />
          <Chip
            label="Valor da retenção das NFs emitidas"
            value={ formatMoney(serviceProviderTotalRetentionValue) }
            tooltip="Soma do valor da retenção das Notas Fiscais de serviço emitidas para o contratante"
          />
        </div>
        <DatagridR2010NfsListContainer
          initialData={ nfsList }
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
