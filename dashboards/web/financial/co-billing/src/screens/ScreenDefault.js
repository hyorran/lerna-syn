import React, { Component, lazy } from 'react'
import Dashboard from '@syntesis/c-dashboard'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'

const Overview = lazy(() => import('../containers/Overview'))
const Emissions = lazy(() => import('../containers/Entries'))
const Receipts = lazy(() => import('../containers/Receipts'))
const DocReceipts = lazy(() => import('../containers/DocReceipts'))
const DocEntries = lazy(() => import('../containers/DocEntries'))

class ScreenDefault extends Component {
  render() {
    const items = [
      {
        title: 'Visão geral',
        container: Overview,
        urlPath: '/'
      },
      {
        title: 'Emissões',
        container: Emissions,
        urlPath: '/emissions'
      },
      {
        title: 'Recebimentos',
        container: Receipts,
        urlPath: '/receipts'
      },
      {
        title: 'Auditoria - NFSe',
        container: DocEntries,
        urlPath: '/audit-nfse'
      },
      {
        title: 'Auditoria - Transferência',
        container: DocReceipts,
        urlPath: '/audit-transfers'
      }
    ]

    const feature = {
      title: 'Co-Billing',
      subtitle: 'Dashboard',
      wikiPageId: wikiPageIds.financial.coBilling.dashboard
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
