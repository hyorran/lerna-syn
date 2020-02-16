import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postAreas(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Areas',
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

async function putAreas(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Areas/${ id }`,
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

async function deleteAreas({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Areas/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getAreas({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Areas/${ id }`
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
  postAreas,
  putAreas,
  deleteAreas,
  getAreas
}
