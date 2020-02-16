import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postLawsuitExpedientNotes(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/LawsuitExpedientNotes',
      data: controls
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function putLawsuitExpedientNotes(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/LawsuitExpedientNotes/${ id }`,
      data: controls
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function deleteLawsuitExpedientNotes({ id, solicitationRoutingMotivesId }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/LawsuitExpedientNotes/${ id }`,
      data: solicitationRoutingMotivesId
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLawsuitExpedientNotes({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/LawsuitExpedientNotes/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function archiveLawsuitExpedientNotes(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/LawsuitExpedientNotes/Archive/${ id }`,
      data: controls
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function hasPublicationIntegrationLawsuitExpedientNotes() {
  try {
    const { body } = await get({
      endpoint: 'Lawsuit/LawsuitExpedientNotes/HasPublicationIntegration'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getPublicationsIntegrationLawsuitExpedientNotes(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/LawsuitExpedientNotes/GetPublicationsIntegration',
      data: controls
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function linkProcessLawsuitExpedientNotes(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/LawsuitExpedientNotes/LinkProcess/${ id }`,
      data: controls
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function reviewLawsuitExpedientNotes({ id }) {
  try {
    const { body } = await put({
      endpoint: `Lawsuit/LawsuitExpedientNotes/Review/${ id }`
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
  postLawsuitExpedientNotes,
  putLawsuitExpedientNotes,
  deleteLawsuitExpedientNotes,
  getLawsuitExpedientNotes,
  hasPublicationIntegrationLawsuitExpedientNotes,
  getPublicationsIntegrationLawsuitExpedientNotes,
  archiveLawsuitExpedientNotes,
  linkProcessLawsuitExpedientNotes,
  reviewLawsuitExpedientNotes
}
