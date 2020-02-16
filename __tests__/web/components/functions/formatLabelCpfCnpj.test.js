import formatLabelCpfCnpj from '@syntesis/c-functions/src/formatLabelCpfCnpj'

test('formatLabelCpfCnpj', () => {
  expect(formatLabelCpfCnpj(1)).toEqual('CNPJ')
  expect(formatLabelCpfCnpj(2)).toEqual('CPF')
  expect(formatLabelCpfCnpj()).toEqual('-')
})
