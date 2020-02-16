import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postBriefcases(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Briefcases',
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

async function putBriefcases(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Briefcases/${ id }`,
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

async function deleteBriefcases({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Briefcases/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getBriefcases({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Briefcases/${ id }`
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
  postBriefcases,
  putBriefcases,
  deleteBriefcases,
  getBriefcases
}
