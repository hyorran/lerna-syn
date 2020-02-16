import isArray from 'lodash/isArray'
import lodashIsEmpty from 'lodash/isEmpty'
import indexOf from 'lodash/indexOf'
import htmlToText from '@syntesis/c-functions/src/htmlToText'
import isEmpty from 'validator/lib/isEmpty'

const required = ({ value = '', rules = [] }) => {
  const getErrorValidate = () => ({
    isValid: false,
    errorText: 'Campo obrigatório'
  })

  const response = {}

  if (!isArray(value)) {
    if (isEmpty(value)) {
      return {
        ...response,
        ...getErrorValidate()
      }
    }
  }

  if (indexOf(rules, 'html') > -1) {
    value = htmlToText(value)
  }

  if (lodashIsEmpty(value)) {
    return {
      ...response,
      ...getErrorValidate()
    }
  }

  return response
}

export default required
