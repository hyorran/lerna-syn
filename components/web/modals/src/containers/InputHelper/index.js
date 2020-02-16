import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Modal from '../Modal'
import omitBy from 'lodash/omitBy'
import HeaderTitleClose from '../../components/HeaderTitleClose'

import styles from './styles'

function InputHelper(props) {
  const {
    helperContent: HelperContent,
    helperContentProps: {
      size,
      title
    }
  } = props

  return (
    <Modal
      { ...omitBy(props, (_, key) => key === 'classes') }
      dialogProps={ {
        fullWidth: true,
        maxWidth: size
      } }
      modalLoading={ false }
      HeaderComponent={
        headerProps => (
          <HeaderTitleClose
            { ...headerProps }
            title={ title || 'Ajuda' }
          />
        )
      }
      contentComponent={
        () => (
          <HelperContent />
        )
      }

    />
  )
}

InputHelper.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  dialogId: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
  helperContent: PropTypes.func,
  helperContentProps: PropTypes.object,
  title: PropTypes.string,
  size: PropTypes.oneOf([
    'xs',
    'sm',
    'md',
    'lg',
    'xl'
  ])
}
InputHelper.defaultProps = {
  helperContent: () => null,
  title: '',
  size: 'md',
  helperContentProps: {}
}

export default withStyles(styles)(InputHelper)
