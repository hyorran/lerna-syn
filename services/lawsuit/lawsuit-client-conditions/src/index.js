import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postLawsuitClientConditions(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/LawsuitClientConditions',
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

async function putLawsuitClientConditions(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/LawsuitClientConditions/${ id }`,
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

async function deleteLawsuitClientConditions({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/LawsuitClientConditions/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLawsuitClientConditions({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/LawsuitClientConditions/${ id }`
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
  postLawsuitClientConditions,
  putLawsuitClientConditions,
  deleteLawsuitClientConditions,
  getLawsuitClientConditions
}
