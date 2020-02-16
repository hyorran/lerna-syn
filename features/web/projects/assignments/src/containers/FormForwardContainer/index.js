import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import SaveIconButton from '@syntesis/c-buttons/src/components/IconButton/SaveIconButton'
import { withStores } from '@syntesis/c-stores-provider'
import formAssignmentsForwardStore from '../../stores/formAssignmentsForwardStore'
// import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput';
import { getPeopleForSelect } from '@syntesis/s-people'
import map from 'lodash/map'
import get from 'lodash/get'
import toString from 'lodash/toString'
// import moment from 'moment/moment'
import { getSolicitationRoutingMotivesForSelect } from '@syntesis/s-solicitation-routing-motives'

import styles from './styles'

@inject('formAssignmentsForwardStore')
@observer
class FormContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.getPeopleForSelect = this.getPeopleForSelect.bind(this)
    this.getMotivesForSelect = this.getMotivesForSelect.bind(this)
    this.state = {
      mode: {
        update: get(props, 'item.id')
      },
      listPeople: [],
      loadingPeople: true
    }
  }

  componentDidMount() {
    this.getPeopleForSelect()
    this.getMotivesForSelect()
  }

  // componentWillUpdate() {
  //   const {
  //     formAssignmentsForwardStore: {
  //       getFormControls: {
  //         forwardMotivesId
  //       }
  //     }
  //   } = this.props
  //
  //   this.onFormChange('forwardMotivesId', {
  //     ...forwardMotivesId,
  //     value: ''
  //   })
  // }

  onFormChange(controlName, control) {
    this.props.formAssignmentsForwardStore.changeFormControl(controlName, control)
  }

  async getPeopleForSelect() {
    const withUser = true
    const body = await getPeopleForSelect({ withUser })

    this.setState(prevState => ({
      ...prevState,
      listPeople: map(body.response, ({ label, value }) => ({
        value: toString(value),
        label
      })),
      loadingPeople: false
    }))
  }

  async getMotivesForSelect() {
    try {
      const origin = 1
      const body = await getSolicitationRoutingMotivesForSelect({ origin })

      this.setState(prevState => ({
        ...prevState,
        listMotives: map(body.response, ({ label, value }) => ({
          value: toString(value),
          label
        })),
        loadingMotives: false
      }))
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      formAssignmentsForwardStore: store,
      footerContainerClass,
      withButtons
    } = this.props

    const {
      getFormControls,
      getFormStatus,
      changed
    } = store

    const {
      responsibleId,
      newResponsibleId,
      // finalDate,
      forwardMotivesId
    } = getFormControls

    const { mode } = this.state

    const disabled = getFormStatus.loading

    return (
      <div>
        <Form
          mode={ mode }
          store={ store }
          onSuccess={ () => onSuccess(dialogId) }
          controls={ { ...getFormControls } }
          item={ item }
        >
          <AutocompleteInput
            name="responsibleId"
            label="Responsável"
            options={ this.state.listPeople }
            value={ responsibleId.value }
            isValid={ responsibleId.isValid }
            showError={ responsibleId.showError }
            rules={ responsibleId.rules }
            errorText={ responsibleId.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
            loading={ this.state.loadingPeople }
          />
          <AutocompleteInput
            name="newResponsibleId"
            label="Novo Responsável"
            helperText="Selecione um novo responsável pela tarefa"
            options={ this.state.listPeople }
            value={ newResponsibleId.value }
            isValid={ newResponsibleId.isValid }
            showError={ newResponsibleId.showError }
            rules={ newResponsibleId.rules }
            errorText={ newResponsibleId.errorText }
            onChange={ this.onFormChange }
            disabled={ disabled }
            loading={ this.state.loadingPeople }
          />
          {/* <DatePickerInput
            name="finalDate"
            label="Prazo"
            helperText="Informe uma data final para o prazo"
            value={ moment(finalDate.value).format('L') }
            isValid={ finalDate.isValid }
            showError={ finalDate.showError }
            rules={ finalDate.rules }
            errorText={ finalDate.errorText }
            onChange={ this.onFormChange }
            inputProps={ {
              inputProps: {
                minDate: 'today'
              }
            } }
            disabled={ disabled }
          /> */}
          <AutocompleteInput
            name="forwardMotivesId"
            label="Motivo"
            helperText="Selecione um motivo para encaminhar a atividade"
            options={ this.state.listMotives }
            value={ forwardMotivesId.value }
            isValid={ forwardMotivesId.isValid }
            showError={ forwardMotivesId.showError }
            checked={ forwardMotivesId.value }
            rules={ forwardMotivesId.rules }
            errorText={ forwardMotivesId.errorText }
            onChange={ this.onFormChange }
            loading={ this.state.loadingMotives }
            disabled={ disabled }
          />

          {
            withButtons
              ? (
                <div className={ [classes.footerContainer, footerContainerClass].join(' ') }>
                  <SaveIconButton
                    type="submit"
                    asCreate
                    disabled={ disabled || !changed }
                  >
                    {
                      mode.update
                        ? 'Salvar'
                        : 'Adicionar'
                    }
                  </SaveIconButton>
                </div>
              )
              : null
          }
        </Form>
      </div>
    )
  }
}

FormContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  formAssignmentsForwardStore: MobxPropTypes.objectOrObservableObject
}

FormContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ formAssignmentsForwardStore })
)(FormContainer)
