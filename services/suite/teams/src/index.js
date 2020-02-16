import { get } from '@syntesis/s-csharp-microservices'

async function getTeamsForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Suite/Teams/GetTeamsForSelect'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

export { getTeamsForSelect }
