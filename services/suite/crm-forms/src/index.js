import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postCrmForms(controls) {
  try {
    const { body } = await post({
      endpoint: 'CRM/CrmForms',
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

async function putCrmForms(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `CRM/CrmForms/${ id }`,
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

async function deleteCrmForms({ id }) {
  try {
    const { body } = await del({
      endpoint: `CRM/CrmForms/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getCrmForms({ id }) {
  try {
    const { body } = await get({
      endpoint: `CRM/CrmForms/${ id }`
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
  postCrmForms,
  putCrmForms,
  deleteCrmForms,
  getCrmForms
}
