import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

const serialize = (obj, config = {}) => {
  if (!isEmpty(obj)) {
    const response = map(obj, (value, key) => `${ key }=${ encodeURIComponent(JSON.stringify(value)) }`)
    const str = response.join('&')
    if (config.clean) {
      return str.split('%22').join('')
    }
    return str
  }
  return ''
}

export default serialize
