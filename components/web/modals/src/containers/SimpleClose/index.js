import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import HeaderTitleClose from '../../components/HeaderTitleClose'
import Modal from '../Modal'

import styles from './styles'

const SimpleClose = props => (
  <Modal
    HeaderComponent={
      headerProps => (
        <HeaderTitleClose
          { ...headerProps }
        />
      )
    }
    { ...props }
  />
)

SimpleClose.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  dialogId: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
}

SimpleClose.defaultProps = {
  contentComponent: () => null
}

export default withStyles(styles)(SimpleClose)
