import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postActobjects(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Actobjects',
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

async function putActobjects(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Actobjects/${ id }`,
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

async function deleteActobjects({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Actobjects/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getActobjects({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Actobjects/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getActobjectsForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Lawsuit/Actobjects/GetActobjectsForSelect'
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
  postActobjects,
  putActobjects,
  deleteActobjects,
  getActobjects,
  getActobjectsForSelect
}
