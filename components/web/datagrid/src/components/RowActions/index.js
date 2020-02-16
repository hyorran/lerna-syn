import React, { Component, Fragment, createElement } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import isFunction from 'lodash/isFunction'
import isEmpty from 'lodash/isEmpty'
import uuid from 'uuid/v1'
import * as IconButton from '@syntesis/c-buttons/src/components/IconButton'
import { createDynamicModal } from '@syntesis/c-dialog-portal/src/utils'

class RowActions extends Component {
  render() {
    const {
      actions,
      item
    } = this.props

    const buttons = flow(
      filter(action => action.condition && action.condition(item)),
      map((action) => {
        const {
          type,
          modalComponent,
          disabled,
          tooltip,
          onClick = () => {}
        } = action

        /*
        * adiciona a prop `item` que é esperada por modais de ação de linha
        * */
        let { modalProps = {} } = action
        modalProps = {
          ...modalProps,
          item
        }

        let icon = type

        switch (type) {
          case 'update':
            icon = 'Edit'
            break

          case 'duplicate':
            icon = 'Duplicate'
            break

          case 'generate':
            icon = 'Add'
            break

          case 'file-restore':
            icon = 'FileRestore'
            break

          case 'file-disable':
            icon = 'FileDisable'
            break

          case 'file-download':
            icon = 'FileDownload'
            break

          case 'file-upload':
            icon = 'FileUpload'
            break

          case 'file-move':
            icon = 'FileMove'
            break

          case 'file-transmit':
            icon = 'FileTransmit'
            break

          case 'view':
            icon = 'View'
            break

          case 'review':
            icon = 'Review'
            break

          case 'activity':
            icon = 'Assignment'
            break

          case 'list':
            icon = 'List'
            break

          case 'list-receipt':
            icon = 'ListReceipt'
            break

          case 'cash':
            icon = 'Cash'
            break

          case 'cash-receipt':
            icon = 'CashReceipt'
            break

          case 'archive':
            icon = 'Archive'
            break

          case 'forward':
            icon = 'SwapHoriz'
            break

          case 'receipt':
            icon = 'Receipt'
            break

          case 'cancel':
            icon = 'Cancel'
            break

          case 'cash-register':
            icon = 'CashRegister'
            break

          case 'update-status':
            icon = 'UpdateStatus'
            break

          case 'reopen-competence':
            icon = 'Reopen'
            break

          case 'delete':
            if (isFunction(disabled) ? disabled(item) : disabled) {
              icon = 'DefaultRegister'
            } else {
              icon = 'Delete'
            }
            break

          default: // Caso haja necessidade de inserir ações personalizadas
            break
        }

        let customProps = {}
        if (disabled) {
          customProps = {
            ...customProps,
            disabled: isFunction(disabled) ? disabled(item) : disabled
          }
        }
        if (tooltip) {
          let customTooltip
          if (isFunction(tooltip)) {
            customTooltip = tooltip(item)
          } else if (!isEmpty(tooltip)) {
            customTooltip = tooltip
          }

          if (!isEmpty(customTooltip)) {
            customProps = {
              ...customProps,
              tooltip: customTooltip
            }
          }
        }

        return createElement(IconButton[icon], {
          onClick: () => {
            if (modalComponent) {
              createDynamicModal({ modalComponent, modalProps, onClick })
            } else {
              onClick(item)
            }
          },
          onTable: true,
          key: uuid(),
          disableRipple: true,
          debounceReverse: true,
          ...customProps
        })
      })
    )(actions)

    return (
      <Fragment>
        { buttons }
      </Fragment>
    )
  }
}

RowActions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
  item: PropTypes.object
}

RowActions.defaultProps = {
  actions: [],
  item: {}
}

export default RowActions
