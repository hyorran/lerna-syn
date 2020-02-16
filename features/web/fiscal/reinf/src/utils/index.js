export const getCprbOption = (cprbType) => {
  switch (cprbType) {
    case 0:
      return 'Não Optante'
    case 1:
      return 'Optante'
    case 2:
      return 'Não se aplica'
    default:
      return '-'
  }
}
