import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ForumsScreen from '@syntesis/f-forums/src/screens/ScreenDefault'

class Forums extends Component {
  render() {
    return <ForumsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Forums
