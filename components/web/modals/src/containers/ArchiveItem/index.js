import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import Confirm from '../Confirm'

const ArchiveItem = (props) => {
  const {
    name,
    item
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
    children: 'arquivar',
    onClick: () => {},
    ...buttonConfirm
  }

  return (
    <Confirm
      title={ `Arquivar ${ theItem }?` }
      contentText={
        `Você realmente deseja arquivar ${ theItem }?
        Essa ação não poderá ser revertida.`
      }
      { ...props }
      buttonConfirm={ buttonConfirm }
    />
  )
}

ArchiveItem.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  item: PropTypes.object,
  buttonConfirm: PropTypes.object
}

ArchiveItem.defaultProps = {
  name: '',
  item: {},
  buttonConfirm: {}
}

export default ArchiveItem
