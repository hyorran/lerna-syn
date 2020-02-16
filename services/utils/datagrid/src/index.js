import omitBy from 'lodash/omitBy'
import { get } from '@syntesis/s-csharp-microservices'
import map from 'lodash/map'
import isObject from 'lodash/isObject'

async function getClientSideData({ endpoint, data }) {
  try {
    const { body } = await get({
      endpoint,
      data,
      showSnackbarProcessing: true
    })

    if (endpoint.substring(0, 4) === 'http') {
      return {
        data: body
      }
    }

    const { response } = body

    if (!body.success) {
      throw new Error('api returns with error')
    }

    return {
      data: response
    }

  } catch (e) {
    throw e
  }
}

async function getServerSideData(configs) {
  try {
    const {
      data,
      endpoint,
      ...otherConfigs
    } = configs

    const params = map(data, (value, key) => {
      if (isObject(value)) {
        return `${ key }=${ encodeURIComponent(JSON.stringify(value)) }`
      }
      return `${ key }=${ value }`
    })

    const str = params.join('&')

    const { body } = await get({
      ...otherConfigs,
      endpoint: `${ endpoint }?${ str }`,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw new Error('api returns with error')
    }

    const { response } = body
    const {
      data: responseData,
      totalizers
    } = response
    const pagination = omitBy(response, (_, key) => key === 'data')

    return {
      data: responseData,
      pagination,
      totalizers
    }

  } catch (e) {
    throw e
  }
}

export {
  getClientSideData,
  getServerSideData
}
