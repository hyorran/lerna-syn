import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { withStyles } from '@material-ui/core/styles'
import SearchInput from '@syntesis/c-inputs/src/components/SearchInput'

import styles from './styles'

class Search extends Component {
  constructor(props) {
    super(props)
    this.changedValue = debounce(this.changedValue.bind(this), 200)
  }

  changedValue(_, { value }) {
    this.props.onSearch(value)
  }

  render() {
    const {
      classes,
      searchLabel,
      searchInputComponent,
      searchAutoFocus
    } = this.props

    const InputComponent = searchInputComponent || SearchInput

    return (
      <InputComponent
        autoFocus={ searchAutoFocus }
        name="filterAll"
        label={ searchLabel }
        onChange={ this.changedValue }
        containerClass={ classes.searchInputContainer }
        withoutHelperText
      />
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchAutoFocus: PropTypes.bool.isRequired,
  searchLabel: PropTypes.string,
  searchInputComponent: PropTypes.func
}

Search.defaultProps = {
  searchLabel: 'Pesquisar...',
  searchInputComponent: undefined
}

export default withStyles(styles)(Search)
