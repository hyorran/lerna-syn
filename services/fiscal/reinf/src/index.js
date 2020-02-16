import {
  post,
  get,
  down,
  del
} from '@syntesis/s-csharp-microservices'
import { getServerSideData } from '@syntesis/s-datagrid'

async function getGeneratedOrSentFiles({ companyPlaceId, competence }) {
  try {
    const { pagination } = await getServerSideData({
      endpoint: 'fiscal/reinf/getgeneratedorsentfiles',
      data: {
        companyPlaceId,
        competence
      },
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    return pagination

  } catch (e) {
    throw e
  }
}

async function getR2060ToSend({ companyPlaceId, competence }) {
  try {
    const { body } = await get({
      endpoint: 'fiscal/reinf/getr2060tosend',
      data: {
        companyPlaceId,
        competence
      },
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getR2010Parameters({ companyPlaceId, competence }) {
  try {
    const { body } = await get({
      endpoint: 'fiscal/reinf/getR2010Parameters',
      data: {
        companyPlaceId,
        competence
      },
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getR2020Parameters({ companyPlaceId, competence }) {
  try {
    const { body } = await get({
      endpoint: 'fiscal/reinf/getR2020Parameters',
      data: {
        companyPlaceId,
        competence
      },
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }
    return body
  } catch (e) {
    throw e
  }
}

async function getR2099ToSend({ companyPlaceId, competence }) {
  try {
    const { body } = await get({
      endpoint: 'fiscal/reinf/getr2099tosend',
      data: {
        companyPlaceId,
        competence
      },
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function verifyR2099ToSend({ companyPlaceId, competence }) {
  try {
    const { body } = await get({
      endpoint: 'fiscal/reinf/verifyr2099tosend',
      data: {
        companyPlaceId,
        competence
      },
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function saveR2060Parameters(data) {
  try {
    const { body } = await post({
      endpoint: 'fiscal/reinf/saver2060parameters',
      data,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function saveR2010Parameters(data) {
  try {
    const { body } = await post({
      endpoint: 'fiscal/reinf/saver2010parameters',
      data,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function saveR2020Parameters(data) {
  try {
    const { body } = await post({
      endpoint: 'fiscal/reinf/saver2020parameters',
      data,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function saveR2099Parameters(data) {
  try {
    const { body } = await post({
      endpoint: 'fiscal/reinf/saver2099parameters',
      data,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function generateAllFiles({ companyPlaceId, competence }) {
  try {
    const { body } = await post({
      endpoint: `fiscal/reinf/generateallfiles?companyPlaceId=${ companyPlaceId }&competence=${ competence }`,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getEconomicAtivities() {
  try {
    const { body } = await get({
      endpoint: 'fiscal/reinf/economicativities',
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getServiceClassifications() {
  try {
    const { body } = await get({
      endpoint: 'fiscal/reinf/serviceclassifications',
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function declineFiles({ companyPlaceId, competence }) {
  try {
    const { body } = await post({
      endpoint: `fiscal/reinf/declinefiles?companyPlaceId=${ companyPlaceId }&competence=${ competence }`,
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function downloadFilesByCompetenceAndCompany(data) {
  return down({
    endpoint: 'fiscal/reinf/downloadfilesbycompetenceandcompany',
    data,
    serializeConfig: {
      clean: true
    },
    showSnackbarProcessing: true
  })
}

async function transmitFilesByCompetenceAndCompany({ companyPlaceId, competence }) {
  try {
    const { body } = await post({
      endpoint: `fiscal/reinf/transmitfilesbycompetence?companyPlaceId=${ companyPlaceId }&competence=${ competence }`,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function downloadFileById({ fileId }) {
  return down({
    endpoint: 'fiscal/reinf/downloadfile',
    data: {
      fileId
    },
    showSnackbarProcessing: true
  })
}

async function downloadReceiptById({ fileId }) {
  return down({
    endpoint: 'fiscal/reinf/downloadreceiptfile',
    data: {
      fileId
    },
    showSnackbarProcessing: true
  })
}

async function transmitFileById({ fiscalReinfFileId }) {
  try {
    const { body } = await post({
      endpoint: `fiscal/reinf/transmitfile?fiscalReinfFileId=${ fiscalReinfFileId }`,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function reopenClosedCompetence({ companyPlaceId, competence }) {
  try {
    const { body } = await post({
      endpoint: `fiscal/reinf/generater2098?companyPlaceId=${ companyPlaceId }&competence=${ competence }`,
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function cancelFileEventSent({
  companyPlaceId,
  competence,
  fileId,
  fileLayout
}) {
  try {
    const { body } = await del({
      endpoint: `fiscal/reinf/generater9000?companyPlaceId=${ companyPlaceId }&competence=${ competence }&fileId=${ fileId }&fileLayout=${ fileLayout }`,
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function checkReopenStatus({ companyPlaceId, competence }) {
  try {
    const { body } = await get({
      endpoint: `fiscal/reinf/checkstatusr2098?companyPlaceId=${ companyPlaceId }&competence=${ competence }`,
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body
  } catch (e) {
    throw e
  }
}

async function checkCloseStatus({ companyPlaceId, competence }) {
  try {
    const { body } = await get({
      endpoint: `fiscal/reinf/checkstatusr2099?companyPlaceId=${ companyPlaceId }&competence=${ competence }`,
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body
  } catch (e) {
    throw e
  }
}

async function getReinfFilesLayouts({ companyPlaceId, competence }) {
  try {
    const { body } = await get({
      endpoint: 'fiscal/reinf/getreinffileslayouts',
      data: {
        companyPlaceId,
        competence
      },
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body
  } catch (e) {
    throw e
  }
}

export {
  getGeneratedOrSentFiles,
  getR2060ToSend,
  getR2010Parameters,
  getR2020Parameters,
  getR2099ToSend,
  verifyR2099ToSend,
  saveR2060Parameters,
  saveR2010Parameters,
  saveR2020Parameters,
  saveR2099Parameters,
  generateAllFiles,
  getEconomicAtivities,
  getServiceClassifications,
  declineFiles,
  downloadFilesByCompetenceAndCompany,
  transmitFilesByCompetenceAndCompany,
  downloadFileById,
  downloadReceiptById,
  transmitFileById,
  getReinfFilesLayouts,
  reopenClosedCompetence,
  cancelFileEventSent,
  checkCloseStatus,
  checkReopenStatus
}
