import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import toString from 'lodash/toString'
import size from 'lodash/size'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import get from 'lodash/get'
import flow from 'lodash/fp/flow'
import getFP from 'lodash/fp/get'
import first from 'lodash/fp/first'
import tail from 'lodash/fp/tail'
import isEqual from 'lodash/isEqual'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import RefreshIconButton from '@syntesis/c-buttons/src/components/IconButton/RefreshIconButton'
import { getIndicators } from '@syntesis/s-indicators'
import Grid from '@material-ui/core/Grid'

import styles from './styles'

class IndicatorGroup extends Component {
  constructor(props) {
    super(props)
    this.addInGroup = this.addInGroup.bind(this)
    this.fetchGroup = this.fetchGroup.bind(this)
    this.refreshGroup = this.refreshGroup.bind(this)
    this.verifySlugsToLoading = debounce(this.verifySlugsToLoading.bind(this), 100)

    this.state = {
      loading: true,
      indicators: {}
    }
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.filter, this.props.filter)) {
      let enableFetch = true
      forEach(this.props.filter, (filter = {}) => {
        const value = toString(get(filter, 'value'))
        if (isEmpty(value)) {
          enableFetch = false
        }
      })
      if (enableFetch) {
        this.refreshGroup()
      }
    }
  }

  addInGroup(slug, indexInGroup) {
    const { indicators } = this.state

    if (isEmpty(indicators[slug])) {
      this.setState(prevState => ({
        ...prevState,
        indicators: {
          ...prevState.indicators,
          [slug]: {
            slug,
            indexInGroup,
            response: []
          }
        }
      }), this.verifySlugsToLoading)
    }
  }

  verifySlugsToLoading() {
    const { children } = this.props
    const { indicators } = this.state

    if (isArray(children)) {
      if (size(indicators) === size(children)) {
        this.refreshGroup()
      }
    } else if (!isEmpty(children) && !isEmpty(indicators)) {
      this.refreshGroup()
    }
  }

  async fetchGroup() {
    const { filter } = this.props
    const { indicators } = this.state

    const { response } = await getIndicators({
      slugs: map(this.state.indicators, ({ slug }) => ({ slug })),
      filter
    })

    let newIndicators = {}
    forEach(response, (indicator) => {
      const { slug } = indicator

      newIndicators = {
        ...newIndicators,
        [slug]: {
          ...indicators[slug],
          response: [
            ...get(newIndicators[slug], 'response', []),
            indicator
          ]
        }
      }
    })

    this.setState(prevState => ({
      ...prevState,
      indicators: newIndicators,
      loading: false
    }))
  }

  refreshGroup() {
    this.setState(prevState => ({
      ...prevState,
      loading: true
    }), this.fetchGroup)
  }

  render() {
    const {
      classes,
      title,
      children,
      manualRefresh,
      filter: indicatorFilter,
      divider
    } = this.props

    const {
      loading,
      indicators
    } = this.state

    return (
      <div>
        <Grid container wrap="wrap">
          <Grid
            item
            xs={ 12 }
            sm={ 12 }
            md={ 12 }
            lg={ 12 }
          >
            <div className={ classes.container }>
              <div className={ classes.header }>
                <Typography variant="h6" className={ classes.title }>
                  { title }
                </Typography>
                {
                  manualRefresh
                    ? (
                      <RefreshIconButton
                        size="mini"
                        tooltip="Atualizar indicadores do grupo"
                        onClick={ this.refreshGroup }
                        iconProps={ {
                          classes: { root: classes.headerIcon }
                        } }
                      />
                    )
                    : null
                }
              </div>
              {
                divider ? <Divider /> : null
              }
              <div className={ classes.indicatorsContainer }>
                {
                  // add prop inside each child element
                  Children.map(
                    children,
                    (child, index) => {
                      const indicator = find(indicators, { indexInGroup: index })

                      const firstIndicator = flow(
                        getFP('response'),
                        first
                      )(indicator)

                      const firstValue = flow(
                        getFP('values'),
                        first
                      )(firstIndicator)

                      const indicatorChildren = flow(
                        getFP('response'),
                        tail
                      )(indicator)

                      return (
                        cloneElement(child, {
                          loading,
                          inGroup: true,
                          addInGroup: this.addInGroup,
                          indexInGroup: index,
                          value: get(firstValue, 'value'),
                          dateTime: get(firstValue, 'lastUpdated'),
                          title: get(firstIndicator, 'title'),
                          indicatorChildren,
                          filter: indicatorFilter
                        })
                      )
                    }
                  )
                }
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

IndicatorGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  manualRefresh: PropTypes.bool,
  filter: PropTypes.array,
  divider: PropTypes.bool
}

IndicatorGroup.defaultProps = {
  children: null,
  manualRefresh: true,
  divider: true,
  filter: []
}

export default withStyles(styles)(IndicatorGroup)
