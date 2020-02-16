import { get } from '@syntesis/s-csharp-microservices'

async function getOpenTitles(controls) {
  try {
    const { body } = await get({
      endpoint: 'Financial/ReceivableTitle/GetOpenTitles',
      data: controls
    })

    return body

  } catch (e) {
    throw e
  }
}

export { getOpenTitles }
