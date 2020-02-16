import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postDecisions(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Decisions',
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

async function putDecisions(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Decisions/${ id }`,
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

async function deleteDecisions({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Decisions/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getDecisions({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Decisions/${ id }`
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
  postDecisions,
  putDecisions,
  deleteDecisions,
  getDecisions
}
