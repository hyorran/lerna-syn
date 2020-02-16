import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postModules(controls) {
  try {
    const { body } = await post({
      endpoint: 'Suite/Modules',
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

async function putModules(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Suite/Modules/${ id }`,
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

async function deleteModules({ id }) {
  try {
    const { body } = await del({
      endpoint: `Suite/Modules/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getModules({ id }) {
  try {
    const { body } = await get({
      endpoint: `Suite/Modules/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getModulesForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Suite/Modules/GetModulesForSelect'
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
  postModules,
  putModules,
  deleteModules,
  getModules,
  getModulesForSelect
}
