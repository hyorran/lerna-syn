import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Confirm from '../Confirm'

const RestoreItem = (props) => {
  const {
    fields
  } = props

  let { buttonConfirm } = props

  buttonConfirm = {
    children: 'restaurar',
    onClick: () => {},
    ...buttonConfirm
  }

  return (
    <Confirm
      title="Você tem certeza que deseja restaurar esse item?"
      contentText={ (
        <Fragment>
          <p>
            A restauração criará um novo registro no histórico desse item,
            como se fosse uma edição.
          </p>
          <p>
            Nenhum dado será perdido.
            Revise as informações antes de restaurar, ou cancele a operação.
          </p>
        </Fragment>
      ) }
      contentComponent={
        () => (
          <List>
            {
              map(fields, ({ name, value, friendlyValue }, index) => (
                <Fragment key={ index }>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary={ name }
                      secondary={ !isEmpty(friendlyValue) ? friendlyValue : value }
                    />
                  </ListItem>
                </Fragment>
              ))
            }
          </List>
        )
      }
      { ...props }
      buttonConfirm={ buttonConfirm }
    />
  )
}

RestoreItem.propTypes = {
  fields: PropTypes.object,
  item: PropTypes.object,
  buttonConfirm: PropTypes.object
}

RestoreItem.defaultProps = {
  fields: {},
  item: {},
  buttonConfirm: {}
}

export default RestoreItem
