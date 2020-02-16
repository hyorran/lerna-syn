/* eslint-disable react/prop-types */
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import trim from 'lodash/trim'
import serialize from '@syntesis/c-functions/src/serialize'
import download from 'downloadjs'
import getLodash from 'lodash/get'

function getUrl({
  domain, endpoint, protocol, port
}) {
  let url = ''
  if (protocol) {
    url = `${ protocol }://`
  }
  if (domain) {
    url += domain
  }
  if (port) {
    url = `${ url }:${ port }`
  }

  return `${ url }${ endpoint }`
}

function getConfig({
  method, data = {}, headers = {}, fetchOptions = {}
}) {
  return {
    method,
    headers: !isEmpty(headers) ? headers : {},
    body: !isEmpty(data) ? data : undefined,
    ...fetchOptions
  }
}

async function request({
  domain, method, endpoint, data, headers, protocol, port, fetchOptions, json = true
}) {
  const url = getUrl({
    endpoint, protocol, port
  })
  const config = getConfig({
    domain, method, data, headers, fetchOptions
  })
  const response = await fetch(url, config)

  if (response.ok) {
    let { body } = response
    if (json) {
      try {
        body = await response.json()
      } catch (e) {
        console.warn("body response isn't a valid json")
      }
    }
    return {
      response,
      status: response.status,
      headers: response.headers,
      body
    }
  }
  throw response
}

async function get({
  domain, endpoint, data, headers, protocol, port, fetchOptions, serializeConfig, json
}) {
  if (data) {
    endpoint += `?${ serialize(data, serializeConfig) }`
  }
  return request({
    domain,
    fetchOptions,
    method: 'GET',
    endpoint,
    data: undefined,
    headers,
    protocol,
    port,
    json
  })
}

async function post({
  domain, endpoint, data, headers, protocol, port, fetchOptions, json
}) {
  if (isObject(data)) {
    data = JSON.stringify(data)
  }
  return request({
    domain,
    fetchOptions,
    method: 'POST',
    endpoint,
    data,
    headers,
    protocol,
    port,
    json
  })
}

async function put({
  domain, endpoint, data, headers, protocol, port, fetchOptions, json
}) {
  if (data) {
    data = JSON.stringify(data)
  }
  return request({
    domain,
    fetchOptions,
    method: 'PUT',
    endpoint,
    data,
    headers,
    protocol,
    port,
    json
  })
}

async function del({
  domain, endpoint, data, headers, protocol, port, fetchOptions, json
}) {
  if (data) {
    data = JSON.stringify(data)
  }
  return request({
    domain,
    fetchOptions,
    method: 'DELETE',
    endpoint,
    data,
    headers,
    protocol,
    port,
    json
  })
}

async function down(methodConfig = {}, method = get) {
  const { response } = await method({
    ...methodConfig,
    json: false
  })

  try {
    const contentType = response.headers.get('content-type')
    let filename = response.headers.get('content-disposition')
    filename = filename.split(';')
    filename = getLodash(filename, '[1]').split('filename=')
    filename = getLodash(filename, '[1]').split(';')
    filename = getLodash(filename, '[0]')
    filename = trim(filename)
    const blob = await response.blob()
    return download(blob, filename, contentType)
  } catch (e) {
    console.error('download failed', e)
    throw e
  }
}

export {
  get,
  post,
  put,
  del,
  down
}
