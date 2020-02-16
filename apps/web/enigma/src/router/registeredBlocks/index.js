import { lazy } from 'react'

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
const DashboardCoBilling = lazy(() => import('../../containers/financial/DashboardCoBilling'))
const SentOperations = lazy(() => import('../../containers/financial/SentOperations'))
const FinancialInstitutions = lazy(() => import('../../containers/financial/FinancialInstitutions'))
const SelfServiceTerminal = lazy(() => import('../../containers/financial/SelfServiceTerminal'))

/* projects */
const Assignments = lazy(() => import('../../containers/projects/Assignments'))
const AssignmentOrigins = lazy(() => import('../../containers/projects/AssignmentOrigins'))

/* suite */
const ContactForms = lazy(() => import('../../containers/suite/ContactForms'))
const ContactMotives = lazy(() => import('../../containers/suite/ContactMotives'))

export default () => ({
  override: false,
  blocks: {
    Accounts: {
      container: Accounts,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Actobjects: {
      container: Actobjects,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Acttypes: {
      container: Acttypes,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Areas: {
      container: Areas,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Assignments: {
      container: Assignments,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    AssignmentOrigins: {
      container: AssignmentOrigins,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Briefcases: {
      container: Briefcases,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    ContactForms: {
      container: ContactForms,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    ContactMotives: {
      container: ContactMotives,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Courts: {
      container: Courts,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    DashboardCoBilling: {
      container: DashboardCoBilling,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    DashboardMagneticFiles: {
      container: DashboardMagneticFiles,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    DashboardExpedientNotes: {
      container: DashboardExpedientNotes,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Decisions: {
      container: Decisions,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Distribuitions: {
      container: Distribuitions,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Forums: {
      container: Forums,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    FinancialInstitutions: {
      container: FinancialInstitutions,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Judgements: {
      container: Judgements,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Locals: {
      container: Locals,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    LawsuitClientConditions: {
      container: LawsuitClientConditions,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    LawsuitTypes: {
      container: LawsuitTypes,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    LawsuitStages: {
      container: LawsuitStages,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Occurrences: {
      container: Occurrences,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    PaymentMethods: {
      container: PaymentMethods,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Reinf: {
      container: Reinf,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    Resources: {
      container: Resources,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    SelfServiceTerminal: {
      container: SelfServiceTerminal,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    },
    SentOperations: {
      container: SentOperations,
      active: false,
      params: {},
      node: null,
      // guest: true // caso a tela esteja em um ambiente sem autenticação, ligar essa flag
    }
  }
})
