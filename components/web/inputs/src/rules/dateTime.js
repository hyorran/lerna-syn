import isEmpty from 'validator/lib/isEmpty'
import moment from 'moment/moment'
import { momentBackDateTimeFormat } from '@syntesis/c-pickers/src/utils'

const dateTime = ({ value }) => {
  const response = {}

  if (isEmpty(value)) {
    return response
  }

  if (!moment(value, momentBackDateTimeFormat, true).isValid()) {
    response.isValid = false
    response.errorText = 'Insira uma data e horário válidos'
  }

  return response
}

export default dateTime
