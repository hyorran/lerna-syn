import camelCase from 'lodash/camelCase'

export const initSnackbarByType = (type, message = '', code) => {

  // Mapeia type retornado da API
  let initSnackbar
  switch (camelCase(type)) {
    case 'success':
      initSnackbar = window.snackbar.success
      break
    case 'warn':
      initSnackbar = window.snackbar.warn
      break
    case 'error':
      initSnackbar = window.snackbar.error
      break
    case 'info':
      initSnackbar = window.snackbar.info
      break
    default:
      initSnackbar = window.snackbar.default
      break
  }

  if (code) {
    message = `#${ code }: ${ message }`
  }

  return initSnackbar(message)
}
