import { get } from '@syntesis/s-csharp-microservices'

async function getAvailableFinancialCollectionTypes(controls) {
  try {
    const { body } = await get({
      endpoint: 'Financial/FinancialCollectionTypes/GetAvailableFinancialCollectionTypes',
      data: controls
    })

    return body

  } catch (e) {
    throw e
  }
}

export { getAvailableFinancialCollectionTypes }
