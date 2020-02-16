import React from 'react'
import PropTypes from 'prop-types'
import omitBy from 'lodash/omitBy'
import Modal from '../Modal'
import HeaderToolbar from '../../components/HeaderToolbar'
import FooterButtons from '../../components/FooterButtons'

const WithToolbar = (props) => {
  const {
    buttonConfirm,
    buttonCancel,
    withButtonConfirm
  } = props

  const footerButtons = [{
    children: 'confirmar',
    ...buttonConfirm,
    btnProps: {
      color: 'primary',
      variant: 'contained',
      ...buttonConfirm.btnProps
    }
  }]

  return (
    <Modal
      { ...omitBy(props, (_, key) => key === 'classes') }
      HeaderComponent={
        headerProps => (
          <HeaderToolbar
            { ...headerProps }
          />
        )
      }
      FooterComponent={
        footerProps => (
          <FooterButtons
            { ...footerProps }
            withButtonCancel
            withButtonConfirm={ withButtonConfirm }
            buttons={ footerButtons }
            buttonCancel={ buttonCancel }
            dialogActionsProps={ { classes: { root: '' } } }
          />
        )
      }
    />
  )
}

WithToolbar.propTypes = {
  dialogId: PropTypes.string.isRequired,
  item: PropTypes.object,
  buttonConfirm: PropTypes.object,
  buttonCancel: PropTypes.object,
  withButtonConfirm: PropTypes.bool
}

WithToolbar.defaultProps = {
  item: {},
  buttonConfirm: {
    onClick: () => {},
    btnProps: {}
  },
  buttonCancel: {
    children: 'cancelar'
  },
  withButtonConfirm: true
}

export default WithToolbar
