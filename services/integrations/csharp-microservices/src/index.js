/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import isEmpty from 'lodash/isEmpty'
import forEach from 'lodash/forEach'
import auth from './store/auth'
import * as HttpService from '@syntesis/s-http'
import { initSnackbarByType } from '@syntesis/c-snackbars/src/utils'

function getUrl({
  endpoint, apiVersion = 1, protocol = 'http', port = 45701
}) {

  const host = auth.getHost
  let url = ''

  if (host.split('://').length > 1) {
    // host já tem protocolo concatenado
    url = host
  } else {
    url = `${ protocol }://${ host }`
  }

  if (isEmpty(host.split(':')[2]) && port) {
    // se o host não possuir porta na string, e tiver porta setada
    url += `:${ port }`
  }

  if (apiVersion) {
    url = `${ url }/api/v${ apiVersion }`
  }

  return `${ url }/${ endpoint }`
}

function getHeaders({ headers = {}, guest = false }) {
  if (!guest && auth.isAuthenticated) {
    headers = {
      ...headers,
      Authorization: `Bearer ${ auth.token }`
    }
  }
  return {
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    ...headers
  }
}

async function request(
  service,
  {
    endpoint,
    data,
    headers,
    apiVersion,
    protocol,
    port,
    fetchOptions,
    guest,
    serializeConfig,
    json,
    showSnackbarProcessing = false
  }
) {
  let snackbarProcessing = {}
  let snackbarProcessingInterval = null

  const stopSnack = () => {
    clearInterval(snackbarProcessingInterval)
    if (showSnackbarProcessing && !isEmpty(snackbarProcessing)) {
      setTimeout(snackbarProcessing.close, 200)
    }
  }

  try {
    /*
    * caso a rota seja autenticada e o usuário está logado mas seu token já expirou,
    * pegamos um novo token com a API para prosseguir com a solicitação original
    * */
    if (!guest && auth.isAuthenticated && auth.hasExpired()) {
      await auth.refreshToken()
    }

    const methodOptions = {
      endpoint: getUrl({
        endpoint,
        apiVersion,
        protocol,
        port
      }),
      headers: getHeaders({
        headers,
        guest
      }),
      data,
      fetchOptions,
      serializeConfig,
      json
    }

    const env = process.env.REACT_APP_CONTEXT

    snackbarProcessingInterval = setTimeout(() => {
      if (showSnackbarProcessing && env === 'web/enigma') {
        snackbarProcessing = window.snackbar.info('Aguarde. Processando...', {
          closeOnClick: false,
          persist: true,
          preventDuplicate: true
        })
      }
    }, 500)

    const response = await service(methodOptions)
    stopSnack()

    if (response) {
      const { body } = response

      const { messages, success } = body

      if (success !== undefined) {
        // mostra snackbars de resposta se tiver pelo menos uma mensagem vinda da API
        if (!isEmpty(messages)) {
          if (env === 'web/enigma') {
            forEach(messages, (content) => {
              const {
                type,
                message,
                code
              } = content

              initSnackbarByType(type, message, code)
            })
          }
        }

        if (!success && !guest) {
          throw body
        }
      }
    }

    return response
  } catch (e) {
    stopSnack()
    // logout user if status = not authorized
    if (e.status === 401) {
      if (
        process.env.NODE_ENV !== 'development' &&
        process.env.REACT_APP_CONTEXT === 'web/enigma'
      ) {
        window.location.href = '/Users/logout'
      }
    }
    throw e
  }
}

async function get({
  endpoint, data, headers, apiVersion, protocol, port, fetchOptions, guest, serializeConfig, json, showSnackbarProcessing
}) {
  return request(
    HttpService.get,
    {
      endpoint,
      data,
      headers,
      apiVersion,
      protocol,
      port,
      fetchOptions,
      guest,
      serializeConfig,
      json,
      showSnackbarProcessing
    }
  )
}

async function post({
  endpoint, data, headers, apiVersion, protocol, port, fetchOptions, guest, json, showSnackbarProcessing
}) {
  return request(
    HttpService.post,
    {
      endpoint,
      data,
      headers,
      apiVersion,
      protocol,
      port,
      fetchOptions,
      guest,
      json,
      showSnackbarProcessing
    }
  )
}

async function put({
  endpoint, data, headers, apiVersion, protocol, port, fetchOptions, guest, json, showSnackbarProcessing
}) {
  return request(
    HttpService.put,
    {
      endpoint,
      data,
      headers,
      apiVersion,
      protocol,
      port,
      fetchOptions,
      guest,
      json,
      showSnackbarProcessing
    }
  )
}

async function del({
  endpoint, data, headers, apiVersion, protocol, port, fetchOptions, guest, json, showSnackbarProcessing
}) {
  return request(
    HttpService.del,
    {
      endpoint,
      data,
      headers,
      apiVersion,
      protocol,
      port,
      fetchOptions,
      guest,
      json,
      showSnackbarProcessing
    }
  )
}

async function down(methodConfig, method = get) {
  return HttpService.down(methodConfig, method)
}

export {
  get,
  post,
  put,
  del,
  down,
  auth
}
