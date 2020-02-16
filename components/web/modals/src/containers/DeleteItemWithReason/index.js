import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import Confirm from '../Confirm'
import reasonStore from './store'
import Form from './FormDelete'

@inject('reasonStore')
@observer
class DeleteItemWithReason extends Component {
  constructor(props) {
    super(props)
    this.onCancel = this.onCancel.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.getName = this.getName.bind(this)

    const {
      buttonConfirm
    } = props

    this.state = {
      buttonConfirm: {
        children: 'excluir',
        ...buttonConfirm,
        onClick: this.onConfirm
      }
    }
  }

  onConfirm() {
    const {
      dialogId,
      buttonConfirm: {
        onClick
      },
      reasonStore: {
        resetForm,
        validateForm
      }
    } = this.props

    const {
      controlsAfterValidation,
      hasInvalidControls
    } = validateForm()

    if (!hasInvalidControls) {
      const reason = get(controlsAfterValidation, 'reason.value')
      onClick({ reason })
      window.closeDialog(dialogId)
      resetForm()
    }
  }

  onCancel() {
    const {
      reasonStore: {
        resetForm
      }
    } = this.props

    resetForm()
  }

  getName() {
    const {
      name,
      item
    } = this.props

    if (isFunction(name)) {
      return `"${ name(item) }"`
    } else if (!isEmpty(name)) {
      return `"${ name }"`
    }
    return 'o item'
  }

  render() {
    const {
      reasonStore: {
        changed
      }
    } = this.props
    const { buttonConfirm } = this.state

    const theItem = this.getName()

    return (
      <Confirm
        title={ `Excluir ${ theItem }?` }
        contentText={
          `Para excluir ${ theItem } é necessário informar um motivo.`
        }
        contentComponent={ Form }
        { ...this.props }
        buttonConfirm={ {
          ...buttonConfirm,
          disabled: !changed
        } }
        onCancel={ this.onCancel }
      />
    )
  }
}

DeleteItemWithReason.propTypes = {
  dialogId: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  item: PropTypes.object,
  buttonConfirm: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  reasonStore: MobxPropTypes.objectOrObservableObject
}

DeleteItemWithReason.defaultProps = {
  name: '',
  item: {},
  buttonConfirm: {}
}

export default withStores({ reasonStore })(DeleteItemWithReason)
