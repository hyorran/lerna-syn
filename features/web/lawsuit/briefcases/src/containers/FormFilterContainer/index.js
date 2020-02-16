import React, { Component } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import toString from 'lodash/toString'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import TextInput from '@syntesis/c-inputs/src/components/TextInput'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import Checkbox from '@syntesis/c-inputs/src/components/Checkbox'
import { withStores } from '@syntesis/c-stores-provider'
import { getBriefcasesTypeForSelect } from '@syntesis/s-selects-enum'
import briefcasesFilterStore from '../../stores/formBriefcasesFilterStore'

import styles from './styles'

@inject('briefcasesFilterStore')
@observer
class FormFilterContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.getBriefcasesType = this.getBriefcasesType.bind(this)

    this.state = {
      listBriefcasesType: [],
      loadingBriefcasesType: true
    }
  }

  componentDidMount() {
    this.getBriefcasesType()
  }

  onFormChange(controlName, control) {
    this.props.briefcasesFilterStore.changeFormControl(controlName, control)
  }

  async getBriefcasesType() {
    try {
      const body = await getBriefcasesTypeForSelect()

      this.setState(prevState => ({
        ...prevState,
        listBriefcasesType: map(body.response, ({ value, label }) => ({
          value: toString(value),
          label
        })),
        loadingBriefcasesType: false
      }))
    } catch (e) {
      throw e
    }
  }

  render() {
    const {
      briefcasesFilterStore: store,
    } = this.props

    const {
      getFormControls,
      getFormStatus,
    } = store

    const {
      active,
      code,
      name,
      type
    } = getFormControls

    const {
      listBriefcasesType,
      loadingBriefcasesType
    } = this.state

    const disabled = getFormStatus.loading

    return (
      <div>
        <Checkbox
          inline
          isValid
          indeterminateRule
          name="active"
          label="Ativo"
          value={ active.value }
          checked={ active.checked }
          errorText={ active.errorText }
          onChange={ this.onFormChange }
          rules={ active.rules }
          disabled={ disabled }
        />
        <TextInput
          autoFocus
          name="code"
          label={ code.label }
          helperText="Informe um código para a pesquisa"
          value={ code.value }
          isValid={ code.isValid }
          showError={ code.showError }
          rules={ code.rules }
          errorText={ code.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <TextInput
          name="name"
          label={ name.label }
          helperText="Informe uma descrição para a pesquisa"
          value={ name.value.toString() }
          isValid={ name.isValid }
          showError={ name.showError }
          rules={ name.rules }
          errorText={ name.errorText }
          onChange={ this.onFormChange }
          disabled={ disabled }
        />
        <AutocompleteInput
          name="type"
          label={ type.label }
          helperText="Informe um tipo para a pesquisa"
          options={ listBriefcasesType }
          value={ type.value }
          isValid={ type.isValid }
          showError={ type.showError }
          checked={ type.value }
          rules={ type.rules }
          errorText={ type.errorText }
          onChange={ this.onFormChange }
          loading={ loadingBriefcasesType }
          disabled={ disabled }
        />
      </div>
    )
  }
}

FormFilterContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogId: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  briefcasesFilterStore: MobxPropTypes.objectOrObservableObject
}

FormFilterContainer.defaultProps = {
  dialogId: undefined
}

export default flow(
  withStyles(styles),
  withStores({ briefcasesFilterStore })
)(FormFilterContainer)
