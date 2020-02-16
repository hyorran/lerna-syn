const formatDecimal = parameter => new Intl.NumberFormat(
  'pt-BR',
  {
    style: 'decimal'
  }
).format(parameter)

export default formatDecimal
