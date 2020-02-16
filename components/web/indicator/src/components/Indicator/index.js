import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import getFP from 'lodash/fp/get'
import firstFP from 'lodash/fp/first'
import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import map from 'lodash/map'
import tail from 'lodash/fp/tail'
import size from 'lodash/size'
import moment from 'moment/moment'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import RefreshIconButton from '@syntesis/c-buttons/src/components/IconButton/RefreshIconButton'
import CircularIndeterminateLoader from '@syntesis/c-loaders/src/components/CircularIndeterminate'
import { getIndicators } from '@syntesis/s-indicators'
import ExpandMoreIconButton from '@syntesis/c-buttons/src/components/IconButton/ExpandMoreIconButton'
import { createGradient, isDark, darken } from '@syntesis/c-styles/src/styles/Colors/utils'
import IndicatorChildren from '../IndicatorChildren'

import Colors from '@syntesis/c-styles/src/styles/Colors'

import styles from './styles'

const classNames = require('classnames')

class Indicator extends Component {
  static getDerivedStateFromProps(props, state) {
    state = {
      ...state,
      showChildren: !isEmpty(props.slug) ? props.slug.split('_')[0] === 'group' : false
    }

    if (props.inGroup) {
      if (!state.dateTime || moment(props.dateTime).isAfter(state.dateTime)) {
        return {
          ...state,
          value: props.value,
          dateTime: props.dateTime,
          loading: props.loading,
          title: props.title,
          money: props.money,
          indicatorChildren: props.indicatorChildren
        }
      }
      return {
        ...state,
        loading: state.loading || props.loading
      }
    }
    return state
  }

  constructor(props) {
    super(props)
    this.refreshIndicator = this.refreshIndicator.bind(this)
    this.fetchIndicator = this.fetchIndicator.bind(this)

    const {
      slug,
      // filters,
      inGroup,
      addInGroup,
      indexInGroup
    } = props

    if (inGroup) {
      addInGroup(slug, indexInGroup)
    }

    this.state = {
      value: null,
      dateTime: null,
      loading: false,
      title: '',
      checked: false,
      money: false,
      showChildren: false,
      indicatorChildren: null
    }
  }

  componentDidMount() {
    if (!this.props.inGroup) {
      this.refreshIndicator()
    }
  }

  async fetchIndicator() {
    const {
      slug,
      filter
    } = this.props

    const { response } = await getIndicators({
      slugs: [{ slug }],
      filter
    })

    if (this.state.showChildren) {
      const indicator = response

      const firstIndicator = first(indicator)

      const firstValue = flow(
        getFP('values'),
        first
      )(firstIndicator)

      const indicatorChildren = tail(indicator)

      this.setState(prevState => ({
        ...prevState,
        value: get(firstValue, 'value'),
        dateTime: get(firstValue, 'lastUpdated'),
        title: get(firstIndicator, 'title'),
        loading: false,
        indicatorChildren
      }))
    } else {
      const indicator = first(response)
      const firstValue = flow(
        getFP('values'),
        firstFP
      )(indicator)

      this.setState(prevState => ({
        ...prevState,
        value: get(firstValue, 'value'),
        dateTime: get(firstValue, 'lastUpdated'),
        title: get(indicator, 'title'),
        loading: false
      }))
    }
  }

  refreshIndicator() {
    this.setState(prevState => ({
      ...prevState,
      loading: true
    }), this.fetchIndicator)
  }

  handleChange = () => {
    if (this.state.showChildren) {
      this.setState(prevState => ({
        checked: !prevState.checked
      }))
    }
    this.refreshIndicator()
  }

