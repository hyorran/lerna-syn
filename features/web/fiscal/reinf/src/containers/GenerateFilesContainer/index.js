import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import flow from 'lodash/fp/flow'
import { withStores } from '@syntesis/c-stores-provider'
import Typography from '@material-ui/core/Typography'
import Button from '@syntesis/c-buttons/src/components/Button'
import { withStyles } from '@material-ui/core/styles'
import formReinfStore from '../../stores/formReinfDetailsStore'
import FileMoveIcon from '@syntesis/c-icons/src/FileMoveIcon'
import { generateAllFiles } from '@syntesis/s-reinf'

import styles from './styles'
import PropTypes from 'prop-types'

@inject('formReinfStore')
@observer
class FormGenerateFilesContainer extends Component {
  constructor(props) {
    super(props)
    this.onFormChange = this.onFormChange.bind(this)
    this.generateAllFiles = this.generateAllFiles.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.formReinfStore.changeFormControl(controlName, control)
  }

  async onConfirm() {
    const {
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
      onSuccess,
      startModalLoading,
      stopModalLoading
    } = this.props

    try {
      await startModalLoading()
      await this.generateAllFiles({ companyPlaceId, competence })
      stopModalLoading()
      onSuccess()
    } catch (e) {
      stopModalLoading()
      throw e
    }
  }

  async generateAllFiles({ companyPlaceId, competence }) {
    try {
      await generateAllFiles({ companyPlaceId, competence })
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      classes,
      modalLoading
    } = this.props

    return (
      <div className={ classes.container }>
        <div className={ classes.paper }>
          <Typography variant="h6">
            Os arquivos salvos já podem ser gerados.
          </Typography>
          <br />
          <Typography variant="body1">
            Caso não deseje efetuar esta operação agora, você poderá gerá-los
            individulamente mais tarde através da listagem detalhada dos arquivos.
          </Typography>
          <br />
          <Typography variant="body1">
            <strong>Importante:</strong> Serão gerados todos
            os arquivos em situação <i>Aguardando</i>.
          </Typography>
        </div>

        <div className={ classes.buttonsContainer }>
          <Button
            disabled={ modalLoading }
            wrap
            variant="contained"
            roleStyle="secondaryInverseButton"
            onClick={ this.onConfirm }
            iconLeft={ FileMoveIcon }
          >
            Gerar arquivos
          </Button>
        </div>
      </div>
    )
  }
}

FormGenerateFilesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  setCompleted: PropTypes.func.isRequired,
  modalLoading: PropTypes.bool.isRequired,
  startModalLoading: PropTypes.func.isRequired,
  stopModalLoading: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  formReinfStore: MobxPropTypes.objectOrObservableObject
}

FormGenerateFilesContainer.defaultProps = {
  onSuccess: () => {}
}

export default flow(
  withStyles(styles),
  withStores({ formReinfStore })
)(FormGenerateFilesContainer)
