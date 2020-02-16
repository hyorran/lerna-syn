import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import toString from 'lodash/toString'
import find from 'lodash/find'
import map from 'lodash/map'
import first from 'lodash/first'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from './input'
import Modal from './modal'

import styles from './styles'
import applyRulesAndValidate from '../../rules'

class DatagridInput extends Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.onSelectClickRow = this.onSelectClickRow.bind(this)
    this.onUnselectClickRow = this.onUnselectClickRow.bind(this)
    this.setFormStore = this.setFormStore.bind(this)
    this.clearInput = this.clearInput.bind(this)

    this.state = {
      items: []
    }
  }

  onSelectClickRow(original) {
    const {
      labelKey,
      valueKey,
      multiActiveRows
    } = this.props

    this.setState(prevState => ({
      ...prevState,
      items: [
        ...(
          !multiActiveRows && prevState.items.length
            ? []
            : prevState.items
        ),
        {
          label: get(original, labelKey),
          value: get(original, valueKey)
        }
      ]
    }))
  }

  onUnselectClickRow(original) {
    const { valueKey } = this.props
    const originalValue = get(original, valueKey)

    this.setState(prevState => ({
      ...prevState,
      items: filter(prevState.items, (item) => {
        const itemValue = get(item, 'value')
        return itemValue !== originalValue
      })
    }))
  }

  setFormStore() {
    const {
      name,
      onChange,
      rules
    } = this.props

    const { items } = this.state
    const values = map(items, ({ value }) => value)
    const value = toString(first(values) || '')

    const {
      isValid,
      errorText
    } = applyRulesAndValidate(rules, value)

    onChange(name, {
      value,
      isValid,
      showError: true,
      errorText
    })
  }

  clearInput() {
    this.setState(prevState => ({
      ...prevState,
      items: []
    }), this.setFormStore)
  }

  openModal() {
    const {
      datagridContainer,
      datagridContainerProps,
      helperText
    } = this.props

    window.openDialog({
      component: Modal,
      componentProps: {
        datagridContainer,
        datagridContainerProps: {
          ...datagridContainerProps,
          onSelectClickRow: this.onSelectClickRow,
          onUnselectClickRow: this.onUnselectClickRow,
          onDblClick: (dialogId) => {
            this.setFormStore()
            window.closeDialog(dialogId)
          }
        },
        title: helperText,
        onSuccess: (dialogId) => {
          this.setFormStore()
          window.closeDialog(dialogId)
        }
      }
    })
  }

  render() {
    const {
      classes,
      // multiActiveRows,
      value,
      ...props
    } = this.props

    const { items } = this.state

    const { label } = find(items, item => toString(item.value) === toString(value)) || {}

    // let values = map(
    //   value,
    //   (id) => {
    //     const { label } = find(items, item => item.value === id) || {}
    //     return label
    //   }
    // )
    //
    // if (!multiActiveRows) {
    //   values = first(values)
    // } else {
    //   values = values.join(', ')
    // }

    return (
      <FormControl
        className={ classes.formControl }
      >
        <Input
          { ...props }
          inputProps={ {
            readOnly: !isEmpty(value),
            inputProps: {
              clearInput: this.clearInput,
              onClick: this.openModal,
              labelValue: label
            }
          } }
          disabled={ isEmpty(value) }
          autoComplete="off"
          iconClick={ this.openModal }
          value={ value }
        />
      </FormControl>
    )
  }
}

DatagridInput.propTypes = {
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** - */
  datagridContainer: PropTypes.func.isRequired,
  /** - */
  labelKey: PropTypes.string.isRequired,
  /** - */
  valueKey: PropTypes.string.isRequired,
  /** - */
  name: PropTypes.string.isRequired,
  /** - */
  datagridContainerProps: PropTypes.object,
  /** - */
  onChange: PropTypes.func,
  /** - */
  helperText: PropTypes.string,
  /** If 'true' multiples columns can be selected at once. */
  multiActiveRows: PropTypes.bool,
  /** - */
  value: PropTypes.any,
  /** - */
  rules: PropTypes.array
}

DatagridInput.defaultProps = {
  onChange: () => {},
  datagridContainerProps: {},
  helperText: 'Selecione um item',
  multiActiveRows: false,
  value: [],
  rules: []
}

export default withStyles(styles)(DatagridInput)
export { DatagridInput as ComponentWithProps }
