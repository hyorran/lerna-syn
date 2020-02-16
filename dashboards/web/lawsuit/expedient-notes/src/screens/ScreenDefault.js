import React, { Component, lazy } from 'react'
import Dashboard from '@syntesis/c-dashboard'
import wikiPageIds from '@syntesis/s-wiki/src/wikiPageIds'

const Overview = lazy(() => import('../containers/Overview'))
const ExpedientNotes = lazy(() => import('../containers/ExpedientNotes'))
const Assignments = lazy(() => import('../containers/Assignments'))
const ExpedientNotesRevised = lazy(() => import('../containers/ExpedientNotesRevised'))
const ExpedientNotesArchived = lazy(() => import('../containers/ExpedientNotesArchived'))
const ExpedientNotesDeleted = lazy(() => import('../containers/ExpedientNotesDeleted'))

class ScreenDefault extends Component {
  render() {

    const feature = {
      title: 'Notas de expediente',
      subtitle: 'Dashboard',
      wikiPageId: wikiPageIds.lawsuit.expedientNotes.dashboard
    }

    const items = [
      {
        title: 'Visão geral',
        container: Overview,
        urlPath: '/'
      },
      {
        title: 'Notas pendentes',
        container: ExpedientNotes,
        urlPath: '/expedient-notes-pending'
      },
      {
        title: 'Atividades/Prazos',
        container: Assignments,
        urlPath: '/assignments'
      },
      {
        title: 'Notas revisadas',
        container: ExpedientNotesRevised,
        urlPath: '/expedient-notes-revised'
      },
      {
        title: 'Notas arquivadas',
        container: ExpedientNotesArchived,
        urlPath: '/expedient-notes-archived'
      },
      {
        title: 'Notas excluídas',
        container: ExpedientNotesDeleted,
        urlPath: '/expedient-notes-deleted'
      }
    ]

    return (
      <Dashboard
        feature={ feature }
        items={ items }
      />
    )
  }
}

export default ScreenDefault
