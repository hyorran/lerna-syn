import { get } from '@syntesis/s-csharp-microservices'

async function getSolicitationRoutingMotivesForSelect(controls) {
  try {
    const { body } = await get({
      endpoint: 'Suite/SolicitationRoutingMotives/GetSolicitationRoutingMotivesForSelect',
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

export { getSolicitationRoutingMotivesForSelect }
