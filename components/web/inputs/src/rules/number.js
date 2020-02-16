import isNumeric from 'validator/lib/isNumeric'
import isEmpty from 'validator/lib/isEmpty'

const number = ({ value }) => {
  const response = {}

  if (isEmpty(value)) {
    return response
  }

  if (!isNumeric(value)) {
    response.isValid = false
    response.errorText = 'Campo numérico'
  }

  return response
}

export default number
