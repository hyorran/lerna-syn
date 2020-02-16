import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { withStores } from '@syntesis/c-stores-provider'

import styles from './styles'

@observer
class ScreenReceipt extends Component {
  render() {
    return (
      <h1>Em Construção</h1>
    )
  }
}
ScreenReceipt.defaultProps = {
  classes: PropTypes.object.isRequired,
  params: {}
}

export default flow(
  withStores({

  }),
  withStyles(styles)
)(ScreenReceipt)
