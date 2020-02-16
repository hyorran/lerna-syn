import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment/moment'
import { withStyles } from '@material-ui/core/styles'
import CircularIndeterminate from '@syntesis/c-loaders/src/components/CircularIndeterminate'
import HtmlToComponent from '@syntesis/c-commons/src/components/HtmlToComponent'
import Typography from '@material-ui/core/Typography'
import { getLawsuitExpedientNotes } from '@syntesis/s-lawsuit-expedient-notes'

import styles from './styles'

class DetailsContainer extends Component {
  constructor(props) {
    super(props)

    this.getExpedientNote = this.getExpedientNote.bind(this)

    this.state = {
      expedientNote: {},
      loading: true
    }
  }

  componentDidMount() {
    this.getExpedientNote()
  }

  async getExpedientNote() {
    try {
      const { item } = this.props
      const id = get(item, 'id')
      const body = await getLawsuitExpedientNotes({ id })

      this.setState(prevState => ({
        ...prevState,
        expedientNote: get(body, 'response'),
        loading: false
      }))
    } catch (e) {
      throw e
    }
  }

  renderItem(title, value) {
    if (isEmpty(value)) {
      return null
    }

    const { classes } = this.props

    return (
      <Typography variant="subtitle2" className={ classes.typographyMargin }>
        <b>
          { title }:
        </b>
        &nbsp;{ value }
      </Typography>
    )
  }

  render() {
    const { classes } = this.props

    const {
      rawEvent,
      rawProcessNumber,
      rawClass,
      rawAuthors,
      rawDefendants,
      rawLocal,
      rawSubject,
      rawPublicationDate,
      rawAvailableDate,
      rawOrgan,
      observation,
      privateObservation
    } = this.state.expedientNote

    let customRawPublicationDate = null
    if (!isEmpty(rawPublicationDate)) {
      customRawPublicationDate = moment(rawPublicationDate).isValid()
        ? moment(rawPublicationDate).format('L')
        : rawPublicationDate
    }

    let customRawAvailableDate = null
    if (!isEmpty(rawAvailableDate)) {
      customRawAvailableDate = moment(rawAvailableDate).isValid()
        ? moment(rawAvailableDate).format('L')
        : rawAvailableDate
    }

    if (this.state.loading) {
      return (
        <div className={ classes.paddingModal }>
          <CircularIndeterminate style={ { left: '45%', position: 'relative' } } />
        </div>
      )
    }

    return (
      <div className={ [classes.paddingModal, 'fix-ckeditor'].join(' ') }>
        { this.renderItem('Evento', !isEmpty(rawEvent) ? rawEvent : '-') }
        { this.renderItem('Processo', rawProcessNumber) }
        { this.renderItem('Classe', rawClass) }
        { this.renderItem('Partes', rawAuthors) }
        { this.renderItem('Réus', rawDefendants) }
        { this.renderItem('Local', rawLocal) }
        { this.renderItem('Assunto', rawSubject) }
        { this.renderItem('Data de disponibilização', customRawAvailableDate) }
        { this.renderItem('Data de publicação', customRawPublicationDate) }
        { this.renderItem('Órgão', rawOrgan) }
        { this.renderItem('Conteúdo', !isEmpty(observation) ? <HtmlToComponent html={ observation } /> : null) }
        { this.renderItem('Observações internas', !isEmpty(privateObservation) ? <HtmlToComponent html={ privateObservation } /> : null) }
      </div>
    )
  }
}

DetailsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default withStyles(styles)(DetailsContainer)
