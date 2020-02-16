import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import HelpIconButton from '@syntesis/c-buttons/src/components/IconButton/HelpIconButton'
import { getWikiUrlPage } from '@syntesis/s-wiki'

import styles from './styles'

class DashboardTitle extends Component {
  constructor(props) {
    super(props)

    this.getWikiLink = this.getWikiLink.bind(this)

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

  render() {
    const {
      classes,
      title,
      subtitle,
      Icon,
      containerTitleClass
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
              { subtitle }
            </Typography>
            <Typography
              className={ [classes.title, classes.uppercase].join(' ') }
              variant="h5"
              noWrap
            >
              { title }
            </Typography>
          </div>
        </div>
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
                  <HelpIconButton
                    tooltip="Ajuda da Dashboard"
                    size="mini"
                    btnClass={ classes.helpIcon }
                  />
                </a>
              </div>
            )
            : null
        }
      </div>
    )
  }
}

DashboardTitle.propTypes = {
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** - */
  title: PropTypes.string.isRequired,
  /** - */
  subtitle: PropTypes.string,
  /** - */
  Icon: PropTypes.func,
  /** Reference of synsuite wiki page. */
  wikiPageId: PropTypes.number,
  /**  Title container's css class. */
  containerTitleClass: PropTypes.string
}

DashboardTitle.defaultProps = {
  Icon: null,
  subtitle: '',
  wikiPageId: null,
  containerTitleClass: null
}

export default withStyles(styles)(DashboardTitle)
export { DashboardTitle as ComponentWithProps }
