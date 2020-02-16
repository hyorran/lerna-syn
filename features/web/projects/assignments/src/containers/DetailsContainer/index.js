import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment/moment'
import { withStyles } from '@material-ui/core/styles'
import CircularIndeterminate from '@syntesis/c-loaders/src/components/CircularIndeterminate'
import Typography from '@material-ui/core/Typography'
import { getAssignments } from '@syntesis/s-assignments'

import styles from './styles'

class DetailsContainer extends Component {
  constructor(props) {
    super(props)

    this.getAssignments = this.getAssignments.bind(this)

    this.state = {
      assignment: {},
      loading: true
    }
  }

  componentDidMount() {
    this.getAssignments()
  }

  async getAssignments() {
    try {
      const { item } = this.props
      const id = get(item, 'id')
      const body = await getAssignments({ id })

      this.setState(prevState => ({
        ...prevState,
        assignment: get(body, 'response'),
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
      title,
      lawsuitProcessNumber,
      description,
      responsibleName,
      teamName,
      requestorName,
      progress,
      finalDate,
      priority,
    } = this.state.assignment

    let customPriority = 'Normal'
    if (priority === 1) {
      customPriority = 'Média'
    } else if (priority === 2) {
      customPriority = 'Alta'
    }

    if (this.state.loading) {
      return (
        <div className={ classes.paddingModal }>
          <CircularIndeterminate style={ { left: '45%', position: 'relative' } } />
        </div>
      )
    }

    return (
      <div className={ classes.paddingModal }>
        { this.renderItem('Informações', !isEmpty(title) ? title : '-') }
        { this.renderItem('Número do Processo', lawsuitProcessNumber) }
        { this.renderItem('Responsável', responsibleName) }
        { this.renderItem('Equipe', teamName) }
        { this.renderItem('Solicitante', requestorName) }
        { this.renderItem('Progresso', `${ progress }%`) }
        { this.renderItem('Prazo Final', moment(finalDate).format('L')) }
        { this.renderItem('Prioridade', customPriority) }
        { this.renderItem('Descrição', description) }
      </div>
    )
  }
}

DetailsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default withStyles(styles)(DetailsContainer)
