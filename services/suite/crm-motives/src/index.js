import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postCrmMotives(controls) {
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

async function putCrmMotives(controls) {
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

async function deleteCrmMotives({ id }) {
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

async function getCrmMotives({ id }) {
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
  postCrmMotives,
  putCrmMotives,
  deleteCrmMotives,
  getCrmMotives
}
