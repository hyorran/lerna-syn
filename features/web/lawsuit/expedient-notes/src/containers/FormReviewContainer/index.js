import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Form from '@syntesis/c-inputs/src/components/Form'
import HiddenInput from '@syntesis/c-inputs/src/components/HiddenInput'
import InfoIcon from '@syntesis/c-icons/src/InfoIcon'
import Typography from '@material-ui/core/Typography';
import { withStores } from '@syntesis/c-stores-provider'
import expedientNotesReviewStore from '../../stores/formExpedientNotesReviewStore'

import styles from './styles'

@inject('expedientNotesReviewStore')
@observer
class FormReviewContainer extends Component {
  constructor(props) {
    super(props)

    this.onFormChange = this.onFormChange.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id
      }
    }
  }

  componentDidMount() {
    const {
      item,
      expedientNotesReviewStore: {
        getFormControls: {
          lawsuitExpedientNotesId
        }
      }
    } = this.props

    this.onFormChange('lawsuitExpedientNotesId', {
      ...lawsuitExpedientNotesId,
      value: get(item, 'id')
    })
  }

  onFormChange(controlName, control) {
    this.props.expedientNotesReviewStore.changeFormControl(controlName, control)
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      expedientNotesReviewStore: store,
    } = this.props

    const { getFormControls } = store

    const {
      lawsuitExpedientNotesId,
    } = getFormControls

    const { mode } = this.state

    return (
      <div>
        <Form
          mode={ mode }
          store={ store }
          onSuccess={ () => onSuccess(dialogId) }
          controls={ { ...getFormControls } }
          item={ item }
        >
          <HiddenInput
            name="lawsuitExpedientNotesId"
            value={ lawsuitExpedientNotesId.value }
          />
          <Typography
            align="center"
            variant="subtitle1"
            className={ classes.typography }
          >
            <InfoIcon className={ classes.infoIcon } />
            Ao revisar a Nota de Expediente, ela sairá da lista de pendentes.
            Isso significa que todas as atividades já foram criadas.
          </Typography>
        </Form>
      </div>
    )
  }
}

FormReviewContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  expedientNotesReviewStore: MobxPropTypes.objectOrObservableObject
}

FormReviewContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ expedientNotesReviewStore })
)(FormReviewContainer)
