import { get } from '@syntesis/s-csharp-microservices'

async function getCompaniesConfiguredToOperation(controls) {
  try {
    const { body } = await get({
      endpoint: 'SynPayGw/PgwCompanyPlaces/GetCompaniesConfiguredToOperation',
      data: controls
    })

    return body

  } catch (e) {
    throw e
  }
}

export { getCompaniesConfiguredToOperation }
