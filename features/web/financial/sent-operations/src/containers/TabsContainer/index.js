import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import ContentTabs from '@syntesis/c-tabs/src/containers/TabsContainer'
import { getSentOperations } from '@syntesis/s-sent-operations'
import LinearLoader from '@syntesis/c-loaders/src/components/Linear'
import ItemInfosContainer from './ItemInfosContainer'

class TabsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.getItem = this.getItem.bind(this)
    this.fetchItem = this.fetchItem.bind(this)

    this.item = {}

    this.state = {
      item: {},
      loading: false,
      error: false
    }
  }

  componentDidMount() {
    this.getItem(this.props.item)
  }

  componentWillUpdate(nextProps) {
    if (!isEqual(this.props.item, nextProps.item)) {
      this.getItem(nextProps.item)
    }
  }

  getItem(item) {
    if (!isEqual(item, this.item)) {
      if (isEmpty(item)) {
        this.setState(prevState => ({
          ...prevState,
          item: {},
          loading: false,
          error: false
        }))
        this.item = {}
      } else {
        this.setState(prevState => ({
          ...prevState,
          loading: true,
          error: false
        }), () => this.fetchItem(item))
      }
    }
  }

  async fetchItem({ id }) {
    try {
      const { response } = await getSentOperations({ id })
      const sentData = get(response, 'sentData')
      const feedbackData = get(response, 'feedbackData')
      const authorizationCode = get(response, 'authorizationCode')
      const nsu = get(response, 'nsu')

      this.setState(prevState => ({
        ...prevState,
        item: {
          sentData,
          feedbackData,
          authorizationCode,
          nsu
        },
        loading: false
      }))
      this.item = {
        sentData,
        feedbackData,
        authorizationCode,
        nsu
      }
    } catch (e) {
      this.setState(prevState => ({
        ...prevState,
        loading: false
      }))
      this.props.fallback()
      throw e
    }
  }

  render() {
    const { item, loading } = this.state

    const tabs = [
      {
        type: 'details',
        contentComponent: ItemInfosContainer,
        contentComponentProps: {
          item
        }
      }
    ]

    return (
      <Fragment>
        <LinearLoader
          visible
          loading={ loading }
          value={ isEmpty(item) ? 0 : undefined }
        />
        {
          !isEmpty(item)
            ? (
              <ContentTabs
                hide={ false }
                tabs={ tabs }
              />
            )
            : null
        }
      </Fragment>
    )
  }
}

TabsContainer.propTypes = {
  item: PropTypes.object,
  onRefresh: PropTypes.func,
  fallback: PropTypes.func
}

TabsContainer.defaultProps = {
  item: {},
  onRefresh: () => {},
  fallback: () => {}
}

export default TabsContainer
