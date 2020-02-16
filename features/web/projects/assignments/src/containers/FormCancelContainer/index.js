import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import toString from 'lodash/toString'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import AutocompleteInput from '@syntesis/c-inputs/src/components/AutocompleteInput'
import Typography from '@material-ui/core/Typography'
import { withStores } from '@syntesis/c-stores-provider'
import { getSolicitationRoutingMotivesForSelect } from '@syntesis/s-solicitation-routing-motives'
import assignmentsCancelStore from '../../stores/formAssignmentsCancelStore'

import styles from './styles'

@inject('assignmentsCancelStore')
@observer
class FormCancelContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)
    this.getMotivesForSelect = this.getMotivesForSelect.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id
      },
      listMotives: [],
      loadingMotives: true
    }
  }

  componentDidMount() {
    this.getMotivesForSelect()
  }

  onFormChange(controlName, control) {
    this.props.assignmentsCancelStore.changeFormControl(controlName, control)
  }

  async getMotivesForSelect() {
    try {
      const origin = 5
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
      item,
      onSuccess,
      dialogId,
      assignmentsCancelStore: store
    } = this.props

    const {
      getFormControls,
      getFormStatus
    } = store

    const { solicitationRoutingMotivesId } = getFormControls

    const { mode } = this.state
    const disabled = getFormStatus.loading

    return (
      <div>
        {
          <Form
            mode={ mode }
            store={ store }
            onSuccess={ () => onSuccess(dialogId) }
            controls={ { ...getFormControls } }
            item={ item }
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              Para cancelar esta atividade é necessário informar um motivo.
            </Typography>
            <AutocompleteInput
              name="solicitationRoutingMotivesId"
              label="Motivo"
              helperText="Selecione um motivo para cancelar a atividade"
              options={ this.state.listMotives }
              value={ solicitationRoutingMotivesId.value }
              isValid={ solicitationRoutingMotivesId.isValid }
              showError={ solicitationRoutingMotivesId.showError }
              checked={ solicitationRoutingMotivesId.value }
              errorText={ solicitationRoutingMotivesId.errorText }
              onChange={ this.onFormChange }
              rules={ solicitationRoutingMotivesId.rules }
              loading={ this.state.loadingMotives }
              disabled={ disabled }
            />
          </Form>
        }
      </div>
    )
  }
}

FormCancelContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  assignmentsCancelStore: MobxPropTypes.objectOrObservableObject
}

FormCancelContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ assignmentsCancelStore })
)(FormCancelContainer)
