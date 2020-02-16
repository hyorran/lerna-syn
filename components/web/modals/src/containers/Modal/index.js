import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import LinearLoader from '@syntesis/c-loaders/src/components/Linear'
import { closeDynamicModal } from '@syntesis/c-dialog-portal/src/utils'

import styles from './styles'
import isFunction from 'lodash/isFunction'

class Modal extends Component {
  constructor(props) {
    super(props)

    this.getTitle = this.getTitle.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  getTitle() {
    const {
      item,
      title
    } = this.props

    if (isFunction(title)) {
      return title(item)
    }
    return title
  }

  handleClose() {
    const {
      dialogId,
      autoClose,
      onCancel
    } = this.props

    closeDynamicModal({ autoClose, dialogId, onCancel })
  }

  render() {
    const {
      classes,
      contentText,
      contentComponentMounted: ContentComponentMounted,
      contentComponent: ContentComponent,
      contentComponentProps,
      open,
      escape,
      item,
      dialogId,
      fullScreen,
      modalLoading,
      HeaderComponent,
      FooterComponent,
      dialogProps,
      dialogContentProps,
      position
    } = this.props

    const componentsProps = {
      handleClose: this.handleClose,
      title: this.getTitle(),
      item,
      escape
    }

    let dialogPosition = null
    if (position === 'top') {
      dialogPosition = classes.dialogTop
    }

    return (
      <Dialog
        fullScreen={ fullScreen }
        open={ open }
        onClose={ this.handleClose }
        disableEscapeKeyDown={ !escape }
        disableBackdropClick={ !escape }
        style={ {
          overflowY: 'hidden'
        } }
        { ...dialogProps }
        classes={ {
          ...get(dialogProps, 'classes', {}),
          scrollPaper: [
            get(dialogProps, 'classes.scrollPaper'),
            dialogPosition
          ].join(' ')
        } }
      >
        <HeaderComponent { ...componentsProps } />

        <DialogContent { ...dialogContentProps }>
          <div className={ classes.contentText }>
            { contentText }
          </div>
          { ContentComponentMounted }
          <ContentComponent
            dialogId={ dialogId }
            item={ item }
            { ...contentComponentProps }
          />
        </DialogContent>

        <FooterComponent { ...componentsProps } />

        <LinearLoader visible={ modalLoading } />
      </Dialog>
    )
  }
}

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  dialogId: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  FooterComponent: PropTypes.func,
  HeaderComponent: PropTypes.func,
  contentText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  contentComponentMounted: PropTypes.element,
  contentComponent: PropTypes.func,
  contentComponentProps: PropTypes.object,
  dialogProps: PropTypes.object,
  dialogContentProps: PropTypes.object,
  escape: PropTypes.bool,
  fullScreen: PropTypes.bool,
  autoClose: PropTypes.bool,
  modalLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  item: PropTypes.object,
  position: PropTypes.oneOf(['middle', 'top'])
}

Modal.defaultProps = {
  title: '',
  HeaderComponent: () => null,
  FooterComponent: () => null,
  contentText: null,
  contentComponentMounted: null,
  contentComponent: () => null,
  dialogProps: {},
  dialogContentProps: {},
  contentComponentProps: {},
  escape: true,
  fullScreen: false,
  autoClose: true,
  modalLoading: true,
  onCancel: () => {},
  item: {},
  position: 'middle'
}

export default withStyles(styles)(Modal)
