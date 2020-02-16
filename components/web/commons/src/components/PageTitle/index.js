import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import HelpIconButton from '@syntesis/c-buttons/src/components/IconButton/HelpIconButton'
import SchoolIconButton from '@syntesis/c-buttons/src/components/IconButton/SchoolIconButton'
import CustomDocsIconButton from '@syntesis/c-buttons/src/components/IconButton/CustomDocsIconButton'
import { getWikiUrlPage } from '@syntesis/s-wiki'
import SummaryModal from './SummaryModal'

import styles from './styles'

class PageTitle extends Component {
  constructor(props) {
    super(props)

    this.getWikiLink = this.getWikiLink.bind(this)
    this.openSummaryModal = this.openSummaryModal.bind(this)
    this.stopSummaryModalLoading = this.stopSummaryModalLoading.bind(this)

    this.state = {
      wikiPageLink: null
    }
  }

  componentDidMount() {
    this.getWikiLink()
  }

  async getWikiLink() {
    const { wikiPageId } = this.props

    if (wikiPageId) {
      const { wikiUrlPage } = await getWikiUrlPage({ pageId: wikiPageId })
      this.setState(prevState => ({
        ...prevState,
        wikiPageLink: wikiUrlPage
      }))
    }
  }

  openSummaryModal() {
    const {
      title,
      wikiPageId
    } = this.props

    window.openDialog({
      component: SummaryModal,
      componentProps: {
        title,
        wikiPageId,
        loading: true
      }
    })
  }

  stopSummaryModalLoading() {
    this.setState(prevState => ({
      ...prevState,
      summaryLoading: false
    }))
  }

  render() {
    const {
      classes,
      title,
      subtitle,
      Icon,
      containerTitleClass,
      summaryButton,
      customDocsButton
    } = this.props

    const { wikiPageLink } = this.state

    return (
      <div className={ classes.container }>
        <div className={ [classes.containerTitle, containerTitleClass].join(' ') }>
          {
            Icon
              ? (
                <Avatar className={ classes.avatar }>
                  <Icon className={ classes.avatarIcon } />
                </Avatar>
              )
              : null
          }
          <div>
            <Typography
              className={ [classes.subtitle, classes.uppercase].join(' ') }
              variant="caption"
              gutterBottom
              noWrap
            >
              {subtitle}
            </Typography>
            <Typography
              className={ [classes.title, classes.uppercase].join(' ') }
              color="primary"
              variant="h5"
              noWrap
            >
              {title}
            </Typography>
          </div>
        </div>
        <div className={ classes.containerHelpIcons }>
          {
            !isEmpty(customDocsButton)
              ? (
                <div className={ classes.containerWikiHelp }>
                  <a
                    href={ customDocsButton.url }
                    className={ classes.helpBtn }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CustomDocsIconButton marginHorizontal={ false } />
                  </a>
                </div>
              )
              : null
          }
          {
            !isEmpty(wikiPageLink) && summaryButton
              ? (
                <div className={ classes.containerWikiHelp }>
                  <SchoolIconButton
                    marginHorizontal={ false }
                    onClick={ this.openSummaryModal }
                  />
                </div>
              )
              : null
          }
          {
            !isEmpty(wikiPageLink)
              ? (
                <div className={ classes.containerWikiHelp }>
                  <a
                    href={ wikiPageLink }
                    className={ classes.helpBtn }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <HelpIconButton marginHorizontal={ false } />
                  </a>
                </div>
              )
              : null
          }
        </div>
      </div>
    )
  }
}

PageTitle.propTypes = {
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** - */
  title: PropTypes.string.isRequired,
  /** - */
  subtitle: PropTypes.string,
  /** - */
  Icon: PropTypes.func,
  /** Synsuite wiki page reference. */
  wikiPageId: PropTypes.number,
  /** - */
  containerTitleClass: PropTypes.string,
  /** If 'true' shows an SummaryButton */
  summaryButton: PropTypes.bool,
  /** - */
  customDocsButton: PropTypes.object
}

PageTitle.defaultProps = {
  Icon: null,
  subtitle: '',
  wikiPageId: null,
  containerTitleClass: null,
  summaryButton: false,
  customDocsButton: null
}

export default withStyles(styles)(PageTitle)
export { PageTitle as ComponentWithProps }
