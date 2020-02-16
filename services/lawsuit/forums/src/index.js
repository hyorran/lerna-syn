import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postForums(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Forums',
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

async function putForums(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Forums/${ id }`,
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

async function deleteForums({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Forums/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getForums({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Forums/${ id }`
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
  postForums,
  putForums,
  deleteForums,
  getForums
}
