import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postLocals(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Locals',
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

async function putLocals(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Locals/${ id }`,
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

async function deleteLocals({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Locals/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLocals({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Locals/${ id }`
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
  postLocals,
  putLocals,
  deleteLocals,
  getLocals
}
