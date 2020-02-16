import React from 'react'
import PropTypes from 'prop-types'
import omitBy from 'lodash/omitBy'
import Modal from '../Modal'
import HeaderTitleClose from '../../components/HeaderTitleClose'
import FooterButtons from '../../components/FooterButtons'

const Confirm = (props) => {
  const {
    withButtonConfirm,
    buttonConfirm,
    withButtonCancel,
    disableTypography,
    titleClass,
    buttonCancel,
    dialogActionsProps
  } = props

  const footerButtons = []

  if (withButtonConfirm) {
    footerButtons.push({
      ...buttonConfirm,
      btnProps: {
        color: 'primary',
        variant: 'contained',
        ...buttonConfirm.btnProps
      }
    })
  }

  return (
    <Modal
      { ...omitBy(props, (_, key) => key === 'classes') }
      HeaderComponent={
        headerProps => (
          <HeaderTitleClose
            disableTypography={ disableTypography }
            titleClass={ titleClass }
            { ...headerProps }
          />
        )
      }
      FooterComponent={
        footerProps => (
          <FooterButtons
            { ...footerProps }
            dialogActionsProps={ dialogActionsProps }
            buttons={ footerButtons }
            withButtonCancel={ withButtonCancel }
            buttonCancel={ buttonCancel }
          />
        )
      }
    />
  )
}

Confirm.propTypes = {
  withButtonCancel: PropTypes.bool,
  buttonCancel: PropTypes.object,
  withButtonConfirm: PropTypes.bool,
  modalLoading: PropTypes.bool,
  disableTypography: PropTypes.bool,
  titleClass: PropTypes.string,
  dialogActionsProps: PropTypes.object,
  buttonConfirm: PropTypes.shape({
    children: PropTypes.string,
    onClick: PropTypes.func,
    btnProps: PropTypes.object
  })
}

Confirm.defaultProps = {
  withButtonCancel: true,
  buttonCancel: undefined,
  withButtonConfirm: true,
  modalLoading: false,
  disableTypography: false,
  titleClass: null,
  dialogActionsProps: {},
  buttonConfirm: {
    children: 'confirmar',
    onClick: () => {},
    btnProps: {}
  }
}

export default Confirm
