import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContactFormsScreen from '@syntesis/f-contact-forms/src/screens/ScreenDefault'

class ContactForms extends Component {
  render() {
    return <ContactFormsScreen />
  }
}

PropTypes.propTypes = {
  containerKey: PropTypes.string.isRequired,
  params: PropTypes.object
}

PropTypes.defaultProps = {
  params: {}
}

export default ContactForms
