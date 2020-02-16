import moment from 'moment/moment'
import { momentBackDateFormat } from '@syntesis/c-pickers/src/utils'

const sortDateRange = (...dates) => {
  dates = dates.map(date => moment(date))
  dates.sort((left, right) => left.diff(right))
  return dates.map(date => date.format(momentBackDateFormat))
}

export default sortDateRange
