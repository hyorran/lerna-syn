import { post } from '@syntesis/s-csharp-microservices'

async function postPresentialPayment(configs = {}) {
  try {
    const { body } = await post({
      endpoint: 'financial/receivabletitle/viapaygw',
      ...configs
    })

    return body

  } catch (e) {
    throw e
  }
}

export { postPresentialPayment }
