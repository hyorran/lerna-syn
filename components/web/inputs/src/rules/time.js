import isEmpty from 'validator/lib/isEmpty'
import moment from 'moment/moment'
import { momentBackTimeFormat } from '@syntesis/c-pickers/src/utils'

const time = ({ value }) => {
  const response = {}

  if (isEmpty(value)) {
    return response
  }

  if (!moment(value, momentBackTimeFormat, true).isValid()) {
    response.isValid = false
    response.errorText = 'Insira uma horário válido'
  }

  return response
}

export default time
