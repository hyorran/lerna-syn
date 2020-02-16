import { get } from '@syntesis/s-csharp-microservices'

async function hasAccountingIntegration(controls) {
  try {
    const { body } = await get({
      endpoint: 'Financial/FinancersNatures/HasAccountingIntegration',
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

export {
  hasAccountingIntegration
}
