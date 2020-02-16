import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import moment from 'moment/moment'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import MonthYearInput from '@syntesis/c-inputs/src/components/MonthYearInput'
import { withStores } from '@syntesis/c-stores-provider'
import formReinfDetailsStore from '../../stores/formReinfDetailsStore'

import styles from './styles'

@inject('formReinfDetailsStore')
@observer
class FormDetailsContainer extends Component {
  constructor(props) {
    super(props)
    this.onFormChange = this.onFormChange.bind(this)
  }

  onFormChange(controlName, control) {
    this.props.formReinfDetailsStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      classes,
      item,
      formReinfDetailsStore: store
    } = this.props

    const {
      getFormControls,
      getFormStatus
    } = store

    const {
      description,
      competence
    } = getFormControls

    const disabled = getFormStatus.loading

    return (
      <div>
        <Form
          mode={ { create: true } }
          store={ store }
          controls={ { ...getFormControls } }
          item={ item }
          containerClass={ classes.formContainer }
        >
          <TextInput
            name="description"
            label="Local"
            helperText="Local que o arquivo de competência será gerado"
            value={ get(item, 'description') }
            isValid={ description.isValid }
            showError={ description.showError }
            rules={ description.rules }
            errorText={ description.errorText }
            onChange={ this.onFormChange }
            disabled
          />
          <MonthYearInput
            name="competence"
            label="Competência"
            helperText="Informe uma competência para o arquivo"
            value={ competence.value }
            inputProps={ {
              inputProps: {
                minDate: moment().startOf('year').toString()
              }
             } }
            isValid={ competence.isValid }
            showError={ competence.showError }
            rules={ competence.rules }
            errorText={ competence.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
          />
        </Form>
      </div>
    )
  }
}

FormDetailsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  isActiveStepper: PropTypes.bool.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  autoFocus: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formReinfDetailsStore: MobxPropTypes.objectOrObservableObject
}

FormDetailsContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {},
  autoFocus: true
}

export default flow(
  withStyles(styles),
  withStores({ formReinfDetailsStore })
)(FormDetailsContainer)
