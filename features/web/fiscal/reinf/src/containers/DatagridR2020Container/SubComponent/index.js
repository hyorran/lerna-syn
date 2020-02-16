import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import formatMoney from '@syntesis/c-functions/src/formatMoney'
import formatCnpj from '@syntesis/c-functions/src/formatCnpj'
import Chip from '@syntesis/c-commons/src/components/Chip'
import DatagridR2020NfsListContainer from '../DatagridR2020NfsListContainer'
import formatLabelCpfCnpj from '@syntesis/c-functions/src/formatLabelCpfCnpj'

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
        serviceProviderInscriptionNumber,
        serviceTakenTotalGrossRevenue,
        serviceTakenTotalBaseRetention,
        serviceTakenTotalRetentionValue,
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
            value={ formatCnpj(serviceProviderInscriptionNumber) }
            tooltip="Número de inscrição do estabelecimento"
          />
          <Chip
            label="CNPJ do tomador de serviços"
            value={ formatCnpj(serviceTakenInscriptionNumber) }
            tooltip="Número do CNPJ da empresa que recebeu o serviço"
          />
          <Chip
            label="Valor bruto da NF"
            value={ formatMoney(serviceTakenTotalGrossRevenue) }
            tooltip="Valor bruto da Nota Fiscal"
          />
          <Chip
            label="Soma da base de cálculo da retenção"
            value={ formatMoney(serviceTakenTotalBaseRetention) }
            tooltip="Soma da base de cálculo da retenção da contribuição previdenciária das Notas Fiscais emitidas para o contratante"
          />
          <Chip
            label="Valor da retenção INSS das NFs emitidas"
            value={ formatMoney(serviceTakenTotalRetentionValue) }
            tooltip="Soma do valor da retenção das Notas Fiscais de serviço emitidas para o contratante"
          />
          {/* <Chip
            label="Prestação de serviços em obra"
            value="Não é obra de construção civil ou não está sujeita a matrícula de obra"
            tooltip="Indicativo de prestação de serviços em obra de construção civil"
          /> */}
        </div>
        <DatagridR2020NfsListContainer
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
