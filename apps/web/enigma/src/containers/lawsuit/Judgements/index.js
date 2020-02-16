import React, { Component } from 'react'
import PropTypes from 'prop-types'
import JudgementsScreen from '@syntesis/f-judgements/src/screens/ScreenDefault'

class Judgements extends Component {
  render() {
    return <JudgementsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default Judgements
