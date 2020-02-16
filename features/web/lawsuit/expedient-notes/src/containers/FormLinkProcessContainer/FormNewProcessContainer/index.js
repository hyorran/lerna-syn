import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import forEach from 'lodash/forEach'
import camelCase from 'lodash/camelCase'
import isEmpty from 'lodash/isEmpty'
import toString from 'lodash/toString'
import get from 'lodash/get'
import omitBy from 'lodash/omitBy'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import DatePickerInput from '@syntesis/c-inputs/src/components/pickers/DatePickerInput'
import DatagridInput from '@syntesis/c-inputs/src/components/DatagridInput'
import { withStores } from '@syntesis/c-stores-provider'
import {
  getLawsuitTypesForSelect,
  getConfigurationById
} from '@syntesis/s-lawsuit-types'
import DatagridClientContainer from '@syntesis/c-datagrid/src/inputs/DatagridClientContainer'
import DatagridActobjectsContainer from '@syntesis/c-datagrid/src/inputs/DatagridActobjectsContainer'
import DatagridActtypesContainer from '@syntesis/c-datagrid/src/inputs/DatagridActtypesContainer'
import DatagridJudgementsContainer from '@syntesis/c-datagrid/src/inputs/DatagridJudgementsContainer'
import DatagridCauseLawyerContainer from '@syntesis/c-datagrid/src/inputs/DatagridCauseLawyerContainer'
import DatagridOppositeLawyerContainer from '@syntesis/c-datagrid/src/inputs/DatagridOppositeLawyerContainer'
import DatagridDistribuitionsContainer from '@syntesis/c-datagrid/src/inputs/DatagridDistribuitionsContainer'
import expedientNotesLinkProcessStore from '../../../stores/formExpedientNotesLinkProcessStore'

import styles from './styles'

