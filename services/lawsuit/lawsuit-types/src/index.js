import getLodash from 'lodash/get'

import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postLawsuitTypes(controls) {
  try {
    const { body } = await post({
      endpoint: 'lawsuit/LawsuitTypes',
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

async function putLawsuitTypes(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `lawsuit/LawsuitTypes/${ id }`,
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

async function deleteLawsuitTypes({ id }) {
  try {
    const { body } = await del({
      endpoint: `lawsuit/LawsuitTypes/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLawsuitTypes({ id }) {
  try {
    const { body } = await get({
      endpoint: `lawsuit/LawsuitTypes/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLawsuitTypesConfigurationControls() {
  try {
    const { body } = await get({
      endpoint: 'lawsuit/lawsuittypes/parameters'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLawsuitTypesForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Lawsuit/LawsuitTypes/GetLawsuitTypesForSelect'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getConfigurationById(id) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/LawsuitTypes/GetConfigurationById/${ id }`
    })

    if (!body.success) {
      throw body
    }

    const response = JSON.parse(getLodash(body, 'response'))

    return {
      ...body,
      response
    }

  } catch (e) {
    throw e
  }
}

export {
  postLawsuitTypes,
  putLawsuitTypes,
  deleteLawsuitTypes,
  getLawsuitTypes,
  getLawsuitTypesConfigurationControls,
  getLawsuitTypesForSelect,
  getConfigurationById
}
