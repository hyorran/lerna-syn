import formatMoney from '@syntesis/c-functions/src/formatMoney'

test('formatMoney', () => {
  expect(formatMoney(10, true)).toEqual('10.00')
})
