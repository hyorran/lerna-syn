import replace from 'lodash/replace'
import trim from 'lodash/trim'

/**
 * formatMoney
 * Convert a value decimal to money with currency
 * e.g. 333.33 => R$ 333,33 or 333,33
 *
 * */
const formatMoney = (parameter, removeCurrencyText = false) => {
  let valueFormatted = new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL'
    }
  ).format(parameter)

  if (removeCurrencyText) {
    valueFormatted = trim(replace(valueFormatted, 'R$', ''))
  }

  return valueFormatted
}

export default formatMoney
