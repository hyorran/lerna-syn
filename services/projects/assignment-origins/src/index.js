import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postAssignmentOrigins(controls) {
  try {
    const { body } = await post({
      endpoint: 'Projects/AssignmentOrigins',
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

async function putAssignmentOrigins(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Projects/AssignmentOrigins/${ id }`,
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

async function deleteAssignmentOrigins({ id }) {
  try {
    const { body } = await del({
      endpoint: `Projects/AssignmentOrigins/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getAssignmentOrigins({ id }) {
  try {
    const { body } = await get({
      endpoint: `Projects/AssignmentOrigins/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getAssignmentOriginsForSelect(controls = null) {
  try {
    const { body } = await get({
      endpoint: 'Projects/AssignmentOrigins/GetAssignmentOriginsForSelect',
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

export {
  postAssignmentOrigins,
  putAssignmentOrigins,
  deleteAssignmentOrigins,
  getAssignmentOrigins,
  getAssignmentOriginsForSelect
}
