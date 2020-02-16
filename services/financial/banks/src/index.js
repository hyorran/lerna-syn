import { del, get, post, put } from '@syntesis/s-csharp-microservices'
import map from 'lodash/map'
import toString from 'lodash/toString'
import moment from '@syntesis/s-bank-accounts'
import { momentBackDateFormat, momentBackDateTimeFormat } from '@syntesis/c-pickers/src/utils'

async function getBanksForSelect(controls) {
  try {
    const { body } = await get({
      endpoint: 'Financial/Banks/GetBanksForSelect',
      data: controls
    })

    if (!body.success) {
      throw body
    }

    return {
      ...body,
      response: map(body.response, item => ({
        ...item,
        value: toString(item.value)
      }))
    }

  } catch (e) {
    throw e
  }
}

async function getBank({ id }) {
  try {
    const { body } = await get({
      endpoint: `Financial/Banks/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function postBank(controls) {
  try {
    const { body } = await post({
      endpoint: 'Financial/Banks',
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

async function putBank(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Financial/Banks/${ id }`,
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

async function deleteBank({ id }) {
  try {
    const { body } = await del({
      endpoint: `Financial/Banks/${ id }`
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
  getBanksForSelect,
  getBank,
  postBank,
  putBank,
  deleteBank
}
