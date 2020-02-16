const getValueFromUrlParam = (search, parameter) => {
  let params = search.split('?')
  params = params.length > 1 ? params[1] : ''
  return params.split('&')
    .map(param => param.split('='))
    .filter(([name]) => name === parameter)
    .map(([_, value]) => value) // eslint-disable-line no-unused-vars
}

export default getValueFromUrlParam
