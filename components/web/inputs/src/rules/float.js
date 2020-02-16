import isFloat from 'validator/lib/isFloat'
import isEmpty from 'validator/lib/isEmpty'

const number = ({ value }) => {
  const response = {}

  if (isEmpty(value)) {
    return response
  }

  if (!isFloat(value, { locale: 'pt-BR' })) {
    response.isValid = false
    response.errorText = 'Campo decimal'
  }

  return response
}

export default number
