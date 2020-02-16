import { lazy } from 'react'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import mapValues from 'lodash/fp/mapValues'

/* lawsuit */
const Acttypes = lazy(() => import('../../containers/lawsuit/Acttypes'))
const Actobjects = lazy(() => import('../../containers/lawsuit/Actobjects'))
const Areas = lazy(() => import('../../containers/lawsuit/Areas'))
const Briefcases = lazy(() => import('../../containers/lawsuit/Briefcases'))
const Courts = lazy(() => import('../../containers/lawsuit/Courts'))
const DashboardExpedientNotes = lazy(() => import('../../containers/lawsuit/DashboardExpedientNotes'))
const Decisions = lazy(() => import('../../containers/lawsuit/Decisions'))
const Distribuitions = lazy(() => import('../../containers/lawsuit/Distribuitions'))
const Forums = lazy(() => import('../../containers/lawsuit/Forums'))
const Judgements = lazy(() => import('../../containers/lawsuit/Judgements'))
const Occurrences = lazy(() => import('../../containers/lawsuit/Occurrences'))
const LawsuitClientConditions = lazy(() => import('../../containers/lawsuit/LawsuitClientConditions'))
const LawsuitStages = lazy(() => import('../../containers/lawsuit/LawsuitStages'))
const LawsuitTypes = lazy(() => import('../../containers/lawsuit/LawsuitTypes'))
const Locals = lazy(() => import('../../containers/lawsuit/Locals'))
const Resources = lazy(() => import('../../containers/lawsuit/Resources'))

/* fiscal */
const DashboardMagneticFiles = lazy(() => import('../../containers/fiscal/DashboardMagneticFiles'))
const Reinf = lazy(() => import('../../containers/fiscal/Reinf'))

/* financial */
const Accounts = lazy(() => import('../../containers/financial/Accounts'))
const PaymentMethods = lazy(() => import('../../containers/financial/PaymentMethods'))
const FinancialInstitutions = lazy(() => import('../../containers/financial/FinancialInstitutions'))
const SentOperations = lazy(() => import('../../containers/financial/SentOperations'))
const SelfServiceTerminal = lazy(() => import('../../containers/financial/SelfServiceTerminal'))
const DashboardCoBilling = lazy(() => import('../../containers/financial/DashboardCoBilling'))

/* projects */
const Assignments = lazy(() => import('../../containers/projects/Assignments'))
const AssignmentOrigins = lazy(() => import('../../containers/projects/AssignmentOrigins'))

/* suite */
const ContactForms = lazy(() => import('../../containers/suite/ContactForms'))
const ContactMotives = lazy(() => import('../../containers/suite/ContactMotives'))

export default () => {
  const blocks = {
    override: true,
    blocks: {
      Accounts: {
        container: Accounts,
        active: false,
        params: {},
        // guest: true
      },
      Actobjects: {
        container: Actobjects,
        active: false,
        params: {},
        // guest: true
      },
      Acttypes: {
        container: Acttypes,
        active: false,
        params: {},
        // guest: true
      },
      Areas: {
        container: Areas,
        active: false,
        params: {},
        // guest: true
      },
      Assignments: {
        container: Assignments,
        active: false,
        params: {},
        // guest: true
      },
      AssignmentOrigins: {
        container: AssignmentOrigins,
        active: false,
        params: {},
        // guest: true
      },
      Briefcases: {
        container: Briefcases,
        active: false,
        params: {},
        // guest: true
      },
      ContactForms: {
        container: ContactForms,
        active: false,
        params: {},
        // guest: true
      },
      ContactMotives: {
        container: ContactMotives,
        active: false,
        params: {},
        // guest: true
      },
      Courts: {
        container: Courts,
        active: false,
        params: {},
        // guest: true
      },
      DashboardCoBilling: {
        container: DashboardCoBilling,
        active: false,
        params: {}
      },
      DashboardMagneticFiles: {
        container: DashboardMagneticFiles,
        active: false,
        params: {}
      },
      DashboardExpedientNotes: {
        container: DashboardExpedientNotes,
        active: false,
        params: {}
      },
      Decisions: {
        container: Decisions,
        active: false,
        params: {},
        // guest: true
      },
      Distribuitions: {
        container: Distribuitions,
        active: false,
        params: {},
        // guest: true
      },
      Forums: {
        container: Forums,
        active: false,
        params: {},
        // guest: true
      },
      FinancialInstitutions: {
        container: FinancialInstitutions,
        active: false,
        params: {},
        // guest: true
      },
      Judgements: {
        container: Judgements,
        active: false,
        params: {},
        // guest: true
      },
      LawsuitClientConditions: {
        container: LawsuitClientConditions,
        active: false,
        params: {},
        // guest: true
      },
      LawsuitStages: {
        container: LawsuitStages,
        active: false,
        params: {},
        // guest: true
      },
      LawsuitTypes: {
        container: LawsuitTypes,
        active: false,
        params: {},
        // guest: true
      },
      Locals: {
        container: Locals,
        active: false,
        params: {},
        // guest: true
      },
      Occurrences: {
        container: Occurrences,
        active: false,
        params: {},
        // guest: true
      },
      PaymentMethods: {
        container: PaymentMethods,
        active: true,
        params: {},
        // guest: true
      },
      Reinf: {
        container: Reinf,
        active: true,
        params: {},
        // guest: true
      },
      Resources: {
        container: Resources,
        active: false,
        params: {},
        // guest: true
      },
      SelfServiceTerminal: {
        container: SelfServiceTerminal,
        active: false,
        params: {},
        // guest: true
      },
      SentOperations: {
        container: SentOperations,
        active: false,
        params: {},
        // guest: true
      }
    }
  }

  blocks.blocks = flow(
    get('blocks'),
    mapValues(block => ({ ...block, node: document.getElementById('react-portal') }))
  )(blocks)

  return blocks
}
