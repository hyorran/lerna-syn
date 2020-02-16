import { get } from '@syntesis/s-csharp-microservices'

async function getPriorityForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Selects/Select/GetPriorityForSelect'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getNotifyForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Selects/Select/GetNotifyForSelect'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getNotificationTypeForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Selects/Select/GetNotificationTypeForSelect'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getBriefcasesTypeForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Selects/Select/GetBriefcasesTypeForSelect'
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
  getPriorityForSelect,
  getNotifyForSelect,
  getNotificationTypeForSelect,
  getBriefcasesTypeForSelect
}
