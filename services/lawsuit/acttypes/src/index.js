import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postActtypes(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Acttypes',
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

async function putActtypes(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Acttypes/${ id }`,
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

async function deleteActtypes({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Acttypes/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getActtypes({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Acttypes/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getActtypesForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Lawsuit/Acttypes/GetActtypesForSelect'
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
  postActtypes,
  putActtypes,
  deleteActtypes,
  getActtypes,
  getActtypesForSelect
}
