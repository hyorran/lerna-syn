const trimCpfCnpj = str => str
  .split('.')
  .join('')
  .split('/')
  .join('')
  .split('-')
  .join('')
  .split('_')
  .join('')

export default trimCpfCnpj
