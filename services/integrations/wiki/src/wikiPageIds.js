const wikiPageIds = {
  crm: {
    crmForms: 314,
    crmMotives: 316,
  },
  fiscal: {
    magneticFiles: 412,
    reinf: 334
  },
  financial: {
    paymentMethods: 211,
    financialInstitutions: 211, // TODO: Ajustar o ID da Wiki
    selfServiceTerminal: 307,
    sentOperations: 404,
    coBilling: {
      dashboard: 419,
      overview: 420,
      entries: 421,
      receipts: 422,
      docEntries: 423,
      docReceipts: 424
    }
  },
  lawsuit: {
    actobjects: 300,
    acttypes: 303,
    areas: 295,
    briefcases: 301,
    courts: 305,
    decisions: 296,
    distribuitions: 297,
    expedientNotes: {
      dashboard: 368,
      overview: 371,
      pending: 370,
      revised: 378,
      archived: 383,
      deleted: 384,
    },
    forums: 298,
    judgements: 299,
    lawsuitClientConditions: 313,
    lawsuitForms: 330,
    lawsuitMotives: 331,
    lawsuitStages: 372,
    lawsuitTypes: 369,
    locals: 315,
    occurrences: 304,
    resources: 302,
  },
  projects: {
    assignments: 375
  },
  suite: {
    contactForms: 314,
    contactMotives: 316,
    assignmentOrigins: 316, // TODO: Ajustar o ID da Wiki
  },
}

export default wikiPageIds
