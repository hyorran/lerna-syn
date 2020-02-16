import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postResources(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Resources',
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

async function putResources(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Resources/${ id }`,
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

async function deleteResources({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Resources/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getResources({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Resources/${ id }`
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
  postResources,
  putResources,
  deleteResources,
  getResources
}
