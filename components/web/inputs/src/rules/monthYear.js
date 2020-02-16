import isEmpty from 'validator/lib/isEmpty'
import moment from 'moment/moment'
import { momentBackMonthYearFormat } from '@syntesis/c-pickers/src/utils'

const date = ({ value }) => {
  const response = {}

  if (isEmpty(value)) {
    return response
  }

  if (!moment(value, momentBackMonthYearFormat, true).isValid()) {
    response.isValid = false
    response.errorText = 'Insira uma data válida'
  }

  return response
}

export default date
