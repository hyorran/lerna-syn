import get from 'lodash/get'
import lowerCase from 'lodash/lowerCase'
import isBoolean from 'lodash/isBoolean'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import indexOf from 'lodash/indexOf'
import moment from 'moment/moment'
import {
  momentFriendlyDateFormat,
  momentFriendlyDateTimeFormat,
  momentFriendlyTimeFormat
} from '@syntesis/c-pickers/src/utils'
import stringIsTrue from './stringIsTrue'

const stringifyValue = (config) => {
  let value = config
  let comparator = value

  if (isArray(config)) {
    return config
  }

  if (isObject(config)) {
    if (config.rules) {
      if (indexOf(config.rules, 'date') > -1) {
        return moment(config.value).format(momentFriendlyDateFormat)
      } else if (indexOf(config.rules, 'datetime') > -1) {
        return moment(config.value).format(momentFriendlyDateTimeFormat)
      } else if (indexOf(config.rules, 'time') > -1) {
        return moment(config.value).format(momentFriendlyTimeFormat)
      }
    }

    if (config.value !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      value = config.value
    } else {
      const { item, key } = config
      value = get(item, key)
    }
    comparator = lowerCase(value)

  }

  if (comparator === 'true' || comparator === 'false' || isBoolean(value)) {
    if (stringIsTrue(comparator) || stringIsTrue(value)) {
      return 'Sim'
    }
    return 'Não'
  }

  return value
}

export default stringifyValue
