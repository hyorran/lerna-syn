import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postOccurrences(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Occurrences',
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

async function putOccurrences(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Occurrences/${ id }`,
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

async function deleteOccurrences({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Occurrences/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getOccurrences({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Occurrences/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getOccurrencesForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Lawsuit/Occurrences/GetOccurrencesForSelect'
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
  postOccurrences,
  putOccurrences,
  deleteOccurrences,
  getOccurrences,
  getOccurrencesForSelect
}
