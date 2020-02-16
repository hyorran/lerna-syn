import isEmpty from 'validator/lib/isEmpty'
import { isValid as isValidCpf } from '@fnando/cpf'
import { isValid as isValidCnpj } from '@fnando/cnpj'

const cpfCnpj = ({ value }) => {
  const response = {}

  if (isEmpty(value)) {
    return response
  }

  if (value.length <= 11) {
    if (!isValidCpf(value)) {
      response.isValid = false
      response.errorText = 'CPF inválido'
    }
  } else if (!isValidCnpj(value)) {
    response.isValid = false
    response.errorText = 'CNPJ inválido'
  }


  return response
}

export default cpfCnpj

export const cpfCnpjPre = ({ value }) => {
  const response = {}

  if (value.length > 14) {
    response.isValid = false
  }

  return response
}
