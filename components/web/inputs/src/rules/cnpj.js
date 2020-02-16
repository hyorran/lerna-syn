import isEmpty from 'validator/lib/isEmpty'
import { isValid as isValidCnpj } from '@fnando/cnpj'

const cnpj = ({ value }) => {
  const response = {}

  if (isEmpty(value)) {
    return response
  }

  if (!isValidCnpj(value)) {
    response.isValid = false
    response.errorText = 'CNPJ inválido'
  }

  return response
}

export default cnpj
