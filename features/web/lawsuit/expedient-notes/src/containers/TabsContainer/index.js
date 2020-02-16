import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import ContentTabs from '@syntesis/c-tabs/src/containers/TabsContainer'
import LinearLoader from '@syntesis/c-loaders/src/components/Linear'
import DatagridLogsContainer from './DatagridLogsContainer'

class TabsContainer extends React.Component {

  render() {
    const { item, onRefresh, fallback } = this.props

    const tabs = [
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
          loading={ false }
          value={ isEmpty(item) ? 0 : undefined }
        />
        <ContentTabs
          hide={ false }
          tabs={ tabs }
        />
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
