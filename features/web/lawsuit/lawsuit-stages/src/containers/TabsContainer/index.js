import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import ContentTabs from '@syntesis/c-tabs/src/containers/TabsContainer'
import { getLawsuitStages } from '@syntesis/s-lawsuit-stages'
// import HelperPage from '@syntesis/c-commons/src/components/HelperPage'
import ItemInfosContainer from './ItemInfosContainer'
import DatagridLogsContainer from './DatagridLogsContainer'
import LinearLoader from '@syntesis/c-loaders/src/components/Linear'
// import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'

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
      const { response } = await getLawsuitStages({ id })
      this.setState(prevState => ({
        ...prevState,
        item: response,
        loading: false
      }))
      this.item = response
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
    const { onRefresh, fallback } = this.props

    const tabs = [
      {
        type: 'details',
        contentComponent: ItemInfosContainer,
        contentComponentProps: {
          item
        }
      },
      {
        label: 'Histórico',
        contentComponent: DatagridLogsContainer,
        contentComponentProps: {
          item,
          onRefresh,
          fallback
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
        {/* <HelperPage
          pageTitle="Fases processuais"
          hide={ !isEmpty(item) }
          wikiPageId={ 303 }
        /> */}
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
