import { get } from '@syntesis/s-csharp-microservices'

async function getPlaces() {
  try {
    const { body } = await get({
      endpoint: 'Financial/Cobilling/GetPlaces'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

export { getPlaces }
