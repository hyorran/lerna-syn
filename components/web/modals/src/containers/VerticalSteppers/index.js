import React, { Component } from 'react'
import PropTypes from 'prop-types'
import omitBy from 'lodash/omitBy'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import { withStyles } from '@material-ui/core/styles'
import HeaderToolbar from '../../components/HeaderToolbar'
import FooterButtons from '../../components/FooterButtons'
import VerticalSteppersContainer from '@syntesis/c-tabs/src/containers/VerticalSteppersContainer'
import Modal from '../Modal'

import styles from './styles'

class VerticalSteppers extends Component {
  render() {
    const {
      classes,
      modalLoading,
      HeaderComponent,
      item,
      steppers,
      dialogProps,
      stepperProps,
      activeStepperIndex,
      title,
    } = this.props

    const customProps = get(steppers, `[${ activeStepperIndex }].customProps`, {})

    const {
      buttonConfirm = {},
      buttonCancel = {},
      withButtonConfirm = true,
      withButtonCancel = true,
      ...otherCustomProps
    } = customProps

    const customButtonConfirm = {
      children: 'salvar e continuar',
      onClick: get(steppers, `[${ activeStepperIndex }].onSuccess`, () => {}),
      ...buttonConfirm,
      disabled: (
        get(buttonConfirm, 'disabled')
        || modalLoading
      ),
    }

    const customButtonCancel = {
      children: 'cancelar',
      ...buttonCancel,
      disabled: (
        get(buttonCancel, 'disabled')
        || modalLoading
      )
    }

    const footerButtons = [{
      children: 'confirmar',
      ...customButtonConfirm,
      btnProps: {
        color: 'primary',
        variant: 'contained',
        ...customButtonConfirm.btnProps
      }
    }]

    const activeStepper = get(steppers, `[${ activeStepperIndex }]`, {})
    const newTitle = `${ isFunction(title) ? title(item) : title } - ${ activeStepper.title }`

    // console.warn('verticalSteppers')
    // console.warn('steppers', steppers)
    // console.warn('activeStepperIndex', activeStepperIndex)
    // console.warn('activeStepper', activeStepper)

    return (
      <Modal
        position="top"
        dialogProps={ {
          fullWidth: true,
          // maxWidth: 'md',
          ...dialogProps,
          classes: {
            ...get(dialogProps, 'classes', {}),
            paper: [
              classes.paper,
              get(dialogProps, 'classes.paper', null),
            ].join(' ')
          },
        } }
        dialogContentProps={ {
          classes: {
            root: classes.dialogContent
          }
        } }
        HeaderComponent={ HeaderComponent }
        contentComponentMounted={ (
          <VerticalSteppersContainer
            steppers={ steppers }
            hide={ false }
            activeStepperIndex={ activeStepperIndex }
            { ...stepperProps }
          />
        ) }
        FooterComponent={
          footerProps => (
            <FooterButtons
              { ...footerProps }
              withButtonCancel={ withButtonCancel }
              withButtonConfirm={ withButtonConfirm }
              buttons={ footerButtons }
              buttonCancel={ customButtonCancel }
              dialogActionsProps={ { classes: { root: '' } } }
            />
          )
        }
        { ...omitBy(this.props, (_, key) => (
          key === 'classes' ||
          key === 'dialogProps'))
        }
        title={ newTitle }
        { ...otherCustomProps }
      />
    )

  }
}

VerticalSteppers.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  dialogId: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
  steppers: PropTypes.arrayOf(PropTypes.object),
  item: PropTypes.object,
  activeStepperIndex: PropTypes.number,
  HeaderComponent: PropTypes.func,
  modalLoading: PropTypes.bool,
  dialogProps: PropTypes.object,
  stepperProps: PropTypes.object,
  minHeight: PropTypes.number
}

VerticalSteppers.defaultProps = {
  steppers: [],
  item: {},
  HeaderComponent: HeaderToolbar,
  activeStepperIndex: null,
  modalLoading: false,
  dialogProps: {},
  stepperProps: {},
  minHeight: 200
}

export default withStyles(styles)(VerticalSteppers)
