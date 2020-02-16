import { get } from '@syntesis/s-csharp-microservices'

async function getLawsuitsForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Lawsuit/Lawsuits/GetLawsuitsForSelect'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

export { getLawsuitsForSelect }
