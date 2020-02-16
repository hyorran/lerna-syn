
const formatLabelCpfCnpj = (type) => {
  switch (type) {
    case 1:
      return 'CNPJ'
    case 2:
      return 'CPF'
    default:
      return '-'
  }
}

export default formatLabelCpfCnpj
