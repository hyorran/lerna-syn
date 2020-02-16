import React, { Component } from 'react'
import PropTypes from 'prop-types'
import JsxParser from 'react-jsx-parser'
import { withStyles } from '@material-ui/core/styles'
import { getWikiSummaryPage } from '@syntesis/s-wiki'
import SchoolIcon from '@syntesis/c-icons/src/SchoolIcon'
import PageTitle from '../PageTitle'

import styles from './styles'

class HelperPage extends Component {
  constructor(props) {
    super(props)

    this.getInfo = this.getInfo.bind(this)

    this.state = {
      content: ''
    }
  }

  componentDidMount() {
    this.getInfo()
  }

  async getInfo() {
    const {
      wikiPageId,
      stopExternalLoader
    } = this.props

    if (wikiPageId) {
      const { wikiSummaryPage } = await getWikiSummaryPage({ pageId: wikiPageId })
      this.setState(prevState => ({
        ...prevState,
        content: wikiSummaryPage
      }), stopExternalLoader)
    }
  }

  render() {
    const {
      classes,
      hide,
      pageTitle
    } = this.props

    if (hide) {
      return null
    }

    const { content } = this.state

    return (
      <div className={ classes.container }>
        <PageTitle
          title="Resumo da rotina"
          subtitle={ pageTitle }
          Icon={ SchoolIcon }
          containerTitleClass={ classes.title }
        />
        <JsxParser jsx={ content } />
      </div>
    )
  }
}

HelperPage.propTypes = {
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** if 'true' hides the component. */
  hide: PropTypes.bool,
  /** Reference of synsuite wiki page. */
  wikiPageId: PropTypes.number,
  /** - */
  pageTitle: PropTypes.string,
  /** - */
  stopExternalLoader: PropTypes.func
}

HelperPage.defaultProps = {
  hide: false,
  wikiPageId: null,
  pageTitle: null,
  stopExternalLoader: () => {},
}

export default withStyles(styles)(HelperPage)
export { HelperPage as ComponentWithProps }