  render() {
    const {
      classes,
      severity,
      backgroundColor,
      colorText,
      manualRefresh,
      format
    } = this.props

    const {
      value,
      dateTime,
      loading,
      checked,
      title,
      showChildren,
      indicatorChildren
    } = this.state

    const customCardProps = {}
    if (!isEmpty(backgroundColor)) {
      customCardProps.style = { backgroundColor }
    }

    const customTextProps = {}
    if (!isEmpty(backgroundColor)) {
      customTextProps.style = {
        color: colorText
      }
    }

    let gradients = null
    if (size(indicatorChildren) > 2 && backgroundColor) {
      gradients = createGradient(
        backgroundColor,
        darken(backgroundColor, 50),
        size(indicatorChildren)
      )
    }
    // console.warn('gradients', gradients)
    let children = null
    if ((showChildren) && (checked)) {
      children = map(
        indicatorChildren,
        (child, index) => (
          <IndicatorChildren
            key={ index }
            checked={ checked }
            // onClick={ this.handleChange }
            indicatorProps={ {
              value: get(child, 'values[0].value'),
              title: get(child, 'title'),
              dateTime: get(child, 'values[0].lastUpdated'),
              format,
              backgroundColor: !isEmpty(gradients) ? gradients[index].toHexString() : null,
              colorText:
                !isEmpty(gradients) && isDark(gradients[index].toHexString())
                  ? Colors.generic.text
                  : null
            } }
            timeout={ 500 * index }
          />
        )
      )
    }
    let content = (
      <Card
        className={ [classes.container, classes[severity], showChildren ? classes.pointer : ''].join(' ') }
        // onClick={ this.handleChange }
        { ...customCardProps }
      >
        <div className={ classes.header }>
          <Typography
            variant="body2"
            className={ classes.title }
            { ...customTextProps }
          >
            { title }
          </Typography>
          {
            manualRefresh
              ? (
                <RefreshIconButton
                  onClick={ this.refreshIndicator }
                  size="mini"
                  iconProps={ {
                    classes: {
                      root: classes.headerIcon
                    }
                  } }
                />
              )
              : null
          }
        </div>
        {
          loading
            ? (
              <CircularIndeterminateLoader
                className={ classes.loader }
                marginTop={ 0 }
                size={ 32 }
              />
            )
            : (
              <Typography
                className={ classes.value }
                variant={
                  (!isEmpty(value)) && (value.toString().length < 10) ? 'h5' : 'h6'
                }
                { ...customTextProps }
              >
                { format(value) }
              </Typography>
            )
        }
        <CardActions
          className={ classes.actions }
          disableActionSpacing
        >
          {
            showChildren
              ? (
                <ExpandMoreIconButton
                  tooltip={ checked ? 'Recolher' : 'Expandir' }
                  btnClass={
                    classNames(
                      classes.expandButton,
                      {
                        [classes.expand]: !checked,
                        [classes.expandOpen]: checked
                      }
                    )
                  }
                  onClick={ this.handleChange }
                />
              ) : null
          }
        </CardActions>
      </Card>
    )
    if (dateTime) {
      content = (
        <Tooltip
          title={ `Atualizado em: ${ moment(dateTime).format('L LTS') }` }
        >
          { content }
        </Tooltip>
      )
    }
    return (
      <div >
        <Grid container wrap="wrap">
          <Grid
            item
            xs={ 12 }
            sm={ 12 }
            md={ 12 }
            lg={ 12 }
          >
            { content }
            { children }
          </Grid>
        </Grid>
      </div>
    )
  }
}

Indicator.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  slug: PropTypes.string,
  filter: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  severity: PropTypes.oneOf(['danger', 'warning', 'normal', 'success']),
  backgroundColor: PropTypes.string,
  colorText: PropTypes.string,
  dateTime: PropTypes.string,
  watch: PropTypes.bool,
  manualRefresh: PropTypes.bool,
  inGroup: PropTypes.bool,
  addInGroup: PropTypes.func,
  indexInGroup: PropTypes.number,
  loading: PropTypes.bool,
  expandable: PropTypes.bool,
  componentProps: PropTypes.object,
  showChildren: PropTypes.bool,
  format: PropTypes.func
}

Indicator.defaultProps = {
  title: '',
  slug: null,
  value: null,
  filter: [],
  severity: 'normal',
  backgroundColor: null,
  colorText: null,
  dateTime: undefined,
  watch: true,
  manualRefresh: true,
  inGroup: false,
  addInGroup: () => {},
  indexInGroup: null,
  loading: false,
  expandable: false,
  componentProps: null,
  showChildren: false,
  format: value => value
}

export default withStyles(styles)(Indicator)
