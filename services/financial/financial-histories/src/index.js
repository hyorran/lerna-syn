import { get } from '@syntesis/s-csharp-microservices'

async function getFinancialHistoriesForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Financial/FinancialHistories/GetFinancialHistoriesForSelect'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

export { getFinancialHistoriesForSelect }
