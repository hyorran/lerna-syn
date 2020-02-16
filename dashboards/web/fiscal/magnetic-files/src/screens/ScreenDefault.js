import React, { Component, lazy } from 'react'
import Dashboard from '@syntesis/c-dashboard'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'

const Overview = lazy(() => import('../containers/Overview'))
const Reinf = lazy(() => import('../containers/Reinf'))

class ScreenDefault extends Component {
  render() {
    const items = [
      {
        title: 'Visão geral',
        container: Overview,
        urlPath: '/'
      },
      {
        title: 'EFD - REINF',
        container: Reinf,
        urlPath: '/reinf'
      }
    ]

    const feature = {
      title: 'EFD REINF',
      subtitle: 'Dashboard',
      wikiPageId: wikiPageIds.fiscal.magneticFiles
    }

    return (
      <Dashboard
        feature={ feature }
        items={ items }
      />
    )
  }
}

export default ScreenDefault
