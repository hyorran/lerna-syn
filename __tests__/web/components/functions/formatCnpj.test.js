import formatCnpj from '@syntesis/c-functions/src/formatCnpj'

test('formatCnpj', () => {
  expect(formatCnpj('00237783000121')).toEqual('00.237.783/0001-21')
})
