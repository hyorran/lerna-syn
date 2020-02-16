import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import mapValues from 'lodash/mapValues'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import find from 'lodash/find'
import required from './required'
import number from './number'
import date from './date'
import dateTime from './dateTime'
import time from './time'
import monthYear from './monthYear'
import cpfCnpj, { cpfCnpjPre } from './cpfCnpj'
import cnpj from './cnpj'

const applyRulesAndValidate = (rules, value, showError = false) => {
  let response = {
    isValid: true,
    errorText: '',
    showError
  }

  if (isObject(value) && !isArray(value)) {
    // provavelmente pode bugar a validação de repeaters (isArray)
    const newValues = mapValues(value, (item) => {
      const itemRules = get(item, 'rules')
      const itemValue = get(item, 'value', '')
      return {
        ...item,
        ...applyRulesAndValidate(itemRules, itemValue, showError)
      }
    })

    response = {
      ...response,
      value: newValues
    }

    const failed = find(newValues, { isValid: false })
    if (!isEmpty(failed)) {
      response = {
        ...response,
        isValid: get(failed, 'isValid'),
        errorText: get(failed, 'errorText')
      }
    }
  } else if (isArray(rules)) {
    forEach(rules, (rule) => {
      switch (rule) {
        case 'required':
          response = {
            ...response,
            ...required({ value, rules })
          }
          break

        case 'number':
          response = {
            ...response,
            ...number({ value })
          }
          break

        case 'cpfCnpj':
          response = {
            ...response,
            ...cpfCnpj({ value })
          }
          break

        case 'cnpj':
          response = {
            ...response,
            ...cnpj({ value })
          }
          break

        case 'date':
          response = {
            ...response,
            ...date({ value })
          }
          break

        case 'dateTime':
          response = {
            ...response,
            ...dateTime({ value })
          }
          break

        case 'time':
          response = {
            ...response,
            ...time({ value })
          }
          break


        case 'monthYear':
          response = {
            ...response,
            ...monthYear({ value })
          }
          break

        default:
          break
      }
    })
  }

  return response
}

export default applyRulesAndValidate

export const confirmPreRules = (rules, value) => {
  let response = {
    isValid: true,
    errorText: ''
  }

  if (isArray(rules)) {
    rules.forEach((rule) => {
      switch (rule) {
        case 'cpfCnpj':
          response = {
            ...response,
            ...cpfCnpjPre({ value })
          }
          break

        default:
          break
      }
    })
  }

  return response
}
