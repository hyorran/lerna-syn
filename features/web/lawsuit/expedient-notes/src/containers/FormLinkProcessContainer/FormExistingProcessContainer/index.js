import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridInput from '@syntesis/c-inputs/src/components/DatagridInput'
import { withStores } from '@syntesis/c-stores-provider'
import DatagridLawsuitsContainer from '@syntesis/c-datagrid/src/inputs/DatagridLawsuitsContainer'
import expedientNotesLinkProcessStore from '../../../stores/formExpedientNotesLinkProcessStore'

import styles from './styles'

@inject('expedientNotesLinkProcessStore')
@observer
class FormExistingProcessContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.expedientNotesLinkProcessStore.changeFormControl(controlName, control)
  }

  render() {
    const { expedientNotesLinkProcessStore: store } = this.props

    const {
      getFormControls,
      getFormStatus
    } = store

    const {
      lawsuitId
    } = getFormControls

    const disabled = getFormStatus.loading

    return (
      <DatagridInput
        name="lawsuitId"
        label="Processo"
        helperText="Selecione um processo para a nota de expediente"
        value={ lawsuitId.value }
        isValid={ lawsuitId.isValid }
        showError={ lawsuitId.showError }
        rules={ lawsuitId.rules }
        errorText={ lawsuitId.errorText }
        onChange={ this.onFormChange }
        disabled={ disabled }
        datagridContainer={ DatagridLawsuitsContainer }
        labelKey="processNumber"
        valueKey="id"
      />
    )
  }
}

FormExistingProcessContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  expedientNotesLinkProcessStore: MobxPropTypes.objectOrObservableObject
}

export default flow(
  withStyles(styles),
  withStores({ expedientNotesLinkProcessStore })
)(FormExistingProcessContainer)
