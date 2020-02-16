import { del, get, put, post } from '@syntesis/s-csharp-microservices'
import map from 'lodash/map'
import toString from 'lodash/toString'
import moment from 'moment/moment'
import { momentBackDateTimeFormat, momentBackDateFormat } from '@syntesis/c-pickers/src/utils'

async function getBankAccountsForSelect(controls) {
  try {
    const { body } = await get({
      endpoint: 'Financial/BankAccounts/GetBankAccountsForSelect',
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

async function getAccountingInfos(controls) {
  try {
    const { body } = await get({
      endpoint: 'Financial/BankAccounts/GetAccountingInfos',
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

async function getBankAccount({ id }) {
  try {
    const { body } = await get({
      endpoint: `Financial/BankAccounts/${ id }`
    })

    if (!body.success) {
      throw body
    }

    const { response: item } = body
    return {
      ...body,
      response: {
        ...item,
        date: moment(item.date, momentBackDateTimeFormat).format(momentBackDateFormat)
      }
    }

  } catch (e) {
    throw e
  }
}

async function getBankAccountParameters() {
  try {
    const { body } = await get({
      endpoint: 'Financial/BankAccounts/parameters'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function postBankAccount(controls) {
  try {
    const { body } = await post({
      endpoint: 'Financial/BankAccounts',
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

async function putBankAccount(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Financial/BankAccounts/${ id }`,
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

async function deleteBankAccount({ id }) {
  try {
    const { body } = await del({
      endpoint: `Financial/BankAccounts/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getAccountAccountingForSelect(controls) {
  try {
    const { body } = await get({
      endpoint: 'Financial/CompanyAccountingAccounts/getAccountAccountingForSelect',
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

export {
  getBankAccountsForSelect,
  getAccountingInfos,
  getBankAccount,
  getBankAccountParameters,
  postBankAccount,
  putBankAccount,
  deleteBankAccount,
  getAccountAccountingForSelect
}
