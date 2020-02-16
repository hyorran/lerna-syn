import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import toString from 'lodash/toString'
import get from 'lodash/get'
import find from 'lodash/find'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@syntesis/c-commons/src/components/Chip'
import formatMoney from '@syntesis/c-functions/src/formatMoney'

import styles from './styles'

class SubComponent extends Component {
  componentDidMount() {
    this.props.adjustHeight()
  }

  render() {
    const {
      classes,
      serviceClassifications,
      item: {
        fiscalServiceClassificationId,
        retentionBaseValue,
        retentionValue
        // subcontractServicesRetentionValue,
        // serviceValue15,
        // serviceValue20,
        // serviceValue25,
        // additionalValue
      }
    } = this.props

    const service = find(
      serviceClassifications,
      item => toString(item.value) === toString(fiscalServiceClassificationId)
    )

    return (
      <Fragment>
        <div className={ classes.container } >
          <Chip
            label="Tipo de serviço"
            value={ get(service, 'label') }
            // eslint-disable-next-line max-len
            tooltip={ <span>A descrição do item está disponível na <strong>Tabela 6</strong> do documento em anexo.</span> }
            externalLinkUrl="http://sped.rfb.gov.br/estatico/FA/8B747B92BBA42325278124249DB3FBE82627A3/Leiautes%20da%20EFD-Reinf%20v1.4%20-%20Anexo%20I%20-%20Tabelas.pdf"
          />
          <Chip
            label="Base de cálculo da retenção"
            value={ formatMoney(retentionBaseValue) }
            tooltip="Valor da Base de cálculo da retenção da contribuição previdenciária."
          />
          <Chip
            label="Valor da retenção apurada"
            value={ formatMoney(retentionValue) }
            tooltip="Valor da retenção apurada de acordo com o que determina a legislação vigente relativa aos serviços contidos na Nota Fiscal/Fatura."
          />
          {/* <Chip
            label="Valor da retenção destacada na NF"
            value={ formatMoney(subcontractServicesRetentionValue) }
            tooltip="valor de retenção dos SUBSERVIÇOS, caso existam."
          />
          <Chip
            label="Valor adicional da NF"
            value={ formatMoney(additionalValue) }
            tooltip="Adicional apurado de retenção da Nota Fiscal, caso os serviços tenham
            sido prestados sob condições especiais que ensejem aposentadoria
            especial aos trabalhadores após 15, 20, ou 25 anos de contribuição."
          />
          <Chip
            label="Valor dos serviços com atividade de consessão após 15 anos"
            value={ formatMoney(serviceValue15) }
            tooltip="Valor dos Serviços prestados por segurados em condições especiais,
            cuja atividade permita concessão de aposentadoria especial após
            15 anos de contribuição."
          />
          <Chip
            label="Valor dos serviços com atividade de consessão após 20 anos"
            value={ formatMoney(serviceValue20) }
            tooltip="Valor dos Serviços tomados por segurados em condições especiais,
            cuja atividade permita concessão de aposentadoria especial após 20 anos
            de contribuição."
          />
          <Chip
            label="Valor dos serviços com atividade de consessão após 25 anos"
            value={ formatMoney(serviceValue25) }
            tooltip="Valor dos Serviços prestados por segurados em condições especiais,
            cuja atividade permita concessão de aposentadoria especial após 25 anos
            de contribuição."
          /> */}
        </div>
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
