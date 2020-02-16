import universalPhone from '@syntesis/c-functions/src/universalPhone'

test('universalPhone', () => {
  expect(universalPhone('55', '(55)99647-1653')).toEqual('5555996471653')
})

