import { get } from '@syntesis/s-csharp-microservices'

async function getLawsuitsOccurrencesForSelect(lawsuitId) {
  try {
    const { body } = await get({
      endpoint: 'Lawsuit/LawsuitsOccurrences/GetLawsuitsOccurrencesForSelect',
      data: { lawsuitId }
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

export { getLawsuitsOccurrencesForSelect }
