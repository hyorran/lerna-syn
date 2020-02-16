import { get } from '@syntesis/s-csharp-microservices'

async function getSentOperations({ id }) {
  try {
    const { body } = await get({
      endpoint: `synpaygw/sentoperations/getdata/${ id }`
    })

    return body

  } catch (e) {
    throw e
  }
}

async function getStatus() {
  try {
    const { body } = await get({
      endpoint: 'synpaygw/sentoperations/getstatus'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getOperationTypes() {
  try {
    const { body } = await get({
      endpoint: 'synpaygw/sentoperations/getoperationtypes'
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
  getSentOperations,
  getStatus,
  getOperationTypes
}
