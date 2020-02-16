import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postLawsuitMotives(controls) {
  try {
    const { body } = await post({
      endpoint: 'CRM/CrmMotives',
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

async function putLawsuitMotives(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `CRM/CrmMotives/${ id }`,
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

async function deleteLawsuitMotives({ id }) {
  try {
    const { body } = await del({
      endpoint: `CRM/CrmMotives/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLawsuitMotives({ id }) {
  try {
    const { body } = await get({
      endpoint: `CRM/CrmMotives/${ id }`
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
  postLawsuitMotives,
  putLawsuitMotives,
  deleteLawsuitMotives,
  getLawsuitMotives
}
