import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContactMotivesScreen from '@syntesis/f-contact-motives/src/screens/ScreenDefault'

class ContactMotives extends Component {
  render() {
    return <ContactMotivesScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default ContactMotives
