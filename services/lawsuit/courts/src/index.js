import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postCourts(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Courts',
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

async function putCourts(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Courts/${ id }`,
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

async function deleteCourts({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Courts/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getCourts({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Courts/${ id }`
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
  postCourts,
  putCourts,
  deleteCourts,
  getCourts
}
