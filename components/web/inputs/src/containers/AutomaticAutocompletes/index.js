import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
import map from 'lodash/map'
import toString from 'lodash/toString'
import { withStyles } from '@material-ui/core/styles'
import AutocompleteInput from '../../components/AutocompleteInput'

import styles from './styles'

class AutomaticAutocompletes extends Component {
  constructor(props) {
    super(props)
    this.onFormChange = this.onFormChange.bind(this)
    this.renderItems = this.renderItems.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  onFormChange(controlName, control) {
    const {
      store: {
        changeFormControl
      }
    } = this.props

    changeFormControl(controlName, control)
  }

  renderItems() {
    const {
      collectionControls
    } = this.props

    if (!isEmpty(collectionControls) && isObject(collectionControls)) {
      return map(collectionControls, this.renderItem)
    }

    return null
  }

  renderItem(control, controlName) {
    const {
      classes,
      collectionName,
      disabled,
      isClearable
    } = this.props

    return (
      <div className={ classes.itemContainer } key={ controlName }>
        <AutocompleteInput
          { ...control }
          isClearable={ isClearable }
          value={ toString(get(control, 'value')) }
          disabled={ disabled }
          onChange={
            (name, thisControl) => this.onFormChange(
              `${ collectionName }.value.${ name }`,
              thisControl
            )
          }
        />
        <br />
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <div className={ classes.formContainer }>
        { this.renderItems() }
      </div>
    )
  }
}

AutomaticAutocompletes.propTypes = {
  classes: PropTypes.object.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionControls: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  store: PropTypes.object
}

AutomaticAutocompletes.defaultProps = {
  disabled: false,
  isClearable: true,
  store: {}
}

export default withStyles(styles)(AutomaticAutocompletes)
