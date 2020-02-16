import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import Confirm from '../Confirm'

const DeleteItem = (props) => {
  const {
    name,
    item,
    modalLoading
  } = props

  let { buttonConfirm } = props

  const getName = () => {
    if (isFunction(name)) {
      return `"${ name(item) }"`
    } else if (!isEmpty(name)) {
      return `"${ name }"`
    }
    return 'o item'
  }

  const theItem = getName()

  buttonConfirm = {
    children: 'excluir',
    onClick: () => {},
    disabled: modalLoading,
    ...buttonConfirm
  }

  return (
    <Confirm
      escape={ !modalLoading }
      title={ `Excluir ${ theItem }?` }
      contentText={
        `Você realmente deseja excluir ${ theItem }?
        Essa ação não poderá ser revertida.`
      }
      { ...props }
      buttonConfirm={ buttonConfirm }
    />
  )
}

DeleteItem.propTypes = {
  modalLoading: PropTypes.bool.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  item: PropTypes.object,
  buttonConfirm: PropTypes.object
}

DeleteItem.defaultProps = {
  name: '',
  item: {},
  buttonConfirm: {}
}

export default DeleteItem
