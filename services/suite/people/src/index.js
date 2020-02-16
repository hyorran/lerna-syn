import { get } from '@syntesis/s-csharp-microservices'

async function getPeopleForSelect(controls) {
  try {
    const { body } = await get({
      endpoint: 'Suite/People/GetPeopleForSelect',
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

async function getCauseLawyerForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Suite/People/GetCauseLawyerForSelect'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getOppositeLawyerForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Suite/People/GetOppositeLawyerForSelect'
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
  getPeopleForSelect,
  getCauseLawyerForSelect,
  getOppositeLawyerForSelect
}
