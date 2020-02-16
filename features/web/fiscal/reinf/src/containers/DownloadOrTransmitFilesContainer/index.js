import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import flow from 'lodash/fp/flow'
import { withStores } from '@syntesis/c-stores-provider'
import Typography from '@material-ui/core/Typography'
import Button from '@syntesis/c-buttons/src/components/Button'
import { withStyles } from '@material-ui/core/styles'
import formReinfStore from '../../stores/formReinfDetailsStore'
import FileDownloadIcon from '@syntesis/c-icons/src/FileDownloadIcon'
import FileTransmitIcon from '@syntesis/c-icons/src/FileTransmitIcon'
import {
  transmitFilesByCompetenceAndCompany,
  downloadFilesByCompetenceAndCompany
} from '@syntesis/s-reinf'

import styles from './styles'
import PropTypes from 'prop-types'

@inject('formReinfStore')
@observer
class FormDownOrTransmitFilesContainer extends Component {
  constructor(props) {
    super(props)
    this.onFormChange = this.onFormChange.bind(this)
    this.transmitFilesByCompetenceAndCompany = this.transmitFilesByCompetenceAndCompany.bind(this)
    this.downloadFilesByCompetenceAndCompany = this.downloadFilesByCompetenceAndCompany.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.formReinfStore.changeFormControl(controlName, control)
  }

  async downloadFilesByCompetenceAndCompany({ competence, companyPlaceId }) {
    const {
      startModalLoading,
      stopModalLoading
    } = this.props

    try {
      await startModalLoading()
      await downloadFilesByCompetenceAndCompany({ competence, companyPlaceId })
      await stopModalLoading()
    } catch (e) {
      await stopModalLoading()
    }
  }

  async transmitFilesByCompetenceAndCompany({ companyPlaceId, competence }) {
    const {
      startModalLoading,
      stopModalLoading,
      onSuccess
    } = this.props

    try {
      await startModalLoading()
      await transmitFilesByCompetenceAndCompany({ companyPlaceId, competence })
      await stopModalLoading()
      await onSuccess()
    } catch (e) {
      await stopModalLoading()
    }
  }

  render() {
    const {
      classes,
      item: {
        id: companyPlaceId
      },
      formReinfStore: {
        getFormControls: {
          competence: {
            value: competence
          }
        }
      },
      modalLoading
    } = this.props

    return (
      <div className={ classes.container }>
        <div className={ classes.paper }>
          <Typography variant="h6">
            {/* eslint-disable-next-line max-len */}
            Os arquivos já podem ser baixados para o seu dispositivo e/ou tansmitidos para a Receita Federal.
          </Typography>
          <br />
          <Typography variant="body1">
            Caso não deseje efetuar estas operações agora, você poderá baixar
            e/ou transmitir os arquivos mais tarde através da listagem detalhada dos arquivos.
          </Typography>
          <br />
          <Typography variant="body1">
            <strong>Importante:</strong> Serão transmitidos todos os arquivos
            em situação <i>Gerado</i>.
          </Typography>
        </div>

        <div className={ classes.buttonsContainer }>
          <Button
            disabled={ modalLoading }
            wrap
            variant="contained"
            roleStyle="secondaryInverseButton"
            onClick={
              () => this.downloadFilesByCompetenceAndCompany({ competence, companyPlaceId })
            }
            iconLeft={ FileDownloadIcon }
          >
            <u>Baixar</u> os arquivos
          </Button>

          <Button
            disabled={ modalLoading }
            wrap
            variant="contained"
            roleStyle="secondaryButton"
            iconLeft={ FileTransmitIcon }
            onClick={ () =>
              this.transmitFilesByCompetenceAndCompany({ companyPlaceId, competence })
            }
          >
            <u>Transmitir</u> os arquivos
          </Button>
        </div>
      </div>
    )
  }
}

FormDownOrTransmitFilesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  modalLoading: PropTypes.bool.isRequired,
  startModalLoading: PropTypes.func.isRequired,
  stopModalLoading: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  formReinfStore: MobxPropTypes.objectOrObservableObject
}


export default flow(
  withStyles(styles),
  withStores({ formReinfStore })
)(FormDownOrTransmitFilesContainer)