@inject('expedientNotesLinkProcessStore')
@observer
class FormLinkProcessContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.getLawsuitType = this.getLawsuitType.bind(this)
    this.getConfiguration = this.getConfiguration.bind(this)
    this.changeLawsuitRules = this.changeLawsuitRules.bind(this)

    this.state = {
      listLawsuitType: [],
      loadinglawsuitType: true,
      showDistribuition: false,
      configurations: {}
    }
  }

  componentDidMount() {
    this.getLawsuitType()
  }

  onFormChange(controlName, control) {
    const {
      expedientNotesLinkProcessStore: {
        changeFormControl,
        getFormControls: {
          lawsuitTypeId: {
            value: lawsuitTypeId
          }
        }
      }
    } = this.props

    if (controlName === 'lawsuitTypeId' && control.value !== lawsuitTypeId) {
      this.changeLawsuitRules(control, () => {
        changeFormControl(controlName, control)
      })
    } else {
      changeFormControl(controlName, control)
    }
  }

  async getLawsuitType() {
    try {
      const body = await getLawsuitTypesForSelect()

      this.setState(prevState => ({
        ...prevState,
        listLawsuitType: map(body.response, ({ label, value }) => ({
          value: toString(value),
          label
        })),
        loadinglawsuitType: false
      }))
    } catch (e) {
      throw e
    }
  }

  async getConfiguration(id) {
    try {
      const { response } = await getConfigurationById(id)
      let configurations = {}
      forEach(response, (configuration, name) => {
        configurations = {
          ...configurations,
          [camelCase(name)]: configuration
        }
      })
      return configurations
    } catch (e) {
      throw e
    }
  }

  async changeLawsuitRules(control, cb = () => {}) {
    const {
      expedientNotesLinkProcessStore: {
        changeAllControlsRules,
        getFormControls
      }
    } = this.props

    const { value } = control
    if (!isEmpty(value)) {
      let configurations = await this.getConfiguration(value)

      configurations = omitBy(
        configurations,
        (_, configKey) => isEmpty(getFormControls[configKey])
      )
      configurations = omitBy(
        configurations,
        (_, configKey) => configKey === 'lawsuitId'
      )

      const configField = config => ({
        show: config !== '2',
        required: config === '0'
      })

      configurations = mapValues(configurations, configuration => ({
        ...configField(configuration),
        list: [],
        loading: true
      }))

      this.setState(prevState => ({
        ...prevState,
        configurations
      }), () => {
        const controlsToChangeRules = map(
          this.state.configurations,
          (configuration, name) => ({
            controlName: name,
            newRules: ['required'],
            add: configuration.required
          })
        )
        changeAllControlsRules(controlsToChangeRules)
        this.setState(prevState => ({
          ...prevState,
          showDistribuition: true
        }))
        cb()
      })
    } else {
      this.setState(prevState => ({
        ...prevState,
        showDistribuition: false,
        configurations: mapValues(prevState.configurations, configuration => ({
          ...configuration,
          show: false
        }))
      }), cb)
    }
  }

  render() {
    const {
      expedientNotesLinkProcessStore: store,
    } = this.props

    const {
      listLawsuitType,
      loadingLawsuitType,
      showDistribuition,
      configurations
    } = this.state

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      lawsuitTypeId,
      processNumber,
      authorId,
      causeLawyerId,
      defendantId,
      oppositeLawyerId,
      actobjectId,
      acttypeId,
      judgementId,
      distribuitionId,
      entry
    } = getFormControls

    const disabled = getFormStatus.loading

    return (
      <Fragment>
        <AutocompleteInput
          name="lawsuitTypeId"
          label="Tipo do processo"
          helperText="Informe o tipo para o processo"
          options={ listLawsuitType }
          value={ lawsuitTypeId.value }
          isValid={ lawsuitTypeId.isValid }
          showError={ lawsuitTypeId.showError }
          rules={ lawsuitTypeId.rules }
          errorText={ lawsuitTypeId.errorText }
          onChange={ this.onFormChange }
          loading={ loadingLawsuitType }
          disabled={ disabled }
        />
        <TextInput
          name="processNumber"
          label="Nº do processo"
          visible={ get(configurations, 'processNumber.show', false) }
          helperText="Informe o número para o processo"
          value={ processNumber.value }
          isValid={ processNumber.isValid }
          showError={ processNumber.showError }
          rules={ processNumber.rules }
          errorText={ processNumber.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <DatagridInput
          name="authorId"
          label="Autor"
          visible={ get(configurations, 'authorId.show', false) }
          helperText="Selecione um autor para o processo"
          value={ authorId.value }
          isValid={ authorId.isValid }
          showError={ authorId.showError }
          rules={ authorId.rules }
          errorText={ authorId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          datagridContainer={ DatagridClientContainer }
          labelKey="name"
          valueKey="id"
        />
        <DatagridInput
          name="causeLawyerId"
          label="Advogado da causa"
          visible={ get(configurations, 'causeLawyerId.show', false) }
          helperText="Selecione advogado da causa para o processo"
          value={ causeLawyerId.value }
          isValid={ causeLawyerId.isValid }
          showError={ causeLawyerId.showError }
          rules={ causeLawyerId.rules }
          errorText={ causeLawyerId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          datagridContainer={ DatagridCauseLawyerContainer }
          labelKey="name"
          valueKey="id"
        />
        <DatagridInput
          name="defendantId"
          label="Réu"
          visible={ get(configurations, 'defendantId.show', false) }
          helperText="Selecione um réu para o processo"
          value={ defendantId.value }
          isValid={ defendantId.isValid }
          showError={ defendantId.showError }
          rules={ defendantId.rules }
          errorText={ defendantId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          datagridContainer={ DatagridClientContainer }
          labelKey="name"
          valueKey="id"
        />
        <DatagridInput
          name="oppositeLawyerId"
          label="Advogado adverso"
          visible={ get(configurations, 'oppositeLawyerId.show', false) }
          helperText="Selecione advogado adverso para o processo"
          value={ oppositeLawyerId.value }
          isValid={ oppositeLawyerId.isValid }
          showError={ oppositeLawyerId.showError }
          rules={ oppositeLawyerId.rules }
          errorText={ oppositeLawyerId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          datagridContainer={ DatagridOppositeLawyerContainer }
          labelKey="name"
          valueKey="id"
        />
        <DatagridInput
          name="actobjectId"
          label="Objeto da ação"
          visible={ get(configurations, 'actobjectId.show', false) }
          helperText="Selecione um objeto da ação para o processo"
          value={ actobjectId.value }
          isValid={ actobjectId.isValid }
          showError={ actobjectId.showError }
          rules={ actobjectId.rules }
          errorText={ actobjectId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          datagridContainer={ DatagridActobjectsContainer }
          labelKey="name"
          valueKey="id"
        />
        <DatagridInput
          name="acttypeId"
          label="Tipo de ação"
          visible={ get(configurations, 'acttypeId.show', false) }
          helperText="Selecione um tipo de ação para o processo"
          value={ acttypeId.value }
          isValid={ acttypeId.isValid }
          showError={ acttypeId.showError }
          rules={ acttypeId.rules }
          errorText={ acttypeId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          datagridContainer={ DatagridActtypesContainer }
          labelKey="name"
          valueKey="id"
        />
        <DatagridInput
          name="judgementId"
          label="Juízo"
          visible={ get(configurations, 'judgementId.show', false) }
          helperText="Selecione juízo para o processo"
          value={ judgementId.value }
          isValid={ judgementId.isValid }
          showError={ judgementId.showError }
          rules={ judgementId.rules }
          errorText={ judgementId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          datagridContainer={ DatagridJudgementsContainer }
          labelKey="name"
          valueKey="id"
        />
        <DatagridInput
          name="distribuitionId"
          label="Distribuição"
          visible={ showDistribuition }
          helperText="Selecione uma distribuição para o processo"
          value={ distribuitionId.value }
          isValid={ distribuitionId.isValid }
          showError={ distribuitionId.showError }
          rules={ distribuitionId.rules }
          errorText={ distribuitionId.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
          datagridContainer={ DatagridDistribuitionsContainer }
          labelKey="name"
          valueKey="id"
        />
        <DatePickerInput
          name="entry"
          label="Data de autuação"
          visible={ get(configurations, 'entry.show', false) }
          helperText="Informe uma data de autuação para o processo"
          value={ entry.value }
          isValid={ entry.isValid }
          showError={ entry.showError }
          rules={ entry.rules }
          errorText={ entry.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
      </Fragment>
    )
  }
}

FormLinkProcessContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  expedientNotesLinkProcessStore: MobxPropTypes.objectOrObservableObject
}

FormLinkProcessContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ expedientNotesLinkProcessStore })
)(FormLinkProcessContainer)
