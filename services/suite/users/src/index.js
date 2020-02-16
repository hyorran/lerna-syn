import { get } from '@syntesis/s-csharp-microservices'

async function getUsersForSelect() {
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

export { getUsersForSelect }
