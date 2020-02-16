import isEmpty from 'lodash/isEmpty'
import { get } from '@syntesis/s-csharp-microservices'

async function getIndicators({ slugs = [], filter }) {
  try {
    const configs = {}
    if (!isEmpty(filter)) {
      configs.Filter = {
        Connector: 'And',
        Values: filter
      }
    }
    const { body } = await get({
      endpoint: 'indicators/indicator',
      data: {
        Slugs: slugs,
        ...configs
      }
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

export { getIndicators }
