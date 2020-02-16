import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postAssignments(controls) {
  try {
    const { body } = await post({
      endpoint: 'Projects/Assignments',
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

async function putAssignments(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Projects/Assignments/${ id }`,
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

async function deleteAssignments({ id }) {
  try {
    const { body } = await del({
      endpoint: `Projects/Assignments/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getAssignments({ id }) {
  try {
    const { body } = await get({
      endpoint: `Projects/Assignments/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function cancelAssignments({ id, solicitationRoutingMotivesId }) {
  try {
    const { body } = await put({
      endpoint: `Projects/Assignments/Cancel/${ id }`,
      data: solicitationRoutingMotivesId
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getUsers() {
  try {
    const { body } = await get({
      endpoint: 'Suite/Users/GetUsersForSelect'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function forwardAssignment(controls) {
  try {
    const { id } = controls;
    const { body } = await put({
      endpoint: `Projects/Assignments/ForwardAssignment/${ id }`,
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
  postAssignments,
  putAssignments,
  deleteAssignments,
  getAssignments,
  cancelAssignments,
  getUsers,
  forwardAssignment
}
