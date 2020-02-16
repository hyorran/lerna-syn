import flatpickr from 'flatpickr'
import { Portuguese } from 'flatpickr/dist/l10n/pt'

export const localizeFlatpickr = () => {
  flatpickr.localize(Portuguese)
}

export const dateFormat = 'd/m/Y'
export const dateTimeFormat = 'd/m/Y H:i'
export const timeFormat = 'H:i'
export const momentFriendlyDateFormat = 'DD/MM/YYYY'
export const momentFriendlyDateTimeFormat = 'DD/MM/YYYY HH:mm'
export const momentFriendlyTimeFormat = 'HH:mm'
export const momentFriendlyMonthYearFormat = 'MM/YYYY'

export const momentBackDateFormat = 'YYYY-MM-DD'
export const momentBackDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss'
export const momentBackTimeFormat = 'YYYY-MM-DDTHH:mm:ss'
export const momentBackMonthYearFormat = 'YYYY-MM'

export const dateMask = [
  /\d/, /\d/, // DD
  '/', // /
  /\d/, /\d/, // MM
  '/', // /
  /\d/, /\d/, /\d/, /\d/ // YYYY
]
export const dateTimeMask = [
  /\d/, /\d/, // DD
  '/', // /
  /\d/, /\d/, // MM
  '/', // /
  /\d/, /\d/, /\d/, /\d/, // YYYY
  ' ',
  /\d/, /\d/, // HH
  ':',
  /\d/, /\d/ // mm
]
export const timeMask = [
  /\d/, /\d/, // HH
  ':',
  /\d/, /\d/ // mm
]

export const monthYearMask = [
  /\d/, /\d/, // MM
  '/',
  /\d/, /\d/, /\d/, /\d/ // YYYY
]

