import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import omitBy from 'lodash/omitBy'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import camelCase from 'lodash/camelCase'
import lowerCase from 'lodash/lowerCase'
import toString from 'lodash/toString'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import find from 'lodash/find'
import moment from 'moment/moment'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ArrowRightIcon from '@syntesis/c-icons/src/ArrowRightIcon'
import InfoTable, { store } from '@syntesis/c-info-table'
import RestoreIconButton from '@syntesis/c-buttons/src/components/IconButton/RestoreIconButton'
import stringifyValue from '@syntesis/c-functions/src/stringifyValue'
import HeaderTitleClose from '../../components/HeaderTitleClose'
import Modal from '../Modal'
import RestoreItem from '../RestoreItem'

import styles from './styles'

class HistoryItem extends Component {
  constructor(props) {
    super(props)

    this.onConfirm = this.onConfirm.bind(this)
    this.mountResponse = this.mountResponse.bind(this)
    this.startStructData = this.startStructData.bind(this)
    this.structData = this.structData.bind(this)
    this.getControls = this.getControls.bind(this)

    this.state = {
      modalLoading: false,
      actions: [
        {
          buttonComponent: RestoreIconButton,
          buttonProps: {
            tooltip: 'Restaurar campos selecionados'
          },
          onClick: this.onConfirm
        }
      ],
      columns: [
        { value: 'Campo' },
        { value: 'De' },
        {
          value: null,
          props: {
            padding: 'none'
          }
        },
        { value: 'Para' }
      ]
    }
  }

  componentDidMount() {
    this.startStructData()
  }

  onConfirm(response) {
    const confirmationDialogId = window.openDialog({
      component: RestoreItem,
      componentProps: {
        fields: { ...response.infos },
        buttonConfirm: {
          onClick: () => {
            // fecha modal de confirmacao
            window.closeDialog(confirmationDialogId)

            // cria callback para chamada da api
            const cb = {
              success: () => {
                window.closeDialog(this.props.dialogId)
                store.reset()
              },
              failed: () => {
                this.setState(prevState => ({
                  ...prevState,
                  modalLoading: false
                }))
              }
            }

            this.setState(prevState => ({
              ...prevState,
              modalLoading: true
            }), () => {
              this.props.onConfirm(response.values, cb)
            })
          }
        }
      }
    })
  }

  async getControls(parameterName) {
    const { getControls } = this.props
    const func = get(getControls, camelCase(parameterName))
    if (func) {
      return func()
    }
    return null
  }

  async startStructData() {
    const { item } = this.props
    const response = await this.structData(get(item, 'items'))

    let data = []

    forEach(response, (column) => {
      if (isArray(column)) {
        data = [
          ...data,
          ...column
        ]
      } else {
        data = [
          ...data,
          column
        ]
      }
    })

    this.setState(prevState => ({
      ...prevState,
      data
    }))
  }

  mountResponse({
    columnName,
    friendlyColumnName,
    friendlyNewValue = '',
    friendlyOldValue = '',
    oldValue,
    newValue
  }) {
    const { classes } = this.props

    return ({
      ref: columnName,
      columns: [
        {
          ref: 'friendlyColumnName',
          value: friendlyColumnName,
          props: {
            component: 'th',
            scope: 'row'
          }
        },
        {
          ref: 'oldValue',
          value: stringifyValue(oldValue),
          friendlyValue: friendlyOldValue,
          original: oldValue,
          props: {
            className: classes.oldValue,
            padding: 'dense'
          }
        },
        {
          value: <ArrowRightIcon />,
          props: {
            padding: 'dense'
          }
        },
        {
          ref: 'newValue',
          value: stringifyValue(newValue),
          original: newValue,
          friendlyValue: friendlyNewValue,
          props: {
            padding: 'dense'
          }
        }
      ]
    })
  }

  async structData(items) {
    const promises = map(
      items,
      row => new Promise((resolve) => {
        const {
          columnName,
          friendlyColumnName,
          friendlyNewValue,
          friendlyOldValue,
          newValue,
          oldValue
        } = row

        try {
          const value = JSON.parse(newValue)
          let oldVal = oldValue
          try {
            oldVal = JSON.parse(oldValue)
          } catch (e) {
            // console.error('deu ruim', e)
          }

          if (isArray(value) || isArray(oldVal)) {
            resolve(this.mountResponse({
              ...row,
              newValue: value,
              oldValue: oldVal,
              friendlyNewValue: friendlyNewValue.split(', ').join(',\n'),
              friendlyOldValue: friendlyOldValue.split(', ').join(',\n')
            }))
          } else if (isObject(value)) {

            this.getControls(columnName).then(({ response: parameters }) => {
              let rows = []
              forEach(value, (controlValue, controlName) => {
                const oldControlValue = get(oldVal, controlName)
                if (oldControlValue !== controlValue) {

                  const actualParameterControl = find(
                    parameters,
                    control => control.name === controlName
                  )
                  const actualControlName = get(actualParameterControl, 'label')
                  const actualControlOptions = get(actualParameterControl, 'options')

                  const actualControlfriendlyNewValue = get(
                    find(
                      actualControlOptions,
                      option => toString(option.value) === toString(controlValue)
                    ),
                    'label'
                  )

                  const actualControlfriendlyOldValue = get(
                    find(
                      actualControlOptions,
                      option => toString(option.value) === toString(oldControlValue)
                    ),
                    'label'
                  )

                  rows = [
                    ...rows,
                    this.mountResponse({
                      friendlyColumnName: `${ friendlyColumnName }: ${ actualControlName }`,
                      columnName: `${ lowerCase(columnName).split(' ').join('_') }.${ lowerCase(controlName).split(' ').join('_') }`,
                      newValue: controlValue,
                      oldValue: oldControlValue,
                      friendlyNewValue: actualControlfriendlyNewValue,
                      friendlyOldValue: actualControlfriendlyOldValue
                    })
                  ]
                }
              })

              resolve(rows)
            })
          } else {
            resolve(this.mountResponse(row))
          }
        } catch (e) {
          resolve(this.mountResponse(row))
        }
      })
    )

    return Promise.all(promises)
  }

  render() {
    const {
      item,
      operation,
      name
    } = this.props

    const {
      actions,
      columns,
      modalLoading,
      data
    } = this.state

    const modalTitle = `${ isFunction(name) ? name() : name } - ${ operation }`

    return (
      <Modal
        { ...omitBy(this.props, (_, key) => key === 'classes') }
        dialogProps={ {
          fullWidth: true,
          maxWidth: 'md'
        } }
        escape={ !modalLoading }
        onCancel={ store.reset }
        modalLoading={ modalLoading }
        HeaderComponent={
          headerProps => (
            <HeaderTitleClose
              { ...headerProps }
              title={ modalTitle }
            />
          )
        }
        contentComponent={
          () => (
            <Fragment>
              <List>
                <ListItem>
                  <ListItemText
                    primary={ moment(get(item, 'dateLog')).format('L LTS') }
                    secondary="Data/Hora"
                  />
                  <ListItemText
                    primary={ get(item, 'personName') }
                    secondary="Responsável"
                  />
                </ListItem>
              </List>

              <InfoTable
                columns={ columns }
                data={ data }
                withActions
                actions={ actions }
                disabled={ modalLoading }
              />
            </Fragment>
          )
        }
      />
    )
  }
}

HistoryItem.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  dialogId: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
  item: PropTypes.object,
  operation: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  getControls: PropTypes.object
}

HistoryItem.defaultProps = {
  item: {},
  getControls: () => {}
}

export default withStyles(styles)(HistoryItem)
