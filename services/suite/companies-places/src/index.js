import { get } from '@syntesis/s-csharp-microservices'
import map from 'lodash/map'
import toString from 'lodash/toString'

async function getCompaniesPlacesForSelect(controls) {
  try {
    const { body } = await get({
      endpoint: 'Suite/CompaniesPlaces/GetCompaniesPlacesForSelect',
      data: controls
    })

    if (!body.success) {
      throw body
    }

    return {
      ...body,
      response: map(body.response, item => ({
        ...item,
        value: toString(item.value)
      }))
    }

  } catch (e) {
    throw e
  }
}

export { getCompaniesPlacesForSelect }
