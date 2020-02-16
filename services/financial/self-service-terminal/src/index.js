import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postSelfServiceTerminal(controls) {
  try {
    const { body } = await post({
      endpoint: 'Financial/FinancialSalePoints',
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

async function putSelfServiceTerminal(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Financial/FinancialSalePoints/${ id }`,
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

async function deleteSelfServiceTerminal({ id }) {
  try {
    const { body } = await del({
      endpoint: `Financial/FinancialSalePoints/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getSelfServiceTerminal({ id }) {
  try {
    const { body } = await get({
      endpoint: `Financial/FinancialSalePoints/${ id }`
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
  postSelfServiceTerminal,
  putSelfServiceTerminal,
  deleteSelfServiceTerminal,
  getSelfServiceTerminal
}
