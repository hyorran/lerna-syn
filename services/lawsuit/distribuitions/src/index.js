import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postDistribuitions(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Distribuitions',
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

async function putDistribuitions(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Distribuitions/${ id }`,
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

async function deleteDistribuitions({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Distribuitions/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getDistribuitions({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Distribuitions/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getDistribuitionsForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Lawsuit/Distribuitions/GetDistribuitionsForSelect'
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
  postDistribuitions,
  putDistribuitions,
  deleteDistribuitions,
  getDistribuitions,
  getDistribuitionsForSelect
}
